"use Client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import defaultStates from "../utils/defaultStates";
import {debounce} from "lodash";


const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ( {children} ) => {
    const [forecast, setForecast] = useState({});
    const [geoCodedList, setGeoGodedList] = useState(defaultStates);
    const [inputValue, setInputValue] = useState("");
    const [activeCityCoords, setActiveCityCoords] = useState([
        49.8383, 24.0232,
    ]);

    const [airQuality, setAirQuality] = useState({});

    const [fiveDayForecast, setFiveDayForecast] = useState({});


    const fetchForecast = async (lat, lon) => {
        try{
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            setForecast(res.data);
        } catch (error){
            console.log("Error fetching forecast data: ", error.message);
        }
    };

    
    //Air Quality
    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`)
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetching air pollution data: ", error.message);
        }
    };


    //Five day forecast
    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast data: ", error.message);
        }
    };


    //geocoded list
    const fetchGeoCodedList = async (search) => {
        try {
            const res = await axios.get(`/api/geocoded?search=${search}`);

            setGeoGodedList(res.data);
        } catch (error) {
            console.log("Error fetching geocoded list: ", error.message);
        }
    }


    //handle input
    const handleInput =(e) => {
        setInputValue(e.target.value);
        
        if(e.target.value === ""){
            setGeoGodedList(defaultStates);
        }
    };


    //debounce function
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search);
        }, 500);

        if(inputValue){
            debouncedFetch(inputValue);
        }

        //cleanup
        return () => debouncedFetch.cancel();
    }, [inputValue]);



    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords]);

    return (
        <GlobalContext.Provider 
        value={{
            forecast,
            airQuality,
            fiveDayForecast,
            geoCodedList,
            inputValue,
            handleInput,
            setActiveCityCoords,
        }}
        >
            <GlobalContextUpdate.Provider value={{
                setActiveCityCoords,
            }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);