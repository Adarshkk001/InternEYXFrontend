import React from "react";

const PageInfo = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <button type="button" className="btn btn-light mx-3">
        Total Products:
        <span className="badge text-black">{props.total}</span>
      </button>
      <button type="button" className="btn btn-light mx-3">
        Total Pages:
        <span className="badge text-black">
          {Math.ceil(props.total / props.limit)}
        </span>
      </button>
      <button type="button" className="btn btn-light">
        Page No.:
        <span className="badge text-black">
          {props.pagenum}
          {/* {query ? searchCount + 1 : count + 1} */}
        </span>
      </button>
    </div>
  );
};

export default PageInfo;
