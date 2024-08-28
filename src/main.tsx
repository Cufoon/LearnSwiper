import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import BySwiperJS from './pages/swiperjs';
import ByOverflow from './pages/by-overflow';
import ByPreventDefault from './pages/by-preventdefault';
import ByTouchAction from './pages/by-touchaction';
import MyCustom from './pages/custom';
import WhyTdesignCanNot from './pages/why-td';
import Home from './home';
import './main.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/swiperjs',
    element: <BySwiperJS />
  },
  {
    path: '/by-overflow',
    element: <ByOverflow />
  },
  {
    path: '/by-preventdefault',
    element: <ByPreventDefault />
  },
  {
    path: '/by-touchaction',
    element: <ByTouchAction />
  },
  {
    path: '/why-tdesign-no',
    element: <WhyTdesignCanNot />
  },
  {
    path: '/my-custom',
    element: <MyCustom />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
