import { Swiper } from 'tdesign-mobile-react';
import { withPageTitle } from '../../common';

import 'tdesign-mobile-react/es/style/index.css';

const colorPredefined = ['red', 'blue', 'rgb(65,65,0)', 'black', 'pink', 'purple', 'green', 'orange'];

const Index = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '200px' }}></div>
      <div style={{ width: '100%', touchAction: 'pan-y' }}>
        <Swiper
          height={200}
          style={{ width: '100%' }}
          autoplay={false}
        >
          {new Array(8).fill(0).map((_, idx) => {
            return (
              <Swiper.SwiperItem
                key={idx}
                style={{
                  background: colorPredefined[idx],
                  width: '100%', color: 'white', borderRadius: '12px',
                  textAlign: 'center', alignContent: 'center'
                }}
              >
                {`Slide ${idx}`}
              </Swiper.SwiperItem>
            );
          })}
        </Swiper>
      </div>
      <div style={{ width: '100%', height: '2000px' }}></div>
    </div>
  );
};

const WithTitle = withPageTitle('WhyTD', Index);

export default WithTitle;
