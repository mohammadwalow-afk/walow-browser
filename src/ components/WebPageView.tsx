import React from 'react';

export const WebPageView: React.FC<any> = () => {
  return (
    <div style={{
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      color: '#70757a'
    }}>
      <p>Welcome to Walow Browser</p>
    </div>
  );
};
