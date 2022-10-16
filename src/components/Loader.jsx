import React from "react";
import PlaceholderLoading from "react-placeholder-loading";

const Loader = ({ shape }) => {
  return (
    <div>
      <PlaceholderLoading
        shape={shape}
        width={shape === "circle" ? 30 : 110}
        height={shape === "circle" ? 30 : 10}
        colorEnd="white"
        colorStart="lightgrey"
      />
    </div>
  );
};

export default Loader;
