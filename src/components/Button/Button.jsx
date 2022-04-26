import React, { useEffect, useState } from "react";

const Button = (props) => {
  const { label, onClick } = props;
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};
export default Button;
