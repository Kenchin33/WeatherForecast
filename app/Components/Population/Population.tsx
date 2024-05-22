"use client";
import { useGlobalContext } from '@/app/contex/globalContext';
import { people } from '@/app/utils/icons';
import { formatNumber } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Population() {
  const {fiveDayForecast} = useGlobalContext();
  const {city} = fiveDayForecast;

  if(!fiveDayForecast || !city){
    return <Skeleton className="h-[12rem] w-full"></Skeleton>
  }

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark shadow-sm dark:shadow-none border-light-mode-color dark:border-dark-mode-color">
        <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
                {people} Населення
            </h2>
            <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
        </div>
        <p className="text-sm">Останні дані ООН про населення у {city.name}.</p>
    </div>
  );
}

export default Population;
