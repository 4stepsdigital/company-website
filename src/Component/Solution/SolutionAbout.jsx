import React from "react";

const SolutionAbout = ({ about }) => {
  return (
    <div>
      <div className="  md:px-4 md:text-base lg:text-base  text-sm pt-5">
        <p dangerouslySetInnerHTML={{ __html: about }} />
      </div>
    </div>
  );
};

export default SolutionAbout;
          