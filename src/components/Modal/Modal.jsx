import React, { useEffect, useState } from "react";
import Textfield from "../Textfield/Textfield";
import Checkbox from "../Checkbox/Checkbox";
import Dropdown from "../DropdownList/Dropdown";
import Button from "../Button/Button";

const Modal = (props) => {
  const { open } = props;
  return (
    <>
      {open ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.65)",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            padding: 0,
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "60%",
              maxWidth: "700px",
              height: "60%",
              backgroundColor: "red",
              padding: "5px",
            }}
          >
            {props.children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
