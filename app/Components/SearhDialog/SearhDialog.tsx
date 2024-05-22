"use client";
import { searchIcon } from '@/app/utils/icons';
import { Command, CommandInput } from '@/components/ui/command';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import { useGlobalContext, useGlobalContextUpdate } from '@/app/contex/globalContext';
import { Input } from '@/components/ui/input';

function SearhDialog() {
  const {geoCodedList, inputValue, handleInput} = useGlobalContext();
  const {setActiveCityCoords} = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="search-btn">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline"
              className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100 ease-in-out duration-200 bg-[#f5ffff] dark:bg-[#09010f] border-light-mode-color dark:border-dark-mode-color">
                <p className="text-sm text-muted-foreground">Пошук...</p>
                  <div className="command bg-[#f5ffff] dark:bg-[#09010f] py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                    {searchIcon}
                  </div>
            </Button>
          </DialogTrigger>

          <DialogContent className="p-0">
            <Command className="rounded-lg border shadow-md bg-[#f5ffff] dark:bg-[#09010f] border-light-mode-color dark:border-dark-mode-color">
              <Input 
                value={inputValue}
                onChangeCapture={handleInput} 
                className="bg-[#f5ffff] dark:bg-[#09010f]"
                placeholder="Пошук...">
              </Input>
              <ul className="px-3 pb-2">
                <p className="p-2 text-sm text-muted-foreground">Пропозиції</p>
                {geoCodedList?.length === 0 || (!geoCodedList && <p>Немає результатів</p>)}
                {geoCodedList && geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    }, 
                    index: number,
                  ) => {
                    const {country, state, name} = item;
                    return ( 
                      <li 
                        key={index} 
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm rounded-sm cursor-default ${hoveredIndex === index ? "bg-accent" : ""}`}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}>
                          <p className="text">
                            {name}, {state && state + ","}, {country}
                          </p>
                      </li>
                    );
                  }
                )}
              </ul>
            </Command>
          </DialogContent>
        </Dialog>
    </div>
  );
}

export default SearhDialog;
