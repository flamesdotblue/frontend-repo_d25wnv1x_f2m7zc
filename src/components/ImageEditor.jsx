import React, { useEffect, useRef, useState } from 'react';

const PRESETS = [
  { name: 'Pure White', bg: '#ffffff', shadow: 0.15, radius: 24, padding: 48 },
  { name: 'Soft Pearl', bg: '#fafafa', shadow: 0.2, radius: 28, padding: 56 },
  { name: 'Clean Studio', bg: '#ffffff', shadow: 0.25, radius: 16, padding: 40 },
];

const Slider = ({ label, value, min, max, step = 1, onChange }) => (
  <label className="flex w-full items-center justify-between gap-4 text-sm text-gray-700">
    <span className="min-w-[140px]">{label}</span>
    <input
      type="range"
      className="w-full"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <span className="w-12 text-right text-gray-500">{value}</span>
  </label>
);

const ImageEditor = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [padding, setPadding] = useState(48);
  const [radius, setRadius] = useState(24);
  const [shadow, setShadow] = useState(0.2); // 0..0.5
  const [scale, setScale] = useState(100); // percent
  const canvasRef = useRef(null);
  const imgRef = useRef(new Image());

  useEffect(() => {
    const img = imgRef.current;
    if (!imageSrc) return;
    img.onload = () => draw();
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColor, padding, radius, shadow, scale]);

  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImageSrc(e.target.result);
    reader.readAsDataURL(file);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imgRef.current;
    if (!canvas || !ctx) return;

    const baseSize = 1024; // export resolution
    const pad = Math.round((padding / 100) * baseSize);
    canvas.width = baseSize;
    canvas.height = baseSize;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rounded background card
    const cardX = 0;
    const cardY = 0;
    const cardW = baseSize;
    const cardH = baseSize;

    const r = Math.min(radius, 200);
    ctx.save();
    roundedRect(ctx, cardX, cardY, cardW, cardH, r);
    ctx.clip();

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(cardX, cardY, cardW, cardH);

    // Drop shadow faux by drawing shadow ellipse
    const shadowAlpha = Math.max(0, Math.min(0.5, shadow));
    if (shadowAlpha > 0) {
      const shW = cardW * 0.6;
      const shH = cardH * 0.04;
      const shX = (cardW - shW) / 2;
      const shY = cardH - pad - shH * 2;
      const grad = ctx.createRadialGradient(cardW / 2, shY + shH / 2, 10, cardW / 2, shY + shH / 2, shW / 2);
      grad.addColorStop(0, `rgba(0,0,0,${shadowAlpha})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cardW / 2, shY + shH / 2, shW / 2, shH, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw product image centered
    if (img && img.width > 0) {
      const areaW = baseSize - pad * 2;
      const areaH = baseSize - pad * 2;
      const scalePct = Math.max(10, Math.min(200, scale)) / 100; // clamp
      const fit = fitContain(img.width, img.height, areaW, areaH);
      const drawW = fit.width * scalePct;
      const drawH = fit.height * scalePct;
      const dx = (baseSize - drawW) / 2;
      const dy = (baseSize - drawH) / 2;
      ctx.drawImage(img, dx, dy, drawW, drawH);
    }

    ctx.restore();
  };

  const exportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-premium.png';
    a.click();
  };

  const applyPreset = (p) => {
    setBgColor(p.bg);
    setShadow(p.shadow);
    setRadius(p.radius);
    setPadding(p.padding);
  };

  return (
    <section id="editor" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Clean your image in seconds</h2>
        <p className="mt-3 text-gray-600">Upload a product photo and generate a premium, white-background shot. Export ready for your storefront.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-sm font-medium text-gray-800">Editor</p>
            </div>
            <div className="flex gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
            <canvas ref={canvasRef} className="h-full w-full" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              Upload image
            </label>
            <button
              onClick={exportPNG}
              className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow"
            >
              Export PNG
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-800">Adjustments</p>
          <div className="mt-4 grid gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-700">Background</span>
              <input
                aria-label="Background color"
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-9 w-16 cursor-pointer rounded border border-gray-200 bg-white p-1"
              />
            </div>
            <Slider label="Padding" min={24} max={120} value={padding} onChange={setPadding} />
            <Slider label="Corner radius" min={0} max={80} value={radius} onChange={setRadius} />
            <Slider label="Shadow strength" min={0} max={50} value={Math.round(shadow * 100)} onChange={(v) => setShadow(v / 100)} />
            <Slider label="Image scale" min={50} max={150} value={scale} onChange={setScale} />

            <div className="mt-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
              For advanced background removal, connect a Banana-powered model via API. This demo focuses on premium white-background composition and styling.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fitContain(iw, ih, aw, ah) {
  const ir = iw / ih;
  const ar = aw / ah;
  if (ir > ar) {
    return { width: aw, height: aw / ir };
  }
  return { width: ah * ir, height: ah };
}

export default ImageEditor;
