import React, { useEffect, useState } from "react";
import Textfield from "../Textfield/Textfield";
import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../DropdownList/Dropdown";
import Button from "../Button/Button";

const ContentWrapper = (props) => {
  return (
    <div style={{ width: "100%", minHeight: 0, padding: "5px" }}>
      {props.children}
    </div>
  );
};

export default ContentWrapper;
