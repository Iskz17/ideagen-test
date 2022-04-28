import React, { useEffect, useState } from "react";

const Textfield = (props) => {
  const { Name, id, onChange, value } = props;
  const styleee = {
    width: "120px",
    padding: "4px",
    fontSize: "14px",
  };
  return (
    <input
      type="text"
      id={id}
      name={Name}
      value={value}
      onChange={onChange}
      style={{ ...styleee }}
      placeholder="MM/DD/YYYY"
    />
  );
};
export default Textfield;
