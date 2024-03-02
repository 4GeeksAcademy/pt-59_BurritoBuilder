import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const MenuPageSlider = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="whiteLeftSlide" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="greySquare"></div>
            <div className="Profile">
                <img src="https://img.icons8.com/fluency/48/AAAAAA/gender-neutral-user.png" alt="Profile" style={{ width: '29px', height: '29px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />   
            </div>
            <div className="ShoppingCart"> 
                <img src="https://img.icons8.com/fluency/48/AAAAAA/shopping-cart.png" alt="Cart" style={{ width: '29px', height: '29px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
            <div className="Favorites">
                <img src="https://img.icons8.com/fluency/48/AAAAAA/like.png" alt="Favorites" style={{ width: '29px', height: '29px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
            <button className="blueMenuButton">
                <img src="https://img.icons8.com/material-outlined/24/FFFFFF/menu.png"  alt="Menu" style={{ width: '22px', height: '24px', position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%, -50%)' }} />
            </button>
        </div>
    );
};

export default MenuPageSlider;
