import React, { useEffect, useState } from "react";

const Textfield = (props) => {
  const { Name, id, onChange, value } = props;
  return (
    <input type="text" id={id} name={Name} value={value} onChange={onChange} />
  );
};
export default Textfield;
