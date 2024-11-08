"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ShoppingCartContext = createContext({});
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  // Load saved items from localStorage on initial render
  useEffect(() => {
    const storedItems = localStorage.getItem("wishList");
    if (storedItems) {
      setSavedItems(JSON.parse(storedItems));
    }
  }, []);

  function addSavedItem(id) {
    // Check if the item already exists in savedItems
    if (!savedItems.includes(id)) {
      const newSavedItems = [...savedItems, id];
      setSavedItems(newSavedItems);
      localStorage.setItem("wishList", JSON.stringify(newSavedItems));
    } else {
      alert(`Item is already in your wishlist.`);
    }
  }

  function removeSavedItem(id) {
    const updatedSavedItems = savedItems.filter((item) => item !== id);
    setSavedItems(updatedSavedItems);
    localStorage.setItem("wishList", JSON.stringify(updatedSavedItems));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        addSavedItem,
        removeSavedItem,
        savedItems,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
