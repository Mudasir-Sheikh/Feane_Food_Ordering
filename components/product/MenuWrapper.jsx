import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category.toLowerCase() ===
          categoryList[active].title.toLowerCase()
      )
    );
  }, [categoryList, active, productList]);

  return (
    <div className="container mx-auto mb-16 px-4 md:px-0">
      <div className="flex flex-col items-center w-full text-center mb-8">
        <Title addClass="text-[40px] text-gray-800 font-bold">Our Menu</Title>
        <div className="mt-6 flex flex-wrap justify-center">
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                className={`px-6 py-2 m-2 text-lg font-medium transition-colors duration-300 rounded-full shadow-md ${
                  index === active
                    ? "bg-secondary text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-secondary hover:text-white"
                }`}
                key={category._id}
                onClick={() => {
                  setActive(index);
                  setProductLimit(3);
                }}
              >
                {category.title}
              </button>
            ))}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filter.length > 0 &&
          filter
            .slice(0, productLimit)
            .map((product) => <MenuItem key={product._id} product={product} />)}
      </div>
      {filter.length > productLimit && (
        <div className="flex items-center justify-center my-8">
          <button
            className="btn-primary px-6 py-2 text-lg font-semibold rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => setProductLimit(productLimit + 3)}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuWrapper;
