'use client';

import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  showControls?: boolean; // optional range input
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
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const knob = useRef<HTMLDivElement | null>(null);

  const [pct, setPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  // divider gap (half of knob height) so no line runs under the knob
  const [gapPx, setGapPx] = useState(16);

  // optional label fade
  const beforeRef = useRef<HTMLSpanElement | null>(null);
  const afterRef  = useRef<HTMLSpanElement | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);

  // measure knob to keep divider gap perfect
  useLayoutEffect(() => {
    const measure = () => {
      if (!knob.current) return;
      setGapPx(knob.current.getBoundingClientRect().height / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (knob.current) ro.observe(knob.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const startDrag: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  // Full travel 0..100
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

  // label fade when divider overlaps
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

  // Edge detection (true edges)
  const atLeft  = pct <= 0.5;    // ~0%
  const atRight = pct >= 99.5;   // ~100%

  // Keep knob fully on-screen at edges
  const translateX = atLeft ? '0' : atRight ? '-100%' : '-50%';

  return (
    <figure
      className={[
        'mx-auto w-[86vw] sm:w-full max-w-2xl', // smaller on mobile
        'rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm',
        className,
      ].join(' ')}
    >
      <div
        ref={wrap}
        className="relative w-full select-none cursor-col-resize
                   [touch-action:pan-y] [overscroll-behavior-x:contain]"
        style={{ aspectRatio: aspect }}
      >
        {/* BEFORE */}
        <Image src={before} alt={altBefore} fill className="object-cover z-0" />

        {/* AFTER */}
        <div
          className="absolute inset-0 overflow-hidden z-0"
          style={{ clipPath: `inset(0 0 0 ${pct}%)` }}
        >
          <Image src={after} alt={altAfter} fill className="object-cover" />
        </div>

        {/* Divider split (top/bottom) — leaves a gap under the knob */}
        <div
          className="absolute left-0 top-0 w-px bg-white/85 z-10"
          style={{
            left: `${pct}%`,
            height: `calc(50% - ${gapPx}px)`,
            transform: 'translateX(-0.5px)',
          }}
        />
        <div
          className="absolute left-0 bottom-0 w-px bg-white/85 z-10"
          style={{
            left: `${pct}%`,
            height: `calc(50% - ${gapPx}px)`,
            transform: 'translateX(-0.5px)',
          }}
        />

        {/* KNOB — full circle in middle; half-circle at true edges */}
        <div
          ref={knob}
          className="absolute top-1/2 h-8 w-8 sm:h-6 sm:w-6 bg-white shadow ring-1 ring-slate-300
                     flex items-center justify-center overflow-hidden z-30 [touch-action:none]"
          style={{
            left: `${pct}%`,
            transform: `translate(${translateX}, -50%)`,
            borderRadius: 9999,
            // half-circle at edges (right half when left edge; left half when right edge)
            clipPath: atLeft
              ? 'inset(0 50% 0 0 round 9999px)'
              : atRight
              ? 'inset(0 0 0 50% round 9999px)'
              : 'inset(0 0 0 0 round 9999px)', // full circle otherwise
            transition: 'clip-path 120ms ease',
          }}
          onPointerDown={startDrag}
          aria-label="Comparison slider handle"
        >
          {/* tiny mask to ensure no line peeks through */}
          <span className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white z-40" />
          {/* arrows inside */}
          {!atLeft && (
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-800 z-40">
              <path d="M15.5 19 8.5 12l7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {!atLeft && !atRight && <span className="w-1" />}
          {!atRight && (
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-slate-800 z-40">
              <path d="m8.5 19 7-7-7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* Optional labels */}
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
