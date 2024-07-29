// import React from 'react';

// interface LawyerInfoProps {
//   imageUrl: string;
//   title: string;
//   description: string;
// }

// const LawyerInfo: React.FC<LawyerInfoProps> = ({ imageUrl, title, description }) => {
//   return (
//     <div className="relative w-full h-full flex items-center justify-center">
//       <img src={imageUrl} className="w-full h-full pt-24 px-14 object-cotain" />
//       <div className="absolute bottom-1/9 bg-black bg-opacity-85 border text-white p-4 rounded-3xl w-[100%] h-[180px] flex flex-col">
//         <div className="absolute top-[-40px] left-8 bg-black bg-opacity-90 border text-white px-6 rounded-3xl rounded-tr-3xl">
//           <h2 className="text-3xl font-light">{title}</h2>
//         </div>
//         <div className="h-full flex justify-center items-center text-3xl font-light">
//           <p>{description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LawyerInfo;

import React from 'react';

interface LawyerInfoProps {
  imageUrl: string;
  title: string;
  description: string;
}

const LawyerInfo: React.FC<LawyerInfoProps> = ({ imageUrl, title, description }) => {
  return (    
      <div
        className="flex flex-col justify-center items-center w-full h-full bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="w-[700px] h-[590px] mb-9"></div>
        <div className="relative bg-black bg-opacity-85 border text-white rounded-3xl w-[700px] h-[180px] flex flex-col">
          <div className="absolute top-[-40px] left-8 bg-black bg-opacity-90 border text-white px-6 rounded-3xl">
            <h2 className="text-3xl font-light">{title}</h2>
          </div>
          <div className="h-full flex justify-center items-center text-3xl font-light">
            <p>{description}</p>
          </div>
        </div>

      </div>
  );
};

export default LawyerInfo;