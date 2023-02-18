import React from "react";
import Products from "./Products";

const PersonalPagePagination = (props) => {
  const { limit, items, count } = props;
  const total = items.length;
  const temp = [];
  for (let i = (count - 1) * limit; i < Math.min(total, count * limit); i++) {
    temp.push(items[i]);
  }
  //   console.log(temp);
  return (
    <div className="row">
      {temp.map((item, i) => (
        <Products item={item} key={i} />
      ))}
    </div>
  );
};

export default PersonalPagePagination;
