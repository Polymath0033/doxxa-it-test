"use client";
import { useState, useEffect } from "react";
export const TestPage = () => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  console.log(env);
  const api =
    "https://inventory.free.beeceptor.com/api/inventory/8dc925a077cf26e67a51";
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch(api);

    const data_ = await response.json();
    if (!response.ok) {
      throw new Error(data_.message || "Failed to fetch data");
    }
    setData(data_);
    console.log(data_);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //   const sendData = async () => {
  //     const response = await fetch(api, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         category: "bread",
  //         description: "just anything ",
  //         name: "clover",
  //         price: 500,
  //         quantity: 300,
  //       }),
  //     });
  //     const data_ = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data_.message || "Failed to fetch data");
  //     }
  //     console.log(data_);
  //   };
  //   useEffect(() => {
  //     sendData();
  //   }, []);
  return (
    <div>
      Test page
      {data?.length}
    </div>
  );
};
