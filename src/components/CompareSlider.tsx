'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import type React from "react";

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
  showControls = false,
}: Props) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(initial); // 0..100
  const [dragging, setDragging] = useState(false);
  const beforeRef = useRef<HTMLSpanElement | null>(null);
  const afterRef  = useRef<HTMLSpanElement | null>(null);
  const [showBefore, setShowBefore] = useState(true);
  const [showAfter,  setShowAfter]  = useState(true);

  // drag across the image
  useEffect(() => {
    if (!wrap.current) return;
  
    const update = () => {
      const rect = wrap.current!.getBoundingClientRect();
      const dividerX = (pct / 100) * rect.width; // x relative to the wrapper
      const M = 6; // small margin so it fades just before touching
  
      // Hide BEFORE when divider is to the left of its right edge
      if (beforeRef.current) {
        const br = beforeRef.current.getBoundingClientRect();
        const beforeRight = br.right - rect.left;
        setShowBefore(dividerX > beforeRight + M);
      }
  
      // Hide AFTER when divider is to the right of its left edge
      if (afterRef.current) {
        const ar = afterRef.current.getBoundingClientRect();
        const afterLeft = ar.left - rect.left;
        setShowAfter(dividerX < afterLeft - M);
      }
    };
  
    update(); // run once now
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [pct]);
  
  const startDrag: React.PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
  };

  return (
    <figure className={['rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm', className].join(' ')}>
      <div
        ref={wrap}
           className="relative w-full select-none cursor-col-resize [touch-action:pan-y]"
           style={{ aspectRatio: aspect }}
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
              onPointerDown={startDrag}
        />

{labelBefore && (
  <span
    ref={beforeRef}
    className={[
      "absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow",
      "transition-opacity duration-150",
      showBefore ? "opacity-100" : "opacity-0 pointer-events-none"
    ].join(" ")}
    aria-hidden={!showBefore}
  >
    {labelBefore}
  </span>
)}

{labelAfter && (
  <span
    ref={afterRef}
    className={[
      "absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium shadow",
      "transition-opacity duration-150",
      showAfter ? "opacity-100" : "opacity-0 pointer-events-none"
    ].join(" ")}
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
          <p className="mt-2 text-xs text-slate-600">Tip: Drag the handle or use the slider to compare.</p>
        </figcaption>
      )}
    </figure>
  );
}
