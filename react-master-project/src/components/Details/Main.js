import React, { useState, useEffect } from "react";
import Cart from "./Cart/Cart";
import Product from "./Product/Product";
import User from "./Users/Users";

const Main = ({ selectedMenu }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/${selectedMenu}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMenu]);

  return (
    <div className="ml-1/4 p-4 w-4/5">
      {selectedMenu === "carts" && <Cart cartData={data} />}
      {selectedMenu === "products" && <Product productData={data} />}
      {selectedMenu === "users" && <User userData={data} />}
    </div>
  );
};

export default Main;
