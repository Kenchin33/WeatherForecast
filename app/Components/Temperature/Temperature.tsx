"use client";
import { useGlobalContext } from '@/app/contex/globalContext';
import { clearSky, cloudy, drizzleIcon, navigation, rain, snow } from '@/app/utils/icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Temperature() {
  const { forecast } = useGlobalContext();
  const {main, timezone, name, weather} = forecast;

  if(!forecast || !weather) {
    return <div>Loading...</div>;
  } 

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);


  //State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");


  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch(weatherMain) {
        case "Drizzle":
            return drizzleIcon;
        case "Rain":
            return rain;
        case "Snow":
            return snow;
        case "Clear":
            return clearSky;
        case "Clouds":
            return cloudy;
        default:
            return clearSky;
    }
  }


  // Live time update
  useEffect(() => {
    // update time every second
    const interval = setInterval(() => {
        const localMoment = moment().utcOffset(timezone / 60);
        //set custom format 24 hour format
        const formatedTime = localMoment.format("HH:mm");
        // day of the week
        const day = localMoment.format("dddd");
        
        setLocalTime(formatedTime);
        setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <div className="pt-6 pb-5 px-4 border rounded-lg flex flex-col justify-between dark:bg-dark shadow-sm dark:shadow-none border-light-mode-color dark:border-dark-mode-color">
        <p className="flex justify-between items-center">
            <span className="font-medium">{currentDay}</span>
            <span className="font-medium">{localTime}</span>
        </p>
        <p className="pt-2 font-bold flex gap-1">
            <span>{name}</span>
            <span>{navigation}</span>
        </p>
        <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

        <div>
            <div>
                <span>{getIcon()}</span>
                <p className="pt-2 capitalize text-lg font-medium">{description}</p>
            </div>
            <p className="flex items-center gap-2">
                <span>Low: {minTemp}°C</span>
                <span>High: {maxTemp}°C</span>
            </p>
        </div>
    </div>
    );
}

export default Temperature;
