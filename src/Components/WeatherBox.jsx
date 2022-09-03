import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios'
import { FadeLoader } from 'react-spinners';

const WeatherBox = () => {

    const [weather, setWeather] = useState({})
    const [isCelsius, setIsCelsius] = useState(true)
    const [loading, setLoading] = useState(false)

    function changeTemperature(){
        setIsCelsius(!isCelsius)
    }
    useEffect(() =>{
        setLoading(true)
        document.body.style.background = "#fff"

        navigator.geolocation.getCurrentPosition(success)
        function success(pos){
            const crd = pos.coords
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=fc19f3be67f6872bb9e0c25c0e55d33e`)
            .then(res => setWeather(res.data) )
            setLoading(false)
            document.body.style.background = "url(https://images.unsplash.com/23/pink-sky.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80)"
            document.body.style.backgroundRepeat = "no-repeat"
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundSize = "cover"
        }
        
    }, [])
    const weatherIcon = weather.weather?.[0].icon
    return (
        <div className = "App">
            { loading ?
            <FadeLoader 
            color={"#8CDFD6"}
            />
            :
        <div className="WeatherBox">
            <h1 className="Title">Weather App</h1>
            <h2 className="City">{weather.sys?.country}, {weather?.name}</h2>
            <div className="Wrapper">
            <div className="leftPanel">
                <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="WeatherIcon" className="WeatherIcon" />
                <h3 className="Temperature">{isCelsius ? Math.round(weather.main?.temp - 273.15) : Math.round(((weather.main?.temp - 273.15) * 9)/5 + 32)}{isCelsius ? "°C" : "°F"}</h3>
                <button className="ChangeTemp" onClick={changeTemperature}>Change to {isCelsius ? "°C" : "°F"}</button>
            </div>
            <div className="rightPanel">
                <ul>
                    <li className = "dato">{weather.weather?.[0].description}</li>
                    <li className = "dato"><span>Pressure:</span> {weather.main?.pressure}</li>
                    <li className = "dato"><span>Humidity:</span> {weather.main?.humidity}</li>
                    <li className = "dato"><span>Feels Like:</span> {isCelsius ? Math.round(weather.main?.feels_like - 273.15) : Math.round(((weather.main?.feels_like - 273.15) * 9)/5 + 32)}{isCelsius ? "°C" : "°F"} </li>
                </ul>
            </div>
            </div>
            </div>
        }
        </div>
    );
};

export default WeatherBox;