import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { withPageTitle } from '../../common';

const carr = ['red', 'blue', 'grey', 'green', 'pink'];
const tarr = [1, 2, 3, 4, 5];
const len = 5;

function MyCustomSwiper() {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [movingD, setMovingD] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const mouseStart = useRef<[number, number]>([-1, -1]);
  // 0 不划 1: 左滑 2: 右滑 3: 竖滑
  const scrollState = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    mouseStart.current = [e.touches[0].clientX, e.touches[0].clientY];
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scrollState.current !== 0) {
      e.stopPropagation();
      if (scrollState.current !== 3) {
        setMovingD(e.touches[0].clientX - mouseStart.current[0]);
      }
      return;
    }
    const { clientX, clientY } = e.touches[0];
    if (mouseStart.current[0] < 0 && mouseStart.current[1] < 0) {
      mouseStart.current = [clientX, clientY];
      return;
    }
    const dX = clientX - mouseStart.current[0];
    const dY = clientY - mouseStart.current[1];
    if (dX * dX + dY * dY > 20) {
      if (Math.abs(dX) > Math.abs(dY)) {
        scrollState.current = dX > 0 ? 2 : 1;
        setIsMoving(true);
        return;
      }
      scrollState.current = 3;
    }
  };

  const onTouchEnd = (_: React.TouchEvent<HTMLDivElement>) => {
    setMovingD(0);
    setIsMoving(false);
    mouseStart.current = [-1, -1];
    const state = scrollState.current;
    scrollState.current = 0;
    if (state === 2) {
      setCurrent(c => (c <= 0 ? 0 : c - 1));
      return;
    }
    if (state === 1) {
      setCurrent(c => (c >= len - 1 ? len - 1 : c + 1));
    }
  };

  const swiperRef = useRef<HTMLDivElement>(null);

  const cmv = () => {
    if (swiperRef.current) {
      return movingD - 0.8 * current * swiperRef.current.clientWidth;
    }
    return 0;
  };

  useEffect(() => {
    const ontm = (e: globalThis.TouchEvent) => {
      if (scrollState.current === 1 || scrollState.current === 2) {
        e.preventDefault();
      }
      onTouchMove(e as unknown as React.TouchEvent<HTMLDivElement>);
    };
    const swiperDom = swiperRef.current;
    if (swiperDom) {
      swiperDom.addEventListener('touchmove', ontm, true);
    }
    return () => {
      if (swiperDom) {
        swiperDom.removeEventListener('touchmove', ontm);
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '200px' }}></div>
      <div className={styles.swiperContainer}>
        <div
          ref={swiperRef}
          className={styles.swiper}
          style={{
            transform: isMoving
              ? `translate3d(${cmv()}px, 0px, 0px)`
              : `translate3d(-${80 * current}%, 0px, 0px)`,
            transition: isMoving ? 'none' : 'transform 500ms ease-out'
          }}
        >
          <div className={styles.swiperPlaceholder}></div>
          {tarr.map((item, idx) => {
            return (
              <div
                key={item + 100}
                className={styles.swiperItem}
                style={{
                  backgroundColor: carr[idx % 5],
                  transform: current === idx ? 'none' : 'scale(0.875)',
                  transition: isMoving ? 'none' : 'transform 500ms ease-out'
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ width: '100%', height: '1200px' }}></div>
    </div>
  );
}

const WithTitle = withPageTitle('My Custom Swiper', MyCustomSwiper);

export default WithTitle;
