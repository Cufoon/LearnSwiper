import React, { useRef, useState } from 'react';

export const enum ScrollDirection {
  NONE,
  VERTICAL,
  HORIZONTAL
}

interface Point {
  x: number
  y: number
}

export const useMoveDirection = () => {
  const [movedD, setMovedD] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(ScrollDirection.NONE);
  const scrollDirectionRef = useRef<ScrollDirection>(ScrollDirection.NONE);
  const startRef = useRef<Point>({ x: -1, y: -1 });
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scrollDirection !== ScrollDirection.NONE || scrollDirectionRef.current !== ScrollDirection.NONE) {
      if (scrollDirectionRef.current === ScrollDirection.HORIZONTAL || scrollDirection === ScrollDirection.HORIZONTAL) {
        const { clientX } = e.touches[0];
        setMovedD(clientX - startRef.current.x);
      }
      return;
    }
    const { clientX, clientY } = e.touches[0];
    if (startRef.current.x < 0 && startRef.current.y < 0) {
      startRef.current = { x: clientX, y: clientY };
      return;
    }
    const dX = Math.abs(clientX - startRef.current.x);
    const dY = Math.abs(clientY - startRef.current.y);
    const d2 = dX * dX + dY * dY;
    if (d2 < 20) {
      return;
    }
    if (dX > dY) {
      setScrollDirection(ScrollDirection.HORIZONTAL);
      scrollDirectionRef.current = ScrollDirection.HORIZONTAL;
      return;
    }
    setScrollDirection(ScrollDirection.VERTICAL);
    scrollDirectionRef.current = ScrollDirection.VERTICAL;
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.touches[0];
    startRef.current = { x: clientX, y: clientY };
  };

  const onTouchEnd = () => {
    setMovedD(0);
    setScrollDirection(ScrollDirection.NONE);
    scrollDirectionRef.current = ScrollDirection.NONE;
    startRef.current = { x: -1, y: -1 };
  };

  return {
    scrollDirectionRef, startRef,
    onTouchStart, onTouchMove, onTouchEnd,
    scrollDirection, setScrollDirection,
    movedD, setMovedD
  };
};
