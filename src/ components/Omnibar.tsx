import React from 'react';

export const Omnibar: React.FC<any> = () => {
  return (
    <div style={{
      width: '100%',
      padding: '8px',
      backgroundColor: '#f1f3f4',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        color: '#3c4043',
        border: '1px solid #ced4da'
      }}>
        Search or type URL
      </div>
    </div>
  );
};
