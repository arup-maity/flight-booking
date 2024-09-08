import React from 'react';

const LoadingView: React.FC = () => {
   return (
      <div className="loader-wrap relative w-[400px]">
         <svg className="loader" viewBox="0 0 400 400">
            <defs>
               <filter id="gooey" colorInterpolationFilters="sRGB">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"></feGaussianBlur>
                  <feColorMatrix
                     in="blur"
                     mode="matrix"
                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                     result="gooey"
                  ></feColorMatrix>
                  <feBlend in="SourceGraphic" in2="gooey"></feBlend>
               </filter>
            </defs>
            <g className="ellipses" fill="#8DD3BB" filter="url(#gooey)">
               <ellipse className="ellipse" cx="80" cy="200" rx="16" ry="16"></ellipse>
               <ellipse className="ellipse" cx="140" cy="200" rx="16" ry="16"></ellipse>
               <ellipse className="ellipse" cx="200" cy="200" rx="16" ry="16"></ellipse>
               <ellipse className="ellipse" cx="260" cy="200" rx="16" ry="16"></ellipse>
            </g>
         </svg>
      </div>
   );
};

export default LoadingView;
