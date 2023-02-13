import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemsSlice";
import Products from "./Products";
import { InfinitySpin } from "react-loader-spinner";

const MainPage = () => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const limit = 12;

  useEffect(() => {
    function fetchit() {
      dispatch(fetchItems({ limit, skip: limit * count }));
    }
    fetchit();
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePreviousClick = (count) => {
    setCount((count) => count - 1);
  };
  const handleNextClick = () => {
    setCount((count) => count + 1);
  };

  const handleSearch = (event) => {
    // console.log(event.target.value);
    const query = event.target.value;
    if (!query) {
      dispatch(fetchItems({ limit, skip: limit * count }));
    } else {
      function fetchit() {
        dispatch(fetchItems({ limit, skip: 0, query }));
      }
      fetchit();
    }
  };

  return (
    <div className="container my-7 ">
      <h1 className="text-center my-2">Products Page</h1>
      <h5 className="text-center">Experience Luxury Like Never Before</h5>
      <div className="d-flex justify-content-center">
        <input
          className="form-control mr-sm-2 my-4 w-50"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
        />
      </div>
      <div className="row my-10">
        {items.loading && (
          <div>
            <InfinitySpin
              height="150"
              width="250"
              radius="20"
              color="#4285F4"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        )}
        {!items.loading && items.error ? <div>Error: {items.error}</div> : null}
        {!items.loading && items.items.length
          ? items.items.map((item) => <Products item={item} />)
          : null}
      </div>
      <div className="d-flex justify-content-between my-5">
        <button
          disabled={count <= 0}
          onClick={handlePreviousClick}
          className="btn btn-primary"
        >
          &larr; Previous
        </button>
        <button
          disabled={count >= 100 / limit - 1}
          onClick={handleNextClick}
          className="btn btn-primary"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default MainPage;
