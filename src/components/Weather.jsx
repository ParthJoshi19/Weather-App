import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [weaBG, setBG] = useState("https://media.istockphoto.com/id/947314334/photo/blue-sky-with-bright-sun.jpg?s=612x612&w=0&k=20&c=XUlLAWDXBLYdTGIl6g_qHQ9IBBw4fBvkVuvL2dmVXQw=')");

    const imge = {
        backgroundImage: weaBG,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    const upDateBG = (condi) => {
        let bg = '';
        switch (condi.toLowerCase()) {
            case 'clear':
                bg = "url('/src/components/BackGrounds/Clear.jpg')";
                break;
            case 'mist':
                bg = "url('/src/components/BackGrounds/Mist.jpg')";
                break;
            case 'rain':
            case 'drizzle':
                bg = "url('/src/components/BackGrounds/drizzle.jpg')";
                break;
            case 'clouds':
                bg = "url('/src/components/BackGrounds/Cloudy.jpg')";
                break;
            case 'snow':
                bg = "url('/src/components/BackGrounds/snow.jpg')";
                break;
            case 'thunderstorm':
                bg = "url('/src/components/BackGrounds/thunder.jpg')";
                break;
            default:
                bg = "url('/src/components/BackGrounds/bg.jpg')";
        }
        setBG(bg);
    };

    const apiKey = '5d71fe32e095ec5e207938cb0d03f11a';

    const fetchWeather = async () => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await axios.get(apiUrl);
            setWeatherData(response.data);
            upDateBG(response.data.weather[0].main);
            setError(null);
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    const [mode, setMode] = useState('hidden');
    const display = () => {
        setWeatherData(null);
        setError(null);
        setMode('');
    };

    document.body.style.overflow = 'hidden';

    return (
        <div className="min-h-screen flex justify-center items-center p-4" style={imge}>
            <div className="max-w-[100%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] bg-blue-100 bg-opacity-75 rounded-lg p-5">
                <h1 className="text-4xl sm:text-5xl font-bold my-3 text-white text-center">Get Your Weather</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        spellCheck="true"
                        className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] my-3 p-3 border-2 border-black rounded-lg bg-transparent text-white text-xl"
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="m-2 border-2 border-black rounded-lg p-3 text-md font-bold transition-transform duration-300 hover:scale-105 hover:bg-blue-500"
                        onClick={display}
                    >
                        Get Weather
                    </button>
                </form>
                {weatherData === null && error === null && (
                    <div className={`h-12 w-12 ${mode} rounded-full border-4 border-transparent border-t-black animate-spin`} id='spinner'></div>
                )}
                {weatherData && (
                    <div className="mt-5 p-5 bg-white bg-opacity-75 rounded-xl text-center">
                        <p className="my-4 font-bold text-black text-6xl">{weatherData.main.temp}°C</p>
                        <p className="font-bold text-black text-4xl">{weatherData.weather[0].description}</p>
                        <p className="font-bold text-black text-2xl">Pressure: {weatherData.main.pressure} hPa</p>
                    </div>
                )}
                {error && <p className="text-xl font-bold text-center text-red-500">No City Found OR Network Connection Error</p>}
            </div>
        </div>
    );
};

export default Weather;
