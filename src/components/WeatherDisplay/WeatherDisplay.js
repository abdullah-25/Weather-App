import Image from "next/image";
import hot from "../../../public/hot.svg";
import windy from "../../../public/windy.svg";
import cold from "../../../public/cold.svg";

export default function WeatherDisplay({ day, temp }) {
  function getDayNameFromDate(dateString) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();

    if (dayIndex >= 0) {
      return daysOfWeek[dayIndex];
    } else {
      return "Invalid Date";
    }
  }

  function DisplayIcon(temp) {
    let icon;

    if (temp <= 12) {
      icon = cold;
    } else if (temp <= 15) {
      icon = windy;
    } else {
      icon = hot;
    }

    return icon;
  }

  return (
    <div className=" flex flex-col items-center px-4 py-1 mt-2  text-sm text-purple-600 font-semibold rounded-semi border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
      <Image
        src={DisplayIcon(temp)}
        alt={DisplayIcon(temp)}
        width={100}
        height={100}
      />
      <div> {temp}</div>

      <div> {getDayNameFromDate(day)}</div>
    </div>
  );
}
