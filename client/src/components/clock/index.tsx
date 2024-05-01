import { useEffect, useState } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const meridiem = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}:${minutes}:${seconds} ${meridiem}`;
  };

  return <div className="tabular-nums">{formatTime(currentTime)}</div>;
}
