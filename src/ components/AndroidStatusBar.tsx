import React from 'react';

export const AndroidStatusBar: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '24px',
      backgroundColor: '#000000',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 8px',
      fontSize: '12px',
      boxSizing: 'border-box'
    }}>
      <span>12:00</span>
      <div style={{ display: 'flex', gap: '4px' }}>
        <span>📶</span>
        <span>🔋 100%</span>
      </div>
    </div>
  );
};
