import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categories, colors } from "./prefCategoriesColBradSize";
import { useAlert } from "react-alert";

const Preferences = () => {
  const [SC, setSC] = useState([]); // select category
  const [SCol, setSCol] = useState([]); // select color
  const user = useSelector((state) => state.user);
  const alert = useAlert();

  // console.log(SC);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3500/SelectedCategory", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then((res) => {
          let data = res.data;
          data.forEach((element) => {
            setSC((SC) => {
              if (SC.indexOf(element.CategoryName) === -1) {
                SC.push(element.CategoryName);
                document.getElementById(element.CategoryName).checked = true;
              }
              return SC;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("http://localhost:3500/SelectedColors", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then((res) => {
          let data = res.data;
          data.forEach((element) => {
            setSCol((SCol) => {
              if (SCol.indexOf(element.ColorName) === -1) {
                SCol.push(element.ColorName);
                document.getElementById(element.ColorName).checked = true;
              }
              return SCol;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      setSC((SC) => {
        if (SC.indexOf(event.target.value) === -1) {
          SC.push(event.target.value);
          console.log(SC);
        }
        return SC;
      });
    } else {
      setSC((SC) => {
        const temp = event.target.value;
        const newArr = SC.filter((e) => e !== temp);
        console.log(newArr);
        return newArr;
      });
    }
  };
  const handleColorChange = (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      setSCol((SCol) => {
        if (SCol.indexOf(event.target.value) === -1) {
          SCol.push(event.target.value);
          console.log(SCol);
        }
        // console.log("1", SCol);
        return SCol;
      });
    } else {
      setSCol((SCol) => {
        const temp = event.target.value;
        const newArr = SCol.filter((e) => e !== temp);
        console.log(newArr);
        return newArr;
      });
    }
  };
  const handleSave = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    // console.log(SC);
    await axios
      .post(
        "http://localhost:3500/updateCategory",
        {
          categories: SC,
        },
        {
          headers: {
            "auth-token": user.authToken,
          },
        }
      )
      .then((res) => {
        alert.success("Successfully Saved Categories");
      })
      .catch((err) => {
        alert.error("Can't Save Categories, Please Try Again Later");
      });

    await axios
      .post(
        "http://localhost:3500/updateColors",
        {
          colors: SCol,
        },
        {
          headers: {
            "auth-token": user.authToken,
          },
        }
      )
      .then((res) => {
        alert.success("Successfully Saved Colors");
      })
      .catch((err) => {
        alert.error("Can't Save Colors, Please Try Again Later");
      });
    // console.log("Selected Colors", SCol);
  };

  return (
    <div className="container">
      <h1 className="text-center">Select Your Preferences</h1>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary my-3"
          type="submit"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="container preference-container">
        <div className="row preference-row d-flex justify-content-evenly">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 my-4 h-100 rounded ">
            <h5 className="text-center">Select Categories</h5>
            <div className="All Colors">
              <ul>
                {categories.map((category) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={category}
                      id={category}
                      key={category}
                      onChange={handleCategoryChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {category}
                    </label>
                    <span className="badge"></span>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 my-4 h-100 rounded ">
            <h5 className="text-center">Select Color</h5>
            <div className="All Brands">
              <ul>
                {colors.map((color) => (
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={color}
                      id={color}
                      key={color}
                      onChange={handleColorChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {color}
                    </label>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
