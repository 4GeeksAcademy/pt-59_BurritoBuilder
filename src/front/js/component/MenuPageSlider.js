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
                <Link to="/private" className="nav-link">
                    <div className="Profile">
                        <img src="https://img.icons8.com/fluency/48/AAAAAA/gender-neutral-user.png" alt="Profile" style={{ width: '40px', height: '40px'}}/>
                    </div>
                </Link>
                {/* Shopping Cart Link */}
                <Link to="/shoppingcart" className="nav-link">
                    <div className="ShoppingCart"> 
                        <img src="https://img.icons8.com/fluency/48/AAAAAA/shopping-cart.png" alt="Cart" style={{ width: '40px', height: '40px'}}/>
                    </div>
                </Link>
                {/* Favorites Link */}
                {/* <Link to="/favorites" className="nav-link">
                    <div className="Favorites">
                        <img src="https://img.icons8.com/fluency/48/AAAAAA/like.png" alt="Favorites" style={{ width: '40px', height: '40px'}} />
                    </div>
                </Link> */}
            <button className="blueMenuButton">
                <img src="https://img.icons8.com/material-outlined/24/FFFFFF/menu.png"  alt="Menu" style={{ width: '22px', height: '24px', position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%, -50%)' }} />
            </button>
        </div>
    );
};

export default MenuPageSlider;
