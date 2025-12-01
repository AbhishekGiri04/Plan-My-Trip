import React, { useState, useEffect } from 'react';

const OpenStreetMap = ({ destination, className = "" }) => {
  const [mapUrl, setMapUrl] = useState('');
  
  useEffect(() => {
    const getLocationCoords = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=1`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const bbox = [
            parseFloat(lon) - 0.1,
            parseFloat(lat) - 0.1,
            parseFloat(lon) + 0.1,
            parseFloat(lat) + 0.1
          ];
          const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.join(',')}&layer=mapnik&marker=${lat},${lon}`;
          setMapUrl(url);
        } else {
          setMapUrl('https://www.openstreetmap.org/export/embed.html?bbox=72.7,18.8,74.4,19.3&layer=mapnik&marker=19.0760,72.8777');
        }
      } catch (error) {
        setMapUrl('https://www.openstreetmap.org/export/embed.html?bbox=72.7,18.8,74.4,19.3&layer=mapnik&marker=19.0760,72.8777');
      }
    };
    
    if (destination) {
      getLocationCoords();
    }
  }, [destination]);
  
  if (!mapUrl) {
    return (
      <div className={`map-container ${className}`} style={{ 
        width: '100%', 
        height: '300px', 
        borderRadius: '12px', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1f5f9',
        color: '#64748b'
      }}>
        Loading map for {destination}...
      </div>
    );
  }
  
  return (
    <div className={`map-container ${className}`} style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
      <iframe
        src={mapUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title={`Map of ${destination}`}
        loading="lazy"
      />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20px',
        background: 'white',
        zIndex: 10
      }}></div>
    </div>
  );
};

export default OpenStreetMap;