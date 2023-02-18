import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import PersonalPagePagination from "./PersonalPagePagination";
import PaginationFooter from "./PaginationFooter";
import PageInfo from "./PageInfo";
// import itemsSlice from "../features/items/itemsSlice";

const PersonalPage = () => {
  const [SC, setSC] = useState([]);
  const [SCol, setSCol] = useState([]);
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const user = useSelector((state) => state.user);
  const limit = 8;
  useEffect(() => {
    async function fetchData() {
      for (let i = 0; i < SC.length; i++) {
        await axios
          .get(`https://dummyjson.com/products/category/${SC[i].CategoryName}`)
          .then((res) => {
            res.data.products.forEach((element) => {
              if (items.indexOf(element) === -1)
                setItems((items) => [...items, element]);
            });
          })
          .catch((err) => console.log(err));
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SC]);

  // useEffect(() => {
  //   function pushItem() {
  //     if (navigator.onLine) {
  //       console.log("Online");
  //     } else console.log("Offline");
  //   }
  //   pushItem();
  // }, [items]);

  useEffect(() => {
    async function fetchData() {
      for (let i = 0; i < SCol.length; i++) {
        await axios
          .get(`https://dummyjson.com/products/search?q=${SCol[i].ColorName}`)
          .then((res) => {
            res.data.products.forEach((element) => {
              // eslint-disable-next-line
              if (items.indexOf(element) === -1)
                setItems((items) => [...items, element]);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SCol]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://interneyx.onrender.com/SelectedCategory", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then((res) => {
          setSC(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("https://interneyx.onrender.com/SelectedColors", {
          headers: {
            "auth-token": user.authToken,
          },
        })
        .then((res) => {
          setSCol(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (navigator.onLine) {
      console.log("Online");
      fetchData();
    } else {
      console.log("Offline");
      const teee = JSON.parse(localStorage.getItem("personalItems"));
      console.log("teee", teee);
      setItems(teee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (navigator.onLine)
      localStorage.setItem("personalItems", JSON.stringify(items));
  }, [items]);

  const handleNextClick = (event) => {
    event.preventDefault();
    setCount(count + 1);
  };
  const handlePreviousClick = (event) => {
    event.preventDefault();
    setCount(count - 1);
  };
  return (
    <div className="container my-7 ">
      <h1 className="text-center my-2">Personal Preference Page</h1>
      <div className="d-flex justify-content-center my-3">
        <PageInfo limit={limit} total={items.length} pagenum={count} />
      </div>
      <div className="row my-10">
        {items.length ? (
          <PersonalPagePagination limit={limit} count={count} items={items} />
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
      <PaginationFooter
        prevBoundry={count === 1}
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
        nextBoundry={count >= Math.ceil(items.length / limit)}
      />
    </div>
  );
};

export default PersonalPage;
