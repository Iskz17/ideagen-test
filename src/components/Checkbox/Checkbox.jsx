import React, { useEffect, useState } from "react";

const Checkbox = (props) => {
  const { Name, id, onChange, value, defaultValue, label, ...rest } = props;
  return (
    <label
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        id={id}
        name={Name}
        defaultValue={defaultValue}
        checked={value}
        onChange={onChange}
        style={{ accentColor: "blue", height: "14px", width: "14px" }}
      />
      <span style={{ fontSize: "15px", marginLeft: "5px" }}>{label}</span>
    </label>
  );
};
export default Checkbox;
