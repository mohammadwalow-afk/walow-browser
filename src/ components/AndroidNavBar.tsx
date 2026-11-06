import React from 'react';

export const AndroidNavBar: React.FC<any> = () => {
  return (
    <div style={{
      width: '100%',
      height: '48px',
      backgroundColor: '#000000',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <button style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px' }}>◀</button>
      <button style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px' }}>●</button>
      <button style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px' }}>■</button>
    </div>
  );
};
