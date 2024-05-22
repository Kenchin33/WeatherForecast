"use client"
import { useGlobalContext } from '@/app/contex/globalContext';
import { eye } from '@/app/utils/icons';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

function Visibility() {
  const {forecast} = useGlobalContext();

  if(!forecast || !forecast?.visibility){
    return <Skeleton className="h-[12rem] w-full"></Skeleton>
  }
  
  const {visibility} = forecast;

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if(visibilityInKm > 10) return "Повністю чітка видимість";
    if(visibilityInKm > 5 && visibilityInKm <= 10) return "Добра видимість: легко орієнтуватись";
    if(visibilityInKm > 2 && visibilityInKm <=5) return "Середня видимість: можуть бути невеликі складності";
    if(visibilityInKm <=2 ) return "Обмежена видимість: будьте обережні"
    return "Недоступно: Інформація про видимість недоступна";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark shadow-sm dark:shadow-none border-light-mode-color dark:border-dark-mode-color">
        <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
                {eye} Видимість
            </h2>
            <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} км</p>
        </div>
        <p className="text-sm">{getVisibilityDescription(visibility)}.</p>
    </div>
  )
}

export default Visibility;
