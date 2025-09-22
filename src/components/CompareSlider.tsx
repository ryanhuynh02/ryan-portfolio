'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

type Props = {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
  /** CSS aspect-ratio, e.g. "4 / 3" or "16 / 9". */
  aspect?: string;
  /** Start position (0–100). */
  initial?: number;
  /** Optional corner labels. */
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  /** Show the range input under the slider. */
  showControls?: boolean;
};

export default function CompareSlider({
  before,
  after,
  altBefore = '',
  altAfter = '',
  aspect = '4 / 3',
  initial = 50,
  labelBefore,
  labelAfter,
  className = '',
  showControls = true,
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(initial); // 0..100
  const [dragging, setDragging] = useState(false);

  // drag across the image
  useEffect(() => {
    function move(e: PointerEvent) {
      if (!dragging || !wrap.current) return;
      const rect = wrap.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      setPct(Math.round((x / rect.width) * 100));
    }
    function up() { setDragging(false); }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging]);

  return (
    <figure className={['rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm', className].join(' ')}>
      <div
        ref={wrap}
        className="relative w-full select-none touch-none cursor-col-resize"
        style={{ aspectRatio: aspect }}
        onPointerDown={() => setDragging(true)}
      >
        {/* Left/base = BEFORE */}
        <Image src={before} alt={altBefore} fill className="object-cover" />

        {/* Right/reveal = AFTER */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
          <Image src={after} alt={altAfter} fill className="object-cover" />
        </div>

        {/* Divider line + handle */}
        <div className="absolute top-0 bottom-0 w-px bg-white/70 mix-blend-difference" style={{ left: `${pct}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-white shadow ring-1 ring-slate-300"
          style={{ left: `${pct}%` }}
        />

        {/* Optional labels */}
        {labelBefore && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow">
            {labelBefore}
          </span>
        )}
        {labelAfter && (
          <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow">
            {labelAfter}
          </span>
        )}
      </div>

      {showControls && (
        <figcaption className="px-4 pb-4 pt-3">
          <input
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => setPct(parseInt(e.target.value, 10))}
            className="w-full accent-[#007AFF]"
            aria-label="Reveal amount"
          />
          <p className="mt-2 text-xs text-slate-600">Tip: Drag the handle or use the slider to compare.</p>
        </figcaption>
      )}
    </figure>
  );
}
