'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import type { PointerEventHandler } from 'react';

type Props = {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
  /** CSS aspect ratio, e.g. "4 / 3" or "16 / 9". */
  aspect?: string;
  /** Initial divider position (0–100). */
  initial?: number;
  /** Optional corner labels, e.g. "Day 1" / "Day 100" */
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  /** Show the range input under the slider. */
  showControls?: boolean;
  /** Keep the handle away from screen edges (%) to avoid OS gestures. */
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
  edgeBufferPct = 5,
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(initial);
  const [dragging, setDragging] = useState(false);

  // labels that fade when the divider overlaps them
  const beforeRef = useRef<HTMLSpanElement | null>(null);
  const afterRef = useRef<HTMLSpanElement | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter, setShowAfter] = useState(true);

  // start drag only from the handle (thumb-friendly, preserves vertical scroll)
  const startDrag: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  // move/up with edge clamp (keeps handle away from bezel)
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
    function up() { setDragging(false); }

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging, edgeBufferPct]);

  // overlap check to fade labels
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

  // edge flags for “half circle” look
  const buffer = Math.max(2, Math.min(edgeBufferPct, 10));
  const min = buffer;
  const max = 100 - buffer;
  const atLeft = pct <= min + 0.1;
  const atRight = pct >= max - 0.1;

  return (
    <figure
      className={[
        // Nomad-like: centered and inset on phones so it never hits the bezel
        'mx-auto w-[92vw] sm:w-full max-w-2xl',
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
        <Image src={before} alt={altBefore} fill className="object-cover" />

        {/* AFTER */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
          <Image src={after} alt={altAfter} fill className="object-cover" />
        </div>

        {/* Divider — thicker, solid black like Nomad */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-black"
          style={{ left: `${pct}%`, transform: 'translateX(-1.5px)' }}
        />

        {/* Handle — black w/ white chevrons, becomes half-circle at edges */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                     h-10 w-10 sm:h-8 sm:w-8 bg-black text-white
                     shadow-[0_1px_3px_rgba(0,0,0,0.3)] ring-1 ring-black/60
                     flex items-center justify-center overflow-hidden
                     [touch-action:none]"
          style={{
            left: `${pct}%`,
            borderRadius: 9999,
            clipPath: atLeft
              ? 'inset(0 50% 0 0 round 9999px)'   // right half shown
              : atRight
              ? 'inset(0 0 0 50% round 9999px)'   // left half shown
              : undefined,
          }}
          onPointerDown={startDrag}
          aria-label="Comparison slider handle"
        >
          {/* Left chevron (hide when snug left) */}
          {!atLeft && (
            <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
              <path d="M15.5 19 8.5 12l7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {!atLeft && !atRight && <span className="w-1" />}
          {/* Right chevron (hide when snug right) */}
          {!atRight && (
            <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
              <path d="m8.5 19 7-7-7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* Corner labels (e.g., Day 1 / Day 100) */}
        {labelBefore && (
          <span
            ref={beforeRef}
            className={[
              'absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow',
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
              'absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow',
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
            className="w-full accent-black"
            aria-label="Reveal amount"
          />
        </figcaption>
      )}
    </figure>
  );
}
