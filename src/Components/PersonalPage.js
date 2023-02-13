import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Products from "./Products";
import { InfinitySpin } from "react-loader-spinner";
// import itemsSlice from "../features/items/itemsSlice";

const PersonalPage = () => {
  const [SC, setSC] = useState([]);
  const [SCol, setSCol] = useState([]);
  const [items, setItems] = useState([]);
  const user = useSelector((state) => state.user);

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
              }
              return SC;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      const temp = [];
      for (let i = 0; i < SC.length; i++) {
        await axios
          .get(`https://dummyjson.com/products/category/${SC[i]}`)
          .then((res) => {
            res.data.products.forEach((element) => {
              temp.push(element);
            });
          });
      }

      await axios
        .get("http://localhost:3500/SelectedColors", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then((res) => {
          let data = res.data;
          // console.log(data);
          data.forEach((element) => {
            setSCol((SCol) => {
              if (SCol.indexOf(element.ColorName) === -1) {
                SCol.push(element.ColorName);
              }
              return SCol;
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(SCol);

      for (let i = 0; i < SCol.length; i++) {
        await axios
          .get(`https://dummyjson.com/products/search?q=${SCol[i]}`)
          .then((res) => {
            res.data.products.forEach((element) => {
              temp.push(element);
              // console.log(element);
            });
          });
      }

      setItems((items) => {
        return temp;
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-7 ">
      <h1 className="text-center my-2">Personal Preference Page</h1>
      <div className="row my-10">
        {items.length ? (
          items.map((item) => <Products item={item} />)
        ) : (
          <InfinitySpin
            height="100"
            width="200"
            radius="15"
            color="#4285F4"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )}
      </div>
    </div>
  );
};

export default PersonalPage;
