"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import sunny from "../../public/sunny.svg";
import WeatherDisplay from "@/components/WeatherDisplay/WeatherDisplay";

export default function Home() {
  const [temp, setTemp] = useState("");
  const [DayAndTemp, setDayAndTemp] = useState({});
  const apikey =
    "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m&start_date=2023-05-31&end_date=2023-06-04&timezone=America%2FNew_York";

  function FiveDayHistoricalData(data, time) {
    // Create an array to store the 5 values
    const tempArray = [];
    const tempDays = [];
    const FinalData = {};

    for (let i = 0; i < 5; i++) {
      const index = i * 24;
      if (data[index]) {
        tempArray.push(data[index]);
      }
      if (time[index]) {
        tempDays.push(time[index]);
      }
    }
    for (let i = 0; i < tempDays.length; i++) {
      FinalData[tempDays[i]] = tempArray[i];
    }

    setDayAndTemp(FinalData);
  }

  function handleSaveCurrentTemperature({ temp }) {
    alert("Do you want to save the current temperature?");
    const data = {
      temperature: temp,
      user_id: 1,
    };
    axios
      .post("http://localhost:8080/current", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error adding Current Temp:", error);
      });
  }

  function handleSaveSnapshot({ DayAndTemp }) {
    alert("Do you want to save weekly weather?");
    const data = {
      temperature: DayAndTemp,
      user_id: 1,
    };
    axios
      .post("http://localhost:8080/historical", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error adding Current Temp:", error);
      });
  }

  useEffect(() => {
    axios
      .get(`${apikey}`)
      .then((res) => {
        setTemp(res.data.hourly.temperature_2m[119]);
        FiveDayHistoricalData(
          res.data.hourly.temperature_2m,
          res.data.hourly.time
        );
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
      <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 md:space-y-10">
        <div className="flex-shrink-0 ">
          <Image src={sunny} alt="Sunny" width={100} height={100} />
        </div>
        <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2">
          <div className="text-xl font-medium text-black">
            Current Temperature:
          </div>
          <div className="text-xl font-medium text-black">{temp}</div>
          <button
            className="px-4 py-1 text-sm text-black font-semibold rounded-full border border-black-200"
            onClick={() => handleSaveCurrentTemperature({ temp })}
          >
            Save
          </button>
        </div>

        <div className="flex  items-center ">
          <div className="flex  flex-wrap justify-center md:space-x-4">
            {Object.entries(DayAndTemp).map(([day, temperature]) => (
              <WeatherDisplay key={day} day={day} temp={temperature} />
            ))}
          </div>
        </div>

        <button
          className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          onClick={() => {
            handleSaveSnapshot({ DayAndTemp });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
