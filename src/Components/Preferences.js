import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { categories, colors } from "./prefCategoriesColBradSize";
import { useAlert } from "react-alert";
import PreferenceComp from "./PreferenceComp";

const Preferences = () => {
  const [SC, setSC] = useState([]); // select category
  const [SCol, setSCol] = useState([]); // select color
  const user = useSelector((state) => state.user);
  const alert = useAlert();
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingColor, setIsLoadingColor] = useState(false);

  // console.log(SC);
  useEffect(() => {
    async function fetchData() {
      setIsLoadingCategory(true);
      setIsLoadingColor(true);
      await axios
        .get("https://interneyx.onrender.com/SelectedCategory", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then(async (res) => {
          let data = res.data;
          setIsLoadingCategory(false);
          data.forEach(async (element) => {
            await setSC((SC) => {
              if (SC.indexOf(element.CategoryName) === -1) {
                SC.push(element.CategoryName);
                document.getElementById(element.CategoryName).checked = true;
              }
              return SC;
            });
          });
        })
        .catch(async (err) => {
          console.log("Error SC", err);
          setIsLoadingCategory(false);
          const collection = await JSON.parse(localStorage.getItem("SCKey"));
          collection.forEach((element) => {
            setSC((SC) => {
              if (SC.indexOf(element) === -1) {
                SC.push(element);
                document.getElementById(element).checked = true;
              }
              return SC;
            });
          });
        });

      await axios
        .get("https://interneyx.onrender.com/SelectedColors", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then(async (res) => {
          let data = res.data;
          setIsLoadingColor(false);
          data.forEach(async (element) => {
            await setSCol((SCol) => {
              if (SCol.indexOf(element.ColorName) === -1) {
                SCol.push(element.ColorName);
                document.getElementById(element.ColorName).checked = true;
              }
              return SCol;
            });
          });
        })
        .catch(async (err) => {
          console.log("Error SCol", err);
          setIsLoadingColor(false);
          let collection = await JSON.parse(localStorage.getItem("SColKey"));
          collection.forEach((element) => {
            setSCol((SCol) => {
              if (SCol.indexOf(element) === -1) {
                SCol.push(element);
                document.getElementById(element).checked = true;
              }
              return SCol;
            });
          });
        });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [SC]);

  const handleCategoryChange = (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      setSC((SC) => {
        if (SC.indexOf(event.target.value) === -1) {
          SC.push(event.target.value);
          // console.log(SC);
        }
        return SC;
      });
    } else {
      setSC((SC) => {
        const temp = event.target.value;
        const newArr = SC.filter((e) => e !== temp);
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
        }
        return SCol;
      });
    } else {
      setSCol((SCol) => {
        const temp = event.target.value;
        const newArr = SCol.filter((e) => e !== temp);
        // console.log(newArr);
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
        "https://interneyx.onrender.com/updateCategory",
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
        SC.length && localStorage.setItem("SCKey", JSON.stringify(SC));
      })
      .catch((err) => {
        alert.error("Can't Save Categories, Please Try Again Later");
      });

    await axios
      .post(
        "https://interneyx.onrender.com/updateColors",
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
        SCol.length && localStorage.setItem("SColKey", JSON.stringify(SCol));
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
        {/* {console.log(user.authToken)} */}
      </div>
      <div className="container preference-container">
        <div className="row preference-row d-flex justify-content-evenly">
          <PreferenceComp
            name="Categories"
            element={categories}
            handleChange={handleCategoryChange}
            isLoading={isLoadingCategory}
          />
          <PreferenceComp
            name="Colors"
            element={colors}
            handleChange={handleColorChange}
            isLoading={isLoadingColor}
          />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
