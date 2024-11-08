"use client";
import { useEffect, useState } from "react";
import data from "/data.json";
import Header from "./Header";
import ProductsListing from "./ProductsListing";

const Wrapper = ({ children }) => {
  const products = data;

  const [value, setValue] = useState("");
  const [select, setSelect] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products
      ?.filter((item) => {
        return value.toLowerCase() === ""
          ? "value is empty"
          : item.title.toLowerCase().includes(value.toLowerCase().trim());
      })
      ?.filter((sth) => {
        if (select === "all") {
          return true;
        } else {
          return sth.category.name.toLowerCase() === select.toLowerCase();
        }
      });
    setFilteredProducts(filtered);
  }, [select, value, products]);

  //   useEffect(() => {
  //     const filtered = products
  //       ?.filter((item) => {
  //         return value.toLowerCase() === ""
  //           ? "Not Found"
  //           : item.name.toLowerCase().includes(value.toLowerCase().trim());
  //       })
  //       .filter((product) => {
  //         if (select === "All") {
  //           return true;
  //         } else {
  //           return product.category.name.toLowerCase() === select.toLowerCase();
  //         }
  //       });

  //     setFilteredProducts(filtered);
  //   }, [select, value, products]);

  return (
    <>
      <Header
        value={value}
        setValue={setValue}
        select={select}
        setSelect={setSelect}
      />
      <ProductsListing filteredProducts={filteredProducts} />
    </>
  );
};
export default Wrapper;
