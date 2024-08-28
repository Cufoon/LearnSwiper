import { withPageTitle } from '../../common';
import { useMoveDirection } from '../../hooks/use-move-direction';

const Index = () => {
  const { onTouchStart, onTouchMove, onTouchEnd, movedD } = useMoveDirection();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', height: '200px' }}></div>
      <div style={{ width: '90%', overflow: 'hidden', touchAction: 'pan-y', borderRadius: '12px', margin: '0 auto' }}>
        <div
          style={{
            width: '600%',
            height: '200px',
            background: 'linear-gradient(to right, red, blue, pink, yellow, green, purple, orange)',
            position: 'relative',
            borderRadius: '12px',
            transform: `translate(${movedD}px, 0)`
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
        </div>
      </div>
      <div style={{ width: '100%', height: '2000px' }}></div>
    </div>
  );
};

const WithTitle = withPageTitle('By TouchAction', Index);

export default WithTitle;
