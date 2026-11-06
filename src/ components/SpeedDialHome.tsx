import React from 'react';

export const SpeedDialHome: React.FC<any> = () => {
  return (
    <div style={{
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      justifyItems: 'center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#f1f3f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🌐</div>
        <span style={{ fontSize: '12px' }}>Google</span>
      </div>
    </div>
  );
};
