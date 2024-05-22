"use client"
import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { duration } from 'moment';
import { useGlobalContext } from '@/app/contex/globalContext';


function FlyToActiveCity({activeCityCords}){
    const map = useMap();

    useEffect(() => {
        if(activeCityCords){
            const zoomLev = 13;
            const flyToOptions = {
                duration: 1.5,
            };

            map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLev, flyToOptions);
        }
    }, [activeCityCords, map]);

    return null;
}

function Mapbox() {
  const {forecast} = useGlobalContext();
  const activeCityCords = forecast?.coord;

  if(!forecast || !forecast.coord || !activeCityCords){
    return (
     <div>
        <h1>Loading...</h1>
     </div>
    );
  }

  console.log(forecast.coord);

  return (
   <div className="flex-1 basis-[50%] border col-span-3 rounded-lg border-light-mode-color dark:border-dark-mode-color">
    <MapContainer 
        center={[activeCityCords.lat, activeCityCords.lon]} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="rounded-lg m-4"
        style={{height: "calc(100% - 2rem)", width: "calc(100% - 2rem)"}}
    >
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'   
        ></TileLayer>
        <FlyToActiveCity activeCityCords={activeCityCords}></FlyToActiveCity>
    </MapContainer>
  </div>
  );
}

export default Mapbox;
