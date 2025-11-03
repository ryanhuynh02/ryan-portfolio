'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import type { PointerEventHandler } from 'react';

type Props = {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
  aspect?: string;        // e.g., "4 / 3"
  initial?: number;       // 0..100
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  showControls?: boolean;
  edgeBufferPct?: number; // keeps handle away from edge
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
  edgeBufferPct = 5,
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  // Label fading refs
  const beforeRef = useRef<HTMLSpanElement | null>(null);
  const afterRef = useRef<HTMLSpanElement | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);

  // Start drag (only from handle)
  const startDrag: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  // Move/Up logic — keeps handle away from screen edges
  useEffect(() => {
    function move(e: PointerEvent) {
      if (!dragging || !wrap.current) return;
      const rect = wrap.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      let next = Math.round((x / rect.width) * 100);

      const buffer = Math.max(2, Math.min(edgeBufferPct, 10)); // 2–10%
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

  // Auto-hide labels when divider overlaps them
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

  // Determine if slider is at left or right edge (for half-circle)
  const buffer = Math.max(2, Math.min(edgeBufferPct, 10));
  const min = buffer;
  const max = 100 - buffer;
  const atLeft = pct <= min + 0.1;
  const atRight = pct >= max - 0.1;

  return (
    <figure
      className={[
        // Adds spacing on mobile so it doesn’t touch screen edges
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
        {/* Before image */}
        <Image src={before} alt={altBefore} fill className="object-cover" />

        {/* After image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <Image src={after} alt={altAfter} fill className="object-cover" />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/70 mix-blend-difference"
          style={{ left: `${pct}%` }}
        />

        {/* Handle — circular, becomes half when at edge */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                     h-8 w-8 sm:h-6 sm:w-6 rounded-full bg-white shadow ring-1 ring-slate-300
                     [touch-action:none]"
          style={{
            left: `${pct}%`,
            borderRadius: 9999,
            clipPath: atLeft
              ? 'inset(0 50% 0 0 round 9999px)' // show right half only
              : atRight
              ? 'inset(0 0 0 50% round 9999px)' // show left half only
              : undefined,
            transition: 'clip-path 150ms ease',
          }}
          onPointerDown={startDrag}
        />

        {/* Labels */}
        {labelBefore && (
          <span
            ref={beforeRef}
            className={[
              'absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow',
              'transition-opacity duration-150',
              showBefore ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
            aria-hidden={!showBefore}
          >
            {labelBefore}
          </span>
        )}
        {labelAfter && (
          <span
            ref={afterRef}
            className={[
              'absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow',
              'transition-opacity duration-150',
              showAfter ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
            aria-hidden={!showAfter}
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
            aria-label="Reveal amount"
          />
        </figcaption>
      )}
    </figure>
  );
}
