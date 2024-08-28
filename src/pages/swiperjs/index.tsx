import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { withPageTitle } from '../../common';
import styles from './index.module.scss';

const colorPredefined = ['red', 'blue', '#e9a03b', 'black', 'pink', 'purple', 'green', 'orange'];

function BySwiperJS() {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={5}
      centeredSlides={true}
      className={styles.swiper}
    >
      {new Array(8).fill(0).map((_, idx) => {
        return (
          <SwiperSlide key={idx} className={styles.swiperItem} style={{ background: colorPredefined[idx] }}>
            {`Slide ${idx}`}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

const WithTitle = withPageTitle('By SwiperJS', BySwiperJS);

export default WithTitle;
