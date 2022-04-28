import React, { useEffect, useState } from "react";

const Button = (props) => {
  const { label, onClick, style, ...rest } = props;
  return (
    <div>
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          width: "100px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "2px solid blue",
          fontWeight: "500",
          ...style,
        }}
        onClick={onClick}
        {...rest}
      >
        {label}
      </button>
    </div>
  );
};
export default Button;
