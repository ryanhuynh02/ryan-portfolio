'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import type { PointerEventHandler } from 'react';

type Props = {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
  aspect?: string;        // e.g. "4 / 3"
  initial?: number;       // 0..100
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  showControls?: boolean; // default false
  edgeBufferPct?: number; // default 5
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

  // labels fade when overlapped
  const beforeRef = useRef<HTMLSpanElement | null>(null);
  const afterRef  = useRef<HTMLSpanElement | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter,  setShowAfter]  = useState(true);

  const startDrag: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  // move/up with edge clamp
  useEffect(() => {
    function move(e: PointerEvent) {
      if (!dragging || !wrap.current) return;
      const rect = wrap.current.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      let next = Math.round((x / rect.width) * 100);

      const buffer = Math.max(2, Math.min(edgeBufferPct, 10));
      const min = buffer;
      const max = 100 - buffer;
      next = Math.min(max, Math.max(min, next));

      setPct(next);
    }
    function up() { setDragging(false); }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, edgeBufferPct]);

  // fade labels when divider overlaps
  useEffect(() => {
    if (!wrap.current) return;
    const update = () => {
      const rect = wrap.current!.getBoundingClientRect();
      const x = (pct / 100) * rect.width;
      const M = 6;
      if (beforeRef.current) {
        const br = beforeRef.current.getBoundingClientRect();
        setShowBefore(x > (br.right - rect.left) + M);
      }
      if (afterRef.current) {
        const ar = afterRef.current.getBoundingClientRect();
        setShowAfter(x < (ar.left - rect.left) - M);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pct]);

  // edge flags for half-circle look
  const buffer = Math.max(2, Math.min(edgeBufferPct, 10));
  const min = buffer;
  const max = 100 - buffer;
  const atLeft  = pct <= min + 0.1;
  const atRight = pct >= max - 0.1;

  // CSS var for gap = half of handle diameter (mobile/desktop sizes)
  // Tailwind arbitrary properties let us set [--gap:16px] and sm:[--gap:12px]
  return (
    <figure
      className={[
        'mx-auto w-[92vw] sm:w-full max-w-2xl',
        'rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm',
        className,
      ].join(' ')}
    >
      <div
        ref={wrap}
        className="relative w-full select-none cursor-col-resize
                   [touch-action:pan-y] [overscroll-behavior-x:contain]
                   [--gap:16px] sm:[--gap:12px]"
        style={{ aspectRatio: aspect }}
      >
        {/* Base image */}
        <Image src={before} alt={altBefore} fill className="object-cover z-0" />

        {/* Revealed image */}
        <div className="absolute inset-0 overflow-hidden z-0" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
          <Image src={after} alt={altAfter} fill className="object-cover" />
        </div>

        {/* Divider split into two segments to leave a clean gap for the handle */}
        <div
          className="absolute left-0 top-0 w-px bg-white/80 z-20"
          style={{
            left: `${pct}%`,
            height: 'calc(50% - var(--gap))',
            transform: 'translateX(-0.5px)',
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-px bg-white/80 z-20"
          style={{
            left: `${pct}%`,
            height: 'calc(50% - var(--gap))',
            transform: 'translateX(-0.5px)',
          }}
        />

        {/* Handle (white circle, half-circle at edges, with arrows) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                     h-8 w-8 sm:h-6 sm:w-6 bg-white shadow ring-1 ring-slate-300
                     flex items-center justify-center overflow-hidden z-30
                     [touch-action:none]"
          style={{
            left: `${pct}%`,
            borderRadius: 9999,
            clipPath: atLeft
              ? 'inset(0 50% 0 0 round 9999px)'   // show right half only
              : atRight
              ? 'inset(0 0 0 50% round 9999px)'   // show left half only
              : undefined,
            transition: 'clip-path 150ms ease',
          }}
          onPointerDown={startDrag}
          aria-label="Comparison slider handle"
        >
          {/* Left arrow (hidden when tight to left) */}
          {!atLeft && (
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-800">
              <path d="M15.5 19 8.5 12l7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {/* spacer when both arrows visible */}
          {!atLeft && !atRight && <span className="w-1" />}
          {/* Right arrow (hidden when tight to right) */}
          {!atRight && (
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-800">
              <path d="m8.5 19 7-7-7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* Labels */}
        {labelBefore && (
          <span
            ref={beforeRef}
            className={[
              'absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-700 shadow',
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
              'absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-slate-700 shadow',
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
