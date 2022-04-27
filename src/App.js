import React, { useState } from "react";
import Textfield from "./components/Textfield/Textfield";
import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/DropdownList/Dropdown";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";
import admins from "../config.json";

//https://www.digitalocean.com/community/tutorials/how-to-push-an-existing-project-to-github
//https://blog.bitsrc.io/create-react-app-without-create-react-app-b0a5806a92
//https://www.git-tower.com/learn/git/faq/git-rename-master-to-main

const App = () => {
  const [val, setVal] = useState("");
  const [filteredArray, setFilteredArray] = useState([
    {
      orderNo: 1,
      customerName: "Kivell",
      Status: "Accepted",
      Category: "Electronics",
      Country: "United Kingdom",
      createdDate: "1/23/2019",
    },
    {
      orderNo: 2,
      customerName: "Jardine",
      Status: "Processing",
      Category: "Furniture",
      Country: "Rusia",
      createdDate: "2/9/2019",
    },
    {
      orderNo: 3,
      customerName: "Gill",
      Status: "Rejected",
      Category: "Stationery",
      Country: "German",
      createdDate: "2/26/2019",
    },
    {
      orderNo: 4,
      customerName: "Sor'vino",
      Status: "Open",
      Category: "Furniture",
      Country: "Singapore",
      createdDate: "3/15/2019",
    },
    {
      orderNo: 5,
      customerName: "Jones",
      Status: "Rejected",
      Category: "Sports",
      Country: "German",
      createdDate: "4/1/2019",
    },
    {
      orderNo: 6,
      customerName: "Andrews",
      Status: "Processing",
      Category: "Electronics",
      Country: "Malaysia",
      createdDate: "4/18/2019",
    },
    {
      orderNo: 7,
      customerName: "Jardine",
      Status: "Processing",
      Category: "Sports",
      Country: "German",
      createdDate: "5/5/2019",
    },
    {
      orderNo: 8,
      customerName: "Thompson",
      Status: "Accepted",
      Category: "Hardware",
      Country: "Malaysia",
      createdDate: "1/23/2019",
    },
    {
      orderNo: 9,
      customerName: "Jones",
      Status: "Open",
      Category: "Furniture",
      Country: "Taiwan",
      createdDate: "6/8/2019",
    },
    {
      orderNo: 10,
      customerName: "Morgan",
      Status: "Processing",
      Category: "Sports",
      Country: "China",
      createdDate: "4/18/2019",
    },
  ]);
  const [modalState, setModalState] = useState(false);
  const [fieldState, setFieldState] = useState({
    Status: { checked: false, value: [] },
    Category: { checked: false, value: [] },
    Country: { checked: false, value: [] },
    CreatedDate: { checked: false, value: { From: "", To: "" } },
    CustomerName: { checked: false, value: [] },
  });
  // console.log("this is field state", fieldState);
  console.log("this is config", admins);
  const SalesOrderList = [
    {
      orderNo: 1,
      customerName: "Kivell",
      Status: "Accepted",
      Category: "Electronics",
      Country: "United Kingdom",
      createdDate: "1/23/2019",
    },
    {
      orderNo: 2,
      customerName: "Jardine",
      Status: "Processing",
      Category: "Furniture",
      Country: "Rusia",
      createdDate: "2/9/2019",
    },
    {
      orderNo: 3,
      customerName: "Gill",
      Status: "Rejected",
      Category: "Stationery",
      Country: "German",
      createdDate: "2/26/2019",
    },
    {
      orderNo: 4,
      customerName: "Sor'vino",
      Status: "Open",
      Category: "Furniture",
      Country: "Singapore",
      createdDate: "3/15/2019",
    },
    {
      orderNo: 5,
      customerName: "Jones",
      Status: "Rejected",
      Category: "Sports",
      Country: "German",
      createdDate: "4/1/2019",
    },
    {
      orderNo: 6,
      customerName: "Andrews",
      Status: "Processing",
      Category: "Electronics",
      Country: "Malaysia",
      createdDate: "4/18/2019",
    },
    {
      orderNo: 7,
      customerName: "Jardine",
      Status: "Processing",
      Category: "Sports",
      Country: "German",
      createdDate: "5/5/2019",
    },
    {
      orderNo: 8,
      customerName: "Thompson",
      Status: "Accepted",
      Category: "Hardware",
      Country: "Malaysia",
      createdDate: "1/23/2019",
    },
    {
      orderNo: 9,
      customerName: "Jones",
      Status: "Open",
      Category: "Furniture",
      Country: "Taiwan",
      createdDate: "6/8/2019",
    },
    {
      orderNo: 10,
      customerName: "Morgan",
      Status: "Processing",
      Category: "Sports",
      Country: "China",
      createdDate: "4/18/2019",
    },
  ];
  const headerVal = [
    { label: "Order No", val: "orderNo" },
    { label: "Customer Name", val: "customerName" },
    { label: "Status", val: "Status" },
    { label: "Category", val: "Category" },
    { label: "Country", val: "Country" },
    { label: "Created Date", val: "createdDate" },
  ];

  function confirmedFilter() {
    let filterParam = {};
    for (var key in fieldState) {
      if (fieldState[key].checked) {
        filterParam[key] = fieldState[key].value;
      }
    }

    let filtered = [...SalesOrderList];
    for (var key in filterParam) {
      if (key === "CreatedDate") {
      } else {
        if (filterParam[key]?.includes("All")) {
          continue;
        }
        if (filterParam[key]?.includes("Others")) {
          let originalStripped = [
            "All",
            "Electronics",
            "Furniture",
            "Others",
          ].filter((x) => x !== "All" && x !== "Others");
          originalStripped = originalStripped?.filter((x) => {
            if (!filterParam[key]?.includes(x)) return true;
            else return false;
          });
          filtered = filtered.filter((f) => {
            if (originalStripped?.includes(f[key])) return false;
            else return true;
          });
          continue;
        }
        filtered = filtered.filter((f) => {
          if (filterParam[key]?.includes(f[key])) return true;
          else return false;
        });
      }
    }

    setFilteredArray(filtered);
    return true;
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: 0,
          margin: 0,
          padding: 0,
          //backgroundColor: "blue",
        }}
      >
        <h1>
          Welcome to React App thats build using Webpack and Babel separately
        </h1>
        <Textfield
          id="test"
          name="name"
          onChange={(e) => {
            //console.log(e.target.value);
            setVal(e.target.value);
          }}
          value={val}
        />
        <Checkbox label="Created Date" />
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
            //  console.log("this is button");
            setModalState(true);
          }}
        />
        <div>
          <table>
            <tr>
              {headerVal.map((header) => {
                return <th>{header.label}</th>;
              })}
            </tr>
            {filteredArray?.map((so) => {
              return (
                <tr>
                  <td>{so?.orderNo}</td>
                  <td>{so?.customerName}</td>
                  <td>{so?.Status}</td>
                  <td>{so?.Category}</td>
                  <td>{so?.Country}</td>
                  <td>{so?.createdDate}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <Modal open={modalState}>
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
              <Checkbox
                label={"Created Date"}
                value={fieldState["CreatedDate"]?.checked}
                onChange={(e) => {
                  setFieldState({
                    ...fieldState,
                    ["CreatedDate"]: {
                      checked: e.target.checked,
                      value: { ...fieldState["CreatedDate"].value },
                    },
                  });
                }}
              />
              <span>Display range from</span>
              <Textfield
                id="test"
                name="name"
                onChange={(e) => {
                  //    console.log(e.target.value);
                  setVal(e.target.value);
                }}
                value={val}
              />{" "}
              <span>to</span>
              <Textfield
                id="test"
                name="name"
                onChange={(e) => {
                  //    console.log(e.target.value);
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
              <Checkbox
                label={"Customer Name"}
                value={fieldState["CustomerName"]?.checked}
                onChange={(e) => {
                  setFieldState({
                    ...fieldState,
                    ["CustomerName"]: {
                      checked: e.target.checked,
                      value: [...fieldState["CustomerName"].value],
                    },
                  });
                }}
              />
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
                gap: "20px",
              }}
            >
              <Checkbox
                label={"Status"}
                value={fieldState["Status"]?.checked}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFieldState({
                      ...fieldState,
                      ["Status"]: {
                        checked: e.target.checked,
                        value: [
                          "All",
                          "Open",
                          "Processing",
                          "Accepted",
                          "Rejected",
                        ],
                      },
                    });
                    return;
                  }
                  setFieldState({
                    ...fieldState,
                    ["Status"]: {
                      checked: e.target.checked,
                      value: [""],
                    },
                  });
                  return;
                }}
              />
              {["All", "Open", "Processing", "Accepted", "Rejected"].map(
                (x) => {
                  return (
                    <Checkbox
                      label={x}
                      value={
                        fieldState["Status"].value.includes(x) ||
                        fieldState["Status"].value.includes("All")
                      }
                      onChange={(e) => {
                        let statsValue = [
                          ...new Set([...fieldState["Status"].value, x]),
                        ];
                        if (e.target.checked) {
                          if (x === "All") {
                            setFieldState({
                              ...fieldState,
                              ["Status"]: {
                                ...fieldState["Status"],
                                value: [
                                  "All",
                                  "Open",
                                  "Processing",
                                  "Accepted",
                                  "Rejected",
                                ],
                              },
                            });
                            return;
                          }
                          let tryFilter = statsValue?.filter(
                            (s) => s !== "All"
                          );
                          if (
                            tryFilter?.length > 0 &&
                            tryFilter?.length ===
                              [
                                "All",
                                "Open",
                                "Processing",
                                "Accepted",
                                "Rejected",
                              ].length -
                                1
                          ) {
                            setFieldState({
                              ...fieldState,
                              ["Status"]: {
                                ...fieldState["Status"],
                                value: [
                                  "All",
                                  "Open",
                                  "Processing",
                                  "Accepted",
                                  "Rejected",
                                ],
                              },
                            });
                            return;
                          }
                          setFieldState({
                            ...fieldState,
                            ["Status"]: {
                              ...fieldState["Status"],
                              value: [
                                ...statsValue?.filter((s) => s !== "All"),
                              ],
                            },
                          });
                          return;
                        }
                        if (x === "All") {
                          setFieldState({
                            ...fieldState,
                            ["Status"]: {
                              ...fieldState["Status"],
                              value: [],
                            },
                          });
                          return;
                        }
                        setFieldState({
                          ...fieldState,
                          ["Status"]: {
                            ...fieldState["Status"],
                            value: [
                              ...statsValue.filter(
                                (s) => s !== x && s !== "All"
                              ),
                            ],
                          },
                        });
                      }}
                    />
                  );
                }
              )}
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
                gap: "20px",
              }}
            >
              <Checkbox
                label={"Category"}
                value={fieldState["Category"]?.checked}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFieldState({
                      ...fieldState,
                      ["Category"]: {
                        checked: e.target.checked,
                        value: ["All", "Electronics", "Furniture", "Others"],
                      },
                    });
                    return;
                  }
                  setFieldState({
                    ...fieldState,
                    ["Category"]: {
                      checked: e.target.checked,
                      value: [""],
                    },
                  });
                  return;
                }}
              />
              {["All", "Electronics", "Furniture", "Others"]?.map((x) => {
                return (
                  <Checkbox
                    label={x}
                    value={
                      fieldState["Category"].value.includes(x) ||
                      fieldState["Category"].value.includes("All")
                    }
                    onChange={(e) => {
                      let statsValue = [
                        ...new Set([...fieldState["Category"].value, x]),
                      ];
                      //    console.log(e.target.checked, x, statsValue);
                      if (e.target.checked) {
                        if (x === "All") {
                          setFieldState({
                            ...fieldState,
                            ["Category"]: {
                              ...fieldState["Category"],
                              value: [
                                "All",
                                "Electronics",
                                "Furniture",
                                "Others",
                              ],
                            },
                          });
                          return;
                        }
                        let tryFilter = statsValue?.filter((s) => s !== "All");
                        if (
                          tryFilter?.length > 0 &&
                          tryFilter?.length ===
                            ["All", "Electronics", "Furniture", "Others"]
                              .length -
                              1
                        ) {
                          setFieldState({
                            ...fieldState,
                            ["Category"]: {
                              ...fieldState["Category"],
                              value: [
                                "All",
                                "Electronics",
                                "Furniture",
                                "Others",
                              ],
                            },
                          });
                          return;
                        }
                        setFieldState({
                          ...fieldState,
                          ["Category"]: {
                            ...fieldState["Category"],
                            value: [...statsValue?.filter((s) => s !== "All")],
                          },
                        });
                        return;
                      }
                      if (x === "All") {
                        setFieldState({
                          ...fieldState,
                          ["Category"]: {
                            ...fieldState["Category"],
                            value: [],
                          },
                        });
                        return;
                      }
                      setFieldState({
                        ...fieldState,
                        ["Category"]: {
                          ...fieldState["Category"],
                          value: [
                            ...statsValue.filter((s) => s !== x && s !== "All"),
                          ],
                        },
                      });
                    }}
                  />
                );
              })}
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
              <Checkbox
                label={"Country"}
                value={fieldState["Country"]?.checked}
                onChange={(e) => {
                  setFieldState({
                    ...fieldState,
                    ["Country"]: {
                      checked: e.target.checked,
                      value: [...fieldState["Country"].value],
                    },
                  });
                }}
              />
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
                label={"Reset"}
                onClick={(e) => {
                  //      console.log("this is button");
                }}
              />
              <Button
                label={"Apply"}
                onClick={(e) => {
                  //         console.log("this is button");
                  confirmedFilter() ? setModalState(false) : null;
                }}
              />
              <Button
                label={"Close"}
                onClick={(e) => {
                  //         console.log("this is button");
                  setModalState(false);
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
