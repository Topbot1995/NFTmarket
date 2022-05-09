import React from 'react';
import ContentLoader from 'react-content-loader';

const HeaderLoader = () => (
  <div>
    <ContentLoader
      height={200}
      width={240}
      speed={2}
      lightingColor="#f3f3f3"
      backgroundColor="#6c6c6c" 
      foregroundColor='#14F4B4'
    >
      <rect x="0" y="0" rx="20" ry="20" width="180" height="200" />  
    </ContentLoader>
  </div>
);

const BidsLoader = () => (
  <div className="card-column mx-2 my-2">
    <ContentLoader
      height={450}
      width={360}
      speed={2}
      lightingColor="#f3f3f3"
      backgroundColor="#6c6c6c" 
      foregroundColor='#14F4B4'
    >
      <rect x="0" y="0" rx="20" ry="20" width="360" height="450" />  
    </ContentLoader>
  </div>
);

export {HeaderLoader, BidsLoader};
