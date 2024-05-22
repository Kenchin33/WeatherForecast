"use client";
import { useGlobalContext } from '@/app/contex/globalContext';
import { thermometer } from '@/app/utils/icons';
import { kelvinToCelsius } from '@/app/utils/misc';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if(!forecast || !forecast?.main || !forecast?.main?.feels_like){
    return <Skeleton className="h-[12rem] w-full"></Skeleton>
  }

  const {feels_like, temp_min, temp_max} = forecast?.main;

  const feelsLikeText = (feelsLike: number, minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2;
    if(feelsLike < avgTemp - 5){
        return "На відчуття значно холодніше, ніж фактична температура.";
    }
    if(feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5){
        return "На відчуття майже як фактична температура.";
    }
    if(feelsLike > avgTemp + 5){
        return "На відчуття значно жаркіше, ніж фактична температура.";
    }

    return "Температурне відчуття характерне для цього діапазону.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark shadow-sm dark:shadow-none border-light-mode-color dark:border-dark-mode-color">
        <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
                {thermometer} Відчуття як
            </h2>
            <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°C</p>
        </div>
        <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
