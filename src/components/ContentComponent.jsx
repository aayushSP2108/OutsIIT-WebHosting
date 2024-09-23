import React from 'react';

const ContentComponent = ({ div1Content, div2Content }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col gap-6 p-7 md:w-1/2">
        {div1Content}
      </div>

      <div className="flex flex-col gap-6 p-7 md:w-1/2">
        {div2Content}
      </div>
    </div>
  );
};

export default ContentComponent;
