import React, { useState, useEffect } from "react";
import Textfield from "./components/Textfield/Textfield";
import Checkbox from "./components/Checkbox/Checkbox";
import Dropdown from "./components/DropdownList/Dropdown";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import ContentWrapper from "./components/ContentWrapper/ContentWrapper";
import data from "../config.json";
import "./App.css";

//https://www.digitalocean.com/community/tutorials/how-to-push-an-existing-project-to-github
//https://blog.bitsrc.io/create-react-app-without-create-react-app-b0a5806a92
//https://www.git-tower.com/learn/git/faq/git-rename-master-to-main

const App = () => {
  const previousFieldState = JSON.parse(localStorage.getItem("fieldState"));
  const previousSortData = JSON.parse(localStorage.getItem("sortData"));

  const [filteredArray, setFilteredArray] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState(false);
  const [changeField, setChangeField] = useState(false);
  const [fieldState, setFieldState] = useState({
    Status: { checked: false, value: [] },
    Category: { checked: false, value: [] },
    Country: { checked: false, value: [] },
    CreatedDate: { checked: false, value: { From: "", To: "" } },
    CustomerName: { checked: false, value: [] },
  });
  const [sortData, setSortData] = useState({ key: "", increase: true });

  const SalesOrderList = [
    {
      OrderNo: 1,
      CustomerName: "Kivell",
      Status: "Accepted",
      Category: "Electronics",
      Country: "United Kingdom",
      CreatedDate: "1/23/2019",
    },
    {
      OrderNo: 2,
      CustomerName: "Jardine",
      Status: "Processing",
      Category: "Furniture",
      Country: "Rusia",
      CreatedDate: "2/9/2019",
    },
    {
      OrderNo: 3,
      CustomerName: "Gill",
      Status: "Rejected",
      Category: "Stationery",
      Country: "German",
      CreatedDate: "2/26/2019",
    },
    {
      OrderNo: 4,
      CustomerName: "Sor'vino",
      Status: "Open",
      Category: "Furniture",
      Country: "Singapore",
      CreatedDate: "3/15/2019",
    },
    {
      OrderNo: 5,
      CustomerName: "Jones",
      Status: "Rejected",
      Category: "Sports",
      Country: "German",
      CreatedDate: "4/1/2019",
    },
    {
      OrderNo: 6,
      CustomerName: "Andrews",
      Status: "Processing",
      Category: "Electronics",
      Country: "Malaysia",
      CreatedDate: "4/18/2019",
    },
    {
      OrderNo: 7,
      CustomerName: "Jardine",
      Status: "Processing",
      Category: "Sports",
      Country: "German",
      CreatedDate: "5/5/2019",
    },
    {
      OrderNo: 8,
      CustomerName: "Thompson",
      Status: "Accepted",
      Category: "Hardware",
      Country: "Malaysia",
      CreatedDate: "1/23/2019",
    },
    {
      OrderNo: 9,
      CustomerName: "Jones",
      Status: "Open",
      Category: "Furniture",
      Country: "Taiwan",
      CreatedDate: "6/8/2019",
    },
    {
      OrderNo: 10,
      CustomerName: "Morgan",
      Status: "Processing",
      Category: "Sports",
      Country: "China",
      CreatedDate: "4/18/2019",
    },
  ];
  const headerVal = [
    { label: "Order No", val: "OrderNo" },
    { label: "Customer Name", val: "CustomerName" },
    { label: "Status", val: "Status" },
    { label: "Category", val: "Category" },
    { label: "Country", val: "Country" },
    { label: "Created Date", val: "CreatedDate" },
  ];

  useEffect(() => {
    if (previousFieldState) {
      setFieldState(previousFieldState);
      confirmedFilter(previousFieldState);
    } else {
      setFilteredArray(SalesOrderList);
    }
    if (previousSortData) {
      setSortData(previousSortData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fieldState", JSON.stringify(fieldState));
    setChangeField(true);
  }, [fieldState]);

  useEffect(() => {
    localStorage.setItem("sortData", JSON.stringify(sortData));
  }, [sortData]);

  function confirmedFilter(fieldStatePassed = null) {
    let filterParam = {};
    let fieldVal = fieldStatePassed ?? fieldState;
    for (var key in fieldVal) {
      if (fieldVal[key].checked) {
        filterParam[key] = fieldVal[key].value;
      }
    }

    let filtered = [...SalesOrderList];
    for (var key in filterParam) {
      if (key === "CreatedDate") {
        let date = filterParam[key];
        if (date.To === "" && date.From === "") {
          continue;
        }
        if (!new Date(date.To).getTime() && !new Date(date.From).getTime()) {
          continue;
        }
        if (new Date(date.To).getTime() < new Date(date.From).getTime()) {
          continue;
        }

        filtered = filtered.filter((f) => {
          console.log(
            new Date(f.CreatedDate).getTime() >= new Date(date.From).getTime(),
            new Date(f.CreatedDate).getTime(),
            new Date(date.From).getTime(),
            "from < created"
          );
          if (
            new Date(f.CreatedDate).getTime() >= new Date(date.From).getTime()
          ) {
            console.log(
              new Date(date.To).getTime() >= new Date(f.CreatedDate).getTime(),
              new Date(date.To).getTime(),
              new Date(f.CreatedDate).getTime(),
              "to > created"
            );
            if (
              new Date(date.To).getTime() >= new Date(f.CreatedDate).getTime()
            ) {
              return true;
            }
            return false;
          } else {
            return false;
          }
        });
        continue;
      } else {
        if (filterParam[key]?.includes("All")) {
          continue;
        }
        if (filterParam[key]?.includes("Others")) {
          let originalStripped = [...data["category"]].filter(
            (x) => x !== "All" && x !== "Others"
          );
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
        if (filterParam[key]?.length === 0) {
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

  function SortingFunc(arr) {
    if (sortData.key === "") {
      return arr;
    }

    let inverse = sortData.increase ? 1 : -1;

    switch (sortData.key) {
      case "CreatedDate": {
        arr.sort((x, y) => {
          return (
            inverse *
            (new Date(x.CreatedDate).getTime() >=
            new Date(y.CreatedDate).getTime()
              ? 1
              : -1)
          );
        });
        return arr;
      }

      case "OrderNo": {
        arr.sort((x, y) => {
          return (
            inverse * (parseInt(x.OrderNo) >= parseInt(y.OrderNo) ? 1 : -1)
          );
        });
        return arr;
      }

      default: {
        arr.sort((x, y) => {
          return inverse * (x[sortData.key] >= y[sortData.key] ? 1 : -1);
        });
        return arr;
      }
    }
  }

  const handleReset = () => {
    setSortData({ key: "", increase: true });
    setFieldState({
      Status: { checked: false, value: [] },
      Category: { checked: false, value: [] },
      Country: { checked: false, value: [] },
      CreatedDate: { checked: false, value: { From: "", To: "" } },
      CustomerName: { checked: false, value: [] },
    });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#e0e0e0",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          padding: 0,
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "hidden",
          zIndex: "-100",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: 0,
            margin: 0,
            padding: 0,
            //backgroundColor: "blue",
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              marginLeft: "50px",
              color: "rgba(0,0,0,0.45)",
            }}
          >
            Sales Order Page
          </h1>

          <div className="App">
            <div
              style={{
                width: "800px",
                height: "80px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* <Button
                label={`🧪`}
                onClick={(e) => {
                  //  console.log("this is button");
                  setModalState(true);
                }}
              /> */}
              <div
                onClick={(e) => {
                  setModalState(true);
                }}
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "24px",
                  borderRadius: "5px",
                  background: "#54869c",
                  boxShadow: "4px 4px 7px #4c7a8e, -4px -4px 7px #5c92aa",
                  cursor: "pointer",
                }}
              >
                🧪
              </div>
            </div>

            <table>
              <tr>
                {headerVal.map((header) => {
                  return (
                    <th
                      onClick={() => {
                        if (header.val !== sortData.key) {
                          setSortData({ ...sortData, ["key"]: header.val });
                          return;
                        }
                        setSortData({
                          key: header.val,
                          increase: !sortData.increase,
                        });
                      }}
                      style={{
                        borderBottom:
                          header.val === sortData.key
                            ? "3px solid black"
                            : "1px solid black",
                      }}
                    >{`${header.label} ${
                      sortData.key === header.val
                        ? sortData.increase
                          ? "🔼"
                          : "🔽"
                        : ""
                    }`}</th>
                  );
                })}
              </tr>
              {SortingFunc(filteredArray)?.map((so) => {
                return (
                  <tr>
                    <td>{so?.OrderNo}</td>
                    <td>{so?.CustomerName}</td>
                    <td>{so?.Status}</td>
                    <td>{so?.Category}</td>
                    <td>{so?.Country}</td>
                    <td>{so?.CreatedDate}</td>
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
                // backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                flexDirection: "column",
                padding: "10px",
                paddingBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  minHeight: 0,
                  paddingBottom: "15px",
                  //background: "lightyellow",
                }}
              >
                <span style={{ fontSize: "30px", fontWeight: 500 }}>
                  Filters
                </span>
                <span style={{ display: "flex", fontSize: "15px" }}>
                  Select criteria filter in listing
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  // background: "lightyellow",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
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
                <span style={{ fontSize: "14px" }}>Display range from</span>
                <Textfield
                  id="test"
                  name="name"
                  onChange={(e) => {
                    //    console.log(e.target.value);
                    setFieldState({
                      ...fieldState,
                      ["CreatedDate"]: {
                        checked: fieldState["CreatedDate"].checked,
                        value: {
                          ...fieldState["CreatedDate"].value,
                          ["From"]: e.target.value,
                        },
                      },
                    });
                  }}
                  value={fieldState["CreatedDate"].value.From}
                />
                <span style={{ fontSize: "14px" }}>to</span>
                <Textfield
                  id="test"
                  name="name"
                  onChange={(e) => {
                    setFieldState({
                      ...fieldState,
                      ["CreatedDate"]: {
                        checked: fieldState["CreatedDate"].checked,
                        value: {
                          ...fieldState["CreatedDate"].value,
                          ["To"]: e.target.value,
                        },
                      },
                    });
                  }}
                  value={fieldState["CreatedDate"].value.To}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  //background: "lightyellow",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
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
                  value={fieldState["CustomerName"].value[0]}
                  options={[
                    ...data["customerName"]?.map((name) => {
                      return { label: name, value: name };
                    }),
                  ]}
                  needBlank={true}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setFieldState({
                        ...fieldState,
                        ["CustomerName"]: {
                          checked: false,
                          value: [],
                        },
                      });
                      return;
                    }
                    setFieldState({
                      ...fieldState,
                      ["CustomerName"]: {
                        checked: true,
                        value: [e.target.value],
                      },
                    });
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  //background: "lightyellow",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
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
                          value: [...data["status"]],
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
                {[...data["status"]].map((x) => {
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
                                value: [...data["status"]],
                              },
                            });
                            return;
                          }
                          let tryFilter = statsValue?.filter(
                            (s) => s !== "All"
                          );
                          if (
                            tryFilter?.length > 0 &&
                            tryFilter?.length === [...data["status"]].length - 1
                          ) {
                            setFieldState({
                              ...fieldState,
                              ["Status"]: {
                                ...fieldState["Status"],
                                value: [...data["status"]],
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
                })}
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  //background: "lightyellow",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
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
                          value: [...data["category"]],
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
                {[...data["category"]]?.map((x) => {
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
                                value: [...data["category"]],
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
                              [...data["category"]].length - 1
                          ) {
                            setFieldState({
                              ...fieldState,
                              ["Category"]: {
                                ...fieldState["Category"],
                                value: [...data["category"]],
                              },
                            });
                            return;
                          }
                          setFieldState({
                            ...fieldState,
                            ["Category"]: {
                              ...fieldState["Category"],
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
                              ...statsValue.filter(
                                (s) => s !== x && s !== "All"
                              ),
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
                  height: "40px",
                  //background: "lightyellow",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
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
                  value={fieldState["Country"].value[0]}
                  options={[
                    ...data["country"]?.map((name) => {
                      return { label: name, value: name };
                    }),
                  ]}
                  needBlank={true}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setFieldState({
                        ...fieldState,
                        ["Country"]: {
                          checked: false,
                          value: [],
                        },
                      });
                      return;
                    }
                    setFieldState({
                      ...fieldState,
                      ["Country"]: {
                        checked: true,
                        value: [e.target.value],
                      },
                    });
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  //background: "lightyellow",
                  position: "relative",
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <Button
                  label={"Reset"}
                  onClick={(e) => {
                    //      console.log("this is button");
                    handleReset();
                  }}
                  style={{
                    border: "none",
                    color: "black",
                    backgroundColor: "white",
                    fontWeight: 700,
                    border: "1px solid black",
                  }}
                />
                <Button
                  label={"Apply"}
                  onClick={(e) => {
                    //         console.log("this is button");
                    confirmedFilter() ? setModalState(false) : null;
                    setChangeField(false);
                  }}
                  style={{
                    position: "absolute",
                    right: 126,
                    bottom: 3,
                  }}
                />
                <Button
                  label={"Close"}
                  style={{
                    border: "2px solid blue",
                    color: "blue",
                    backgroundColor: "white",
                    position: "absolute",
                    right: 19,
                    bottom: 3,
                  }}
                  onClick={(e) => {
                    //         console.log("this is button");
                    setModalState(false);
                    if (changeField) {
                      setConfirmModalState(true);
                    }
                  }}
                />
              </div>
            </div>
          </Modal>
          <Modal open={confirmModalState}>
            <div
              style={{
                width: "100%",
                height: "100%",
                // backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexWrap: "nowrap",
                flexDirection: "column",
                padding: "10px",
                paddingBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  minHeight: 0,
                  paddingBottom: "15px",
                  //background: "lightyellow",
                }}
              >
                <span style={{ fontSize: "30px", fontWeight: 500 }}>
                  Confirm close?
                </span>
                <span style={{ display: "flex", fontSize: "15px" }}>
                  Selected criteria will not be applied
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  //background: "lightyellow",
                  position: "relative",
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <Button
                  label={"Confirm"}
                  onClick={(e) => {
                    setConfirmModalState(false);
                  }}
                  style={{
                    position: "absolute",
                    right: 126,
                    bottom: 3,
                  }}
                />
                <Button
                  label={"Cancel"}
                  style={{
                    border: "2px solid blue",
                    color: "blue",
                    backgroundColor: "white",
                    position: "absolute",
                    right: 19,
                    bottom: 3,
                  }}
                  onClick={(e) => {
                    setModalState(true);
                    setConfirmModalState(false);
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default App;
