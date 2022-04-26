import React, { useEffect, useState } from "react";

const Button = (props) => {
  const { label, onClick, ...rest } = props;
  return (
    <div>
      <button {...rest} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};
export default Button;
