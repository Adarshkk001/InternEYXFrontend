import React from "react";
import { Link } from "react-router-dom";

const Products = (props) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
      <div className="card">
        <img
          className="card-img-top"
          src={props.item.images[0]}
          // src="..."
          alt="Card cap"
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{props.item.title}</h5>
          <p className="card-text">{props.item.description}</p>
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-primary mb-0">
              {`₹ ${props.item.price}`}
            </Link>
            <div>
              <i>
                <b>
                  {props.item.brand.length > 15
                    ? `${props.item.brand.slice(0, 20)}...`
                    : props.item.brand}
                </b>
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
