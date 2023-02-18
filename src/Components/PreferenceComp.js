import React from "react";
import { Oval } from "react-loader-spinner";

const PreferenceComp = (props) => {
  return (
    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 my-4 h-100 rounded ">
      <div className="d-flex justify-content-between">
        <h5>Select {props.name}</h5>
        {props.isLoading && (
          <Oval
            height={30}
            width={50}
            color="#4285F4"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4285F4"
            strokeWidth={10}
            strokeWidthSecondary={10}
          />
        )}
      </div>
      <div className="All Colors">
        <ul>
          {props.element.map((element) => (
            <div className="form-check" key={element}>
              <input
                className="form-check-input"
                type="checkbox"
                value={element}
                id={element}
                key={element}
                onChange={props.handleChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {element}
              </label>
              <span className="badge"></span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreferenceComp;
