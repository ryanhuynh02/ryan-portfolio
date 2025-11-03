'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import type { PointerEventHandler } from 'react';

type Props = {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
  aspect?: string;        // e.g., '4 / 3'
  initial?: number;       // 0..100
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  showControls?: boolean;
  /** keep the handle a little away from the edges (%) */
  edgeBufferPct?: number;
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
  showControls = false,
  edgeBufferPct = 5, // more buffer so handle never touches phone edge
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  // label refs + visibility
  const beforeRef = useRef<HTMLSpanElement | null>(null);
  const afterRef = useRef<HTMLSpanElement | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);

  // --- start drag only from handle ---
  const startDrag: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  // --- pointer move / up ---
  useEffect(() => {
    function move(e: PointerEvent) {
      if (!dragging || !wrap.current) return;
      const rect = wrap.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      let next = Math.round((x / rect.width) * 100);

      // clamp edges so the handle never hits the phone bezel
      const buffer = Math.max(2, Math.min(edgeBufferPct, 10)); // 2–10% range
      const min = buffer;
      const max = 100 - buffer;
      next = Math.min(max, Math.max(min, next));

      setPct(next);
    }

    function up() {
      setDragging(false);
    }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, edgeBufferPct]);

  // --- auto-hide labels when divider overlaps ---
  useEffect(() => {
    if (!wrap.current) return;
    const update = () => {
      const rect = wrap.current!.getBoundingClientRect();
      const dividerX = (pct / 100) * rect.width;
      const margin = 6;

      if (beforeRef.current) {
        const br = beforeRef.current.getBoundingClientRect();
        const beforeRight = br.right - rect.left;
        setShowBefore(dividerX > beforeRight + margin);
      }

      if (afterRef.current) {
        const ar = afterRef.current.getBoundingClientRect();
        const afterLeft = ar.left - rect.left;
        setShowAfter(dividerX < afterLeft - margin);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pct]);

  return (
    <figure
      className={[
        // center and limit width for mobile (adds breathing room)
        'mx-auto w-[92vw] sm:w-full max-w-2xl',
        'rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm',
        className,
      ].join(' ')}
    >
      <div
        ref={wrap}
        className="relative w-full select-none cursor-col-resize [touch-action:pan-y] [overscroll-behavior-x:contain]"
        style={{ aspectRatio: aspect }}
      >
        {/* BEFORE image */}
        <Image src={before} alt={altBefore} fill className="object-cover" />

        {/* AFTER image */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
          <Image src={after} alt={altAfter} fill className="object-cover" />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/70 mix-blend-difference"
          style={{ left: `${pct}%` }}
        />

        {/* Handle (bigger for touch devices) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 sm:h-6 sm:w-6 rounded-full bg-white shadow ring-1 ring-slate-300 [touch-action:none]"
          style={{ left: `${pct}%` }}
          onPointerDown={startDrag}
        />

        {/* Fading Labels */}
        {labelBefore && (
          <span
            ref={beforeRef}
            className={[
              'absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow transition-opacity duration-150',
              showBefore ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
          >
            {labelBefore}
          </span>
        )}

        {labelAfter && (
          <span
            ref={afterRef}
            className={[
              'absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow transition-opacity duration-150',
              showAfter ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
          >
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
          />
        </figcaption>
      )}
    </figure>
  );
}
