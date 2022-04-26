import React, { useState } from "react";
import Textfield from "./components/Textfield/Textfield";
import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/DropdownList/Dropdown";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";

//https://www.digitalocean.com/community/tutorials/how-to-push-an-existing-project-to-github
//https://blog.bitsrc.io/create-react-app-without-create-react-app-b0a5806a92
//https://www.git-tower.com/learn/git/faq/git-rename-master-to-main

const App = () => {
  const [val, setVal] = useState("");
  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: 0,
          margin: 0,
          padding: 0,
          backgroundColor: "blue",
        }}
      >
        <h1>
          Welcome to React App thats build using Webpack and Babel separately
        </h1>
        <Textfield
          id="test"
          name="name"
          onChange={(e) => {
            console.log(e.target.value);
            setVal(e.target.value);
          }}
          value={val}
        />
        <Checkbox />
        <Dropdown
          value={undefined}
          options={[
            { label: "test", value: "bro" },
            { label: "test2", value: "nono" },
            { label: "All", value: "yes" },
          ]}
        />
        <Button
          label={"Button"}
          onClick={(e) => {
            console.log("this is button");
          }}
        />
        <Modal>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "lightblue",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexWrap: "nowrap",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
              }}
            >
              <span>Filters</span>
              <span style={{ display: "flex" }}>
                Select criteria filter in listing
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "3px",
              }}
            >
              <Checkbox />
              <span>Display range from</span>
              <Textfield
                id="test"
                name="name"
                onChange={(e) => {
                  console.log(e.target.value);
                  setVal(e.target.value);
                }}
                value={val}
              />{" "}
              <span>to</span>
              <Textfield
                id="test"
                name="name"
                onChange={(e) => {
                  console.log(e.target.value);
                  setVal(e.target.value);
                }}
                value={val}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "3px",
              }}
            >
              <Checkbox />
              <Dropdown
                value={undefined}
                options={[
                  { label: "test", value: "bro" },
                  { label: "test2", value: "nono" },
                  { label: "All", value: "yes" },
                ]}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "3px",
              }}
            >
              <Checkbox />
              <Checkbox />
              <Checkbox />
              <Checkbox />
              <Checkbox />
              <Checkbox />
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "3px",
              }}
            >
              <Checkbox />
              <Checkbox />
              <Checkbox />
              <Checkbox />
              <Checkbox />
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "3px",
              }}
            >
              <Checkbox />
              <Dropdown
                value={undefined}
                options={[
                  { label: "test", value: "bro" },
                  { label: "test2", value: "nono" },
                  { label: "All", value: "yes" },
                ]}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "50px",
                background: "lightyellow",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "3px",
              }}
            >
              <Button
                label={"Button"}
                onClick={(e) => {
                  console.log("this is button");
                }}
              />
              <Button
                label={"Button"}
                onClick={(e) => {
                  console.log("this is button");
                }}
              />
              <Button
                label={"Button"}
                onClick={(e) => {
                  console.log("this is button");
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default App;
