"use client"
import { useGlobalContext } from '@/app/contex/globalContext'
import { sunset, thermo } from '@/app/utils/icons';
import { unixToTime } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Sunset() {
  const {forecast} = useGlobalContext();

  if(!forecast || !forecast?.sys || !forecast?.sys?.sunset){
    return <Skeleton className="h-[12rem] w-full"></Skeleton>
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <div 
    className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 xl:col-span-2 border-light-mode-color dark:border-dark-mode-color"
    >
        <div className="top">
            <h2 className="flex items-center gap-2 font-medium"> {sunset}Захід Сонця</h2>
            <p className="pt-4 text-2xl">{sunsetTime}</p>
        </div>
        <p className="text-sm">Схід Сонця: {sunriseTime}</p>
    </div>
  )
}

export default Sunset;
