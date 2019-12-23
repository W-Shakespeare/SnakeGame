import React from "react";

function P({ children, className, change }) {
  console.log(change);
  return (
    <p
      style={{
        color: change ? "blue" : "black",
        fontSize: change ? "30px" : "20px"
      }}
      className={className}
    >
      {children}
    </p>
  );
}
export default P;
