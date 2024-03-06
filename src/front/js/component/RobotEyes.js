import React, { useState, useEffect } from 'react';
import "../../styles/home.css";

const RobotEyes = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="robo-eyes">
            {/* Right Eye */}
            <div className="eye">
                <div className="blue-square">
                    <div className="white-square" style={{ 
                        transform: `translate(-50%, -50%)`, 
                        left: '50%', 
                        top: '65%', 
                        borderRadius: '8px', 
                        position: 'absolute' 
                        }}><div className="eye-center" style={{ 
                                width: '10px', 
                                height: '10px', 
                                backgroundColor: 'black', 
                                borderRadius: '50%', 
                                position: 'absolute', 
                                 left: `calc(${mousePosition.x / window.innerWidth * 95}% - 3px)`, // Calculate the position of the eye center
                            top: `calc(${mousePosition.y / window.innerHeight * 95}% + 8px)` // Calculate the position of the eye center 
                                }}></div>
                    </div>
                </div>
            </div>

            {/* Left Eye */}
            <div className="eye">
                <div className="blue-square">
                    <div className="white-square" style={{ 
                        transform: `translate(-50%, -50%)`, 
                        left: '50%', 
                        top: '65%', 
                        borderRadius: '8px', 
                        position: 'absolute',
                         
                        }}>
                            <div className="eye-center" style={{ 
                                width: '10px', 
                                height: '10px', 
                                backgroundColor: 'black', 
                                borderRadius: '50%', 
                                position: 'absolute', 
                                left: `calc(${mousePosition.x / window.innerWidth * 95}% - 7px)`, // Calculate the position of the eye center
                                top: `calc(${mousePosition.y / window.innerHeight * 95}% + 8px)` // Calculate the position of the eye center 
                                }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RobotEyes;

