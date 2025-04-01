"use client";
import { useCallback, useEffect, useState } from "react";

const DigitalClock = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [clockType12, setClockType12] = useState(true);

  const formatDatePart = useCallback(
    (part: number) => (part < 10 ? `0${part}` : `${part}`),
    []
  );

  const formatHour = useCallback(
    (hour: number) => {
      if (!clockType12) return hour;
      if (hour === 0) return 12;
      return hour > 12 ? hour - 12 : hour;
    },
    [clockType12]
  );

  const handleOnClick = () => {
    setClockType12(!clockType12);
  };

  useEffect(() => {
    const updateClock = () => {
      const currentTime = new Date();
      setHours(formatDatePart(formatHour(currentTime.getHours())));
      setMinutes(formatDatePart(currentTime.getMinutes()));
      setSeconds(formatDatePart(currentTime.getSeconds()));
    };

    const intervalId = setInterval(() => updateClock(), 1000);

    updateClock();

    return () => {
      clearInterval(intervalId);
    };
  }, [formatDatePart, formatHour]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-200 bg-base-200">
      <div className="text-1xl">Show 24 hour clock </div>
      <div>
        <input
          onClick={handleOnClick}
          type="checkbox"
          className="w-9 h-6 accent-blue-500 "
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 text-3xl">
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
};

export default DigitalClock;
