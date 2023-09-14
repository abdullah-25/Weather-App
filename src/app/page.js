"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import sunny from "../../public/sunny.svg";

export default function Home() {
  const [temp, setTemp] = useState("");
  const [FiveDayTemp, setFiveDayTemp] = useState(Array(5).fill(null));

  function FiveDayHistoricalData(data) {
    // Create an array to store the 5 values
    const tempArray = [];

    for (let i = 0; i < 5; i++) {
      // Calculate the index based on your logic
      const index = i * 24;
      if (data[index]) {
        tempArray.push(data[index]);
      }
    }

    // Set the entire array in one go
    setFiveDayTemp(tempArray);
  }
  console.log({ sunny });
  useEffect(() => {
    axios
      .get(
        "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&start_date=2023-05-31&end_date=2023-06-04&timezone=America%2FNew_York"
      )
      .then((res) => {
        console.log(res.data);
        setTemp(res.data.hourly.temperature_2m[119]);
        FiveDayHistoricalData(res.data.hourly.temperature_2m);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div className="p-6 max-w-sm bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
        <div className="flex-shrink-0">
          <Image src={sunny} alt="Sunny" width={100} height={100} />
        </div>
        <div className="flex space-x-2">
          {" "}
          <div className="text-xl font-medium text-black">
            Current Temperature:
          </div>
          <div className="text-xl font-medium text-black">{temp}</div>
        </div>

        <div className="flex flex-col items-center ">
          <div className="flex space-x-4">
            {FiveDayTemp.map((temp, i) => (
              <div className="text-gray-500" id={i} key={i}>
                {temp}
              </div>
            ))}
          </div>
        </div>

        <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Save
        </button>
      </div>
    </div>
  );
}
