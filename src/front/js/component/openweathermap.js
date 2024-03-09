// YourReactComponent.js
// YourReactComponent.js
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const OpenWeatherMap = () => {
    const { store, actions } = useContext(Context);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const data = await actions.fetchWeatherData(); // Call the action to fetch weather data
                setWeatherData(data);
            } catch (error) {
                // Handle error
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [actions]); // Ensure the useEffect runs whenever actions change // Empty dependency array means this effect runs only once after the initial render

    return (
        <div>
            <h4>Weather in</h4>
            {weatherData ? (
                
                <div >
                    <h3 style={{ display: 'flex' }}>
                        {weatherData.weather.map((weather) => (
                            <div
                                key={weather.id}
                                style={{
                                    marginRight: '10px',
                                    backgroundColor: '#3b85fb',
                                    padding: '5px',
                                    borderRadius: '50%'
                                }}
                            >
                                <img
                                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                                    alt={weather.description}
                                    style={{ border: '2px solid white', borderRadius: '50%' }}
                                />
                            </div>
                        ))}
                        <p>Hamburg, Germany</p>
                    </h3>
                    <div style={{ marginLeft: '20px' }}>
                        <p>Temperature: {weatherData.main.temp}°C</p>
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
    
    
    
};

export default OpenWeatherMap;