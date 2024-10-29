"use client";

import { createContext, useContext, useState } from "react";
import data from "/data.json";

const ShoppingCartContext = createContext({});

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  const cartQty = cartItems?.reduce((qty, item) => {
    item.qty + qty;
  }, 0);

  const totalVal = cartItems.reduce((total, cartItem) => {
    const item = data.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  function getItemsQty(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQty(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id == id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQty(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemsQty,
        increaseCartQty,
        decreaseCartQty,
        removeFromCart,
        cartItems,
        cartQty,
        totalVal,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
