import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../features/items/itemsSlice";
import Products from "./Products";
import { InfinitySpin } from "react-loader-spinner";
import PaginationFooter from "./PaginationFooter";
import PageInfo from "./PageInfo";

const MainPage = () => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [query, setQuery] = useState("");
  const limit = 8;

  useEffect(() => {
    // console.log("Count", count);
    function fetchit() {
      dispatch(fetchItems({ limit, skip: limit * count }));
    }
    fetchit();
  }, [count]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // console.log("searchCount", searchCount);
    function fetchit() {
      dispatch(fetchItems({ limit, skip: limit * searchCount, query }));
    }
    if (query) fetchit();
  }, [searchCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleSearch() {
      setSearchCount(0);
      if (query) {
        // console.log("Query");
        dispatch(fetchItems({ limit, skip: limit * searchCount, query }));
      } else {
        // console.log("Not query");
        dispatch(fetchItems({ limit, skip: limit * count }));
      }
    }
    handleSearch();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePreviousClick = () => {
    if (query) {
      setSearchCount((searchCount) => searchCount - 1);
    } else {
      setCount((count) => count - 1);
    }
    // console.log("count: ", count, "searchCount: ", searchCount);
  };
  const handleNextClick = () => {
    if (query) {
      setSearchCount((searchCount) => searchCount + 1);
    } else {
      setCount((count) => count + 1);
    }
    // console.log("count: ", count, "searchCount: ", searchCount);
  };
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="container my-7 ">
      <h1 className="text-center my-2">Products Page</h1>
      <h5 className="text-center">Experience Luxury Like Never Before</h5>
      <PageInfo
        limit={limit}
        total={items.total}
        pagenum={query ? searchCount + 1 : count + 1}
      />
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
        {!items.loading && items.items.length
          ? items.items.map((item) => <Products item={item} key={item.title} />)
          : null}
      </div>
      <PaginationFooter
        prevBoundry={(query && !searchCount) || (!query && !count)}
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
        nextBoundry={
          (!query && count >= items.total / limit - 1) ||
          (query && searchCount >= items.total / limit - 1)
        }
      />
    </div>
  );
};

export default MainPage;
