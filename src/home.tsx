import { Link } from 'react-router-dom';
import { withPageTitle } from './common';
import styles from './home.module.scss';

const Home = withPageTitle('首页', () => (
  <div
    style={{
      width: '100%', height: '100%', display: 'flex',
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      rowGap: '20px', fontSize: '24px'
    }}
  >
    <Link to="/by-overflow" className={styles.link} style={{ background: '#ffebe6' }}>By Overflow</Link>
    <Link to="/by-preventdefault" className={styles.link} style={{ background: '#dfffd1' }}>By preventDefault</Link>
    <Link to="/by-touchaction" className={styles.link} style={{ background: '#d8fff6' }}>By TouchAction</Link>
    <Link to="/swiperjs" className={styles.link} style={{ background: '#d8dcff' }}>By Swiperjs</Link>
    <Link to="/my-custom" className={styles.link} style={{ background: '#fff5d8' }}>My Custom Simple Swiper</Link>
    <Link to="/why-tdesign-no" className={styles.link} style={{ background: '#ffe0ee' }}>Why Tdesign not working</Link>
  </div>
));

export default Home;
