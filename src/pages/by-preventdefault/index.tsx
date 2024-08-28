import { TouchEvent, useEffect, useRef } from 'react';
import { withPageTitle } from '../../common';
import { ScrollDirection, useMoveDirection } from '../../hooks/use-move-direction';

const Index = () => {
  const { scrollDirectionRef, onTouchStart, onTouchMove, onTouchEnd, movedD } = useMoveDirection();
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ontm = (e: globalThis.TouchEvent) => {
      if (scrollDirectionRef.current === ScrollDirection.VERTICAL) {
        return;
      }
      if (scrollDirectionRef.current === ScrollDirection.HORIZONTAL) {
        e.preventDefault();
      }
      onTouchMove(e as unknown as TouchEvent<HTMLDivElement>);
    };
    const dom = domRef.current;
    if (dom) {
      dom.addEventListener('touchmove', ontm, true);
    }
    return () => {
      if (dom) {
        dom.removeEventListener('touchmove', ontm);
      }
    };
  }, [onTouchMove, scrollDirectionRef]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '200px' }}></div>
      <div style={{ width: '90%', overflow: 'hidden', borderRadius: '12px', margin: '0 auto' }}>
        <div
          ref={domRef}
          style={{
            width: '600%',
            height: '200px',
            background: 'linear-gradient(to right, red, blue, pink, yellow, green, purple, orange)',
            position: 'relative',
            borderRadius: '12px',
            transform: `translate(${movedD}px, 0)`
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
        </div>
      </div>
      <div style={{ width: '100%', height: '2000px' }}></div>
    </div>
  );
};

const WithTitle = withPageTitle('By preventDefault', Index);

export default WithTitle;
