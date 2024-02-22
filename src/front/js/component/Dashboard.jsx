import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleNewOrder = () => {
        alert("Create New Order clicked!");
    };

    const handleFavorites = () => {
        alert("Favorites clicked!");
    };

    const handleOrderHistory = () => {
        alert("Order History clicked!");
    };

    return (
        <div>
            <div className="header">
                <img src="user-icon.png" alt="User Icon" className="user-icon" />
                <span className="username">Username</span>
            </div>

            <div className="button-container">
                <button onClick={handleNewOrder}>Create New Order</button>
                <button onClick={handleFavorites}>Favorites</button>
                <button onClick={handleOrderHistory}>Order History</button>
            </div>
        </div>
    );
};

export default Dashboard;