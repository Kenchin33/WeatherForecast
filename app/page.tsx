"use client"
import React from "react";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import Humidity from "./Components/Humidity/Humidity";
import Mapbox from "./Components/Mapbox/Mapbox";
import Navbar from "./Components/Navbar";
import Population from "./Components/Population/Population";
import Sunset from "./Components/Sunset/Sunset";
import Temperature from "./Components/Temperature/Temperature";
import Visibility from "./Components/Visibility/Visibility";
import Wind from "./Components/Wind/Wind";
import { useGlobalContextUpdate } from "./contex/globalContext";
import defaultStates from "./utils/defaultStates";

export default function Home() {
  const {setActiveCityCoords} = useGlobalContextUpdate();
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);
  
  const handleCityClick = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="bg-[#f5ffff] dark:bg-[#09010f] min-h-screen">
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <Navbar></Navbar>
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature></Temperature>
          <FiveDayForecast></FiveDayForecast>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="instruments grid h-full gap-2 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <Sunset></Sunset>
            <Wind></Wind>
            <FeelsLike></FeelsLike>
            <Population></Population>
            <Humidity></Humidity>
            <Visibility></Visibility>
            <DailyForecast></DailyForecast>
          </div>
          <div className="mapbox-con mt-2 flex gap-4">
            <Mapbox></Mapbox>
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Найбільші міста
              </h2>
              <div className="flex flex-col gap-4">
                {
                  defaultStates.map((state, index) => {
                    return ( 
                      <div 
                        key={index} 
                        onMouseEnter={() => setHoveredIndex(index)}
                        onClick={() => handleCityClick(state.lat, state.lon)}
                        className={`border rounded-lg cursor-pointer dark:bg-dark shadow-sm dark:shadow-none border-light-mode-color dark:border-dark-mode-color hover:bg-accent`}>
                          <p className="px-6 py-4">{state.name}</p>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  );
}
