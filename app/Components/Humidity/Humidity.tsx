"use client";
import { useGlobalContext } from '@/app/contex/globalContext';
import { droplets } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Humidity() {
  const {forecast} = useGlobalContext();

  if(!forecast || !forecast?.main || !forecast?.main?.humidity){
    return <Skeleton className="h-[12rem] w-full"></Skeleton>
  }

  const {humidity} = forecast?.main;
  
  const getHumidityText = (humidity: number) => {
    if(humidity < 30) return "Сухо: Може викликати подразнення шкіри";
    if(humidity >= 30 && humidity < 50) return "Комфортна: Ідеально для більшості людей";
    if(humidity >= 50 && humidity < 70) return "Помірна: Може збільшити алергенність"
    if(humidity >= 70) return "Висока: Некомфортно, ризик розвитку цвілі";
    return "Недоступно. Інформація про вологість недоступна";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark shadow-sm dark:shadow-none border-light-mode-color dark:border-dark-mode-color">
        <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
                {droplets} Вологість
            </h2>
            <p className="pt-4 text-2xl">{humidity}%</p>
        </div>
        <p className="text-sm">{getHumidityText(humidity)}.</p>
    </div>
  )
}

export default Humidity;
