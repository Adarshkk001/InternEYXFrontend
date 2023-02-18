import React from "react";

const PaginationFooter = (props) => {
  return (
    <div className="d-flex justify-content-between my-5">
      <button
        disabled={
          props.prevBoundry ? true : false
          // (query && !searchCount) || (!query && !count) ? true : false
        }
        onClick={props.handlePreviousClick}
        className="btn btn-primary"
      >
        &larr; Previous
      </button>
      <button
        disabled={
          props.nextBoundry ? true : false
          // (!query && count >= items.total / limit - 1) || (query && searchCount >= items.total / limit - 1)
          //   ? true
          //   : false
        }
        onClick={props.handleNextClick}
        className="btn btn-primary"
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default PaginationFooter;
