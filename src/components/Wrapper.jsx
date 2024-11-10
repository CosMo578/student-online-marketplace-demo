"use client";
import Header from "./Header";
import ProductsListing from "./ProductsListing";

import { db } from "@/app/config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useShoppingCart } from "@/app/Context/ShoppingCartContext";

const Wrapper = () => {
  const [products, setProducts] = useState([]);
  const { addSavedItem } = useShoppingCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const ref = collection(db, "products");
      const data = await getDocs(ref);
      const fildata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(fildata);
    };

    fetchProducts();
  }, []);

  const [value, setValue] = useState("");
  const [select, setSelect] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products
      ?.filter((item) => {
        return value.toLowerCase() === ""
          ? "value is empty"
          : item.name.toLowerCase().includes(value.toLowerCase().trim());
      })
      ?.filter((sth) => {
        if (select === "all") {
          return true;
        } else {
          return sth.category.toLowerCase() === select.toLowerCase();
        }
      });
    setFilteredProducts(filtered);
  }, [select, value, products]);

  return (
    <>
      <Header
        value={value}
        setValue={setValue}
        select={select}
        setSelect={setSelect}
      />
      <ProductsListing
        filteredProducts={filteredProducts}
        addSavedItem={addSavedItem}
      />
    </>
  );
};
export default Wrapper;
