import React, { useEffect, useState } from "react";

const Dropdown = (props) => {
  const { label, value, options, onChange } = props;
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options?.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
export default Dropdown;
