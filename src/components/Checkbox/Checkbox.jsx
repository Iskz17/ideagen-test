import React, { useEffect, useState } from "react";

const Checkbox = (props) => {
  const { Name, id, onChange, value, defaultValue } = props;
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        name={Name}
        defaultValue={defaultValue}
        checked={value}
        onChange={onChange}
      />
      Hello
    </label>
  );
};
export default Checkbox;
