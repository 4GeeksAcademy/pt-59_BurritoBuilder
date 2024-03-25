import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const OpenWeatherMap = () => {
    const { store, actions } = useContext(Context);
    const [weatherData, setWeatherData] = useState(null);
    const [hovered, setHovered] = useState(false);

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
        <div className="weatherAPIcontainer"
        
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: hovered ? 'translateX(100%)' : 'translateX(0)', transition: 'transform 0.5s ease' }}
    >
            <div className="cart-tab" style={{ position: 'absolute', top: '30px', left: '150px', zIndex: '1' }}>
                <img src="https://img.icons8.com/ios-filled/30/FFFFFF/sun.png" alt="Sun Icon" style={{ position: 'absolute', top: '25px',  }} />
            </div>

            <div className="cardContent" style={{ 
                width: '150px', 
                height: '150px', 
                border: '2px solid #3b85fb', 
                borderRadius: '10px', 
                
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                textAlign: 'center'  // Center the contents
                }}>
                
                {weatherData ? (
                    <div>
                        <div>Weather in</div>
                        <div>{weatherData.name}, {weatherData.sys.country}</div>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            border: '1px solid lightblue',  // Light blue border
                            padding: '0px',  // Add padding for spacing
                            borderRadius: '5px',  // Add border radius for rounded corners
                            marginBottom: '0px'  // Add margin at the bottom for spacing
                        }}>
                            {weatherData.weather.map((weather) => (
                                <div
                                    key={weather.id}
                                    style={{
                                        marginRight: '5px',
                                        backgroundColor: '#3b85fb',
                                        padding: '5px',
                                        borderRadius: '50%'
                                    }}
                                >
                                    <img
                                        src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                                        alt={weather.description}
                                        style={{ border: '2px solid lightblue', borderRadius: '50%', width: '30px', height: '30px' }}  // Light blue border around the image
                                    />
                                </div>
                            ))}
                            <div style={{ margin: '0', textTransform: 'capitalize' }}>{weatherData.weather[0].description}</div>
                        </div>
                        
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ margin: '0' }}>Temperature: {(weatherData.main.temp * 9/5 + 32).toFixed(2)}°F</div>
                        </div>
                        
                    </div>
                    
                ) : (
                    <p>Loading weather data...</p>
                )}
                
            </div>
        </div>  
    );
    
    
    
    
    
    
    
};

export default OpenWeatherMap;