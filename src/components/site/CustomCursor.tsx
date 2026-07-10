import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWrapRef = useRef<HTMLDivElement>(null); // position layer — no CSS transition
  const ringInnerRef = useRef<HTMLDivElement>(null); // visual layer — CSS transition for scale/color
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;
    setEnabled(true);

    let rx = -999, ry = -999, mx = -999, my = -999;
    let initialized = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Snap ring to cursor on first move so it doesn't fly in from (0,0)
      if (!initialized) {
        rx = mx;
        ry = my;
        initialized = true;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isHover = !!t.closest("a, button, [data-cursor='hover']");
      // Toggle scale/color only on the inner visual div — no position transform here
      ringInnerRef.current?.classList.toggle("scale-150", isHover);
      ringInnerRef.current?.classList.toggle("bg-accent/20", isHover);
    };

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      // Only position the outer wrapper — no CSS transition on this element
      if (ringWrapRef.current) {
        ringWrapRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.documentElement.classList.add("cursor-none");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-1.5 rounded-full bg-accent pointer-events-none z-[100]"
        style={{ mixBlendMode: "difference" }}
      />
      {/* Outer div: position only, updated every RAF frame — no CSS transition */}
      <div
        ref={ringWrapRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
      >
        {/* Inner div: scale + color with CSS transition, no position transform */}
        <div
          ref={ringInnerRef}
          className="size-8 rounded-full border border-accent/60 transition-[transform,background-color] duration-200 ease-out"
        />
      </div>
    </>
  );
}