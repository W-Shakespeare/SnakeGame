import React from "react";

function Inp({ id, className, type = "text", onChange, value, placeholder }) {
  return (
    <input
      id={id}
      className={className}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    ></input>
  );
}
export default Inp;
