import React from 'react';

const LoadingPage = () => {

  return (
    <img 
      src="https://64.media.tumblr.com/18435dacd3a8ab8f6461305cfb53c7e6/tumblr_or4sjq5IK21tn6jtno1_500.gif" 
      alt="Loading..." 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        zIndex: 9999
      }}
    />
  );
};

export default LoadingPage;