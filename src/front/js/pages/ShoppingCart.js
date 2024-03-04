import React, { useContext, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ShoppingCart = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        //this is where the info from the request for recieving burger .
    }, []);

    return (
        <div className="container mt-5">
            <h2>Shopping Cart</h2>
            <ul>
                {store.ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.name} - Quantity: {ingredient.quantity}
                    </li>
                ))}
            </ul>
            <button className="btn btn-primary" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
            </button>
            <Link to="/Menu" style={{ textDecoration: 'none' }}>
            <button>Go back to Menu</button>
        </Link>
        </div>
    );
};