import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const { label, value, options, onChange } = props;
  const styleee = {
    minWidth: "120px",
    padding: "4px",
    fontSize: "14px",
  };
  return (
    <label
      style={{
        padding: "4px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {label}
      <select value={value} onChange={onChange} style={{ ...styleee }}>
        {props?.needBlank ? <option value={""}>{""}</option> : null}
        {options?.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
export default Dropdown;
