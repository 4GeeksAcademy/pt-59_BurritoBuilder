import React, { useContext, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import CheckoutButton from "../component/CheckOutButton";

export const ShoppingCart = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getBurgers(); // Assuming this is the function to fetch burgers from the API
    }, []);

    // const totalAmount = burgers.reduce((total, burger) => total + (burger.price * burger.quantity), 0);

    const handledeleteBurgerID = async (burger_id) => {
        // Call deleteBurgerID action here with burgerId as an argument
        await actions.deleteBurgerID(burger_id);
    
        // Fetch updated list of burgers after deletion
        actions.getBurgers();
    };
    
    return (
        <div className="container mt-3">
            <div className="red-check-pattern"></div> {/* Red checkered pattern div above Shopping Cart text */}
            <h2>Shopping Cart</h2>
            <div className="row">
                {store.checkoutBurger?.map((burger, index) => (
                    <div key={index} className="col-md-3 mb-3">
                        <div className="card">
                            <div className="card-header" style={{ display: 'flex', position: 'relative' }}>
                                <h5 className="card-title">Burger #{burger.id}</h5>
                                <img
                                    src="https://img.icons8.com/material-outlined/24/3b85fb/trash--v1.png"
                                    alt="Delete"
                                    onClick={() => handledeleteBurgerID(burger.id)}
                                    style={{ width: '24px', height: '24px', cursor: 'pointer', right: '0px', position: 'absolute' }}
                                />
                            </div>
                            <div className="card-body" style={{ width: '250px', height: '250px', overflow: 'hidden', position: 'relative', borderRadius: '0px 0px 10px 10px', top: '-15px', zIndex: '10', margin: '0', display: 'flex' }}>
                                    
                                    <p className="card-text">Ingredients:</p>
                                    <ul className="list-group list-group-flush" style={{ postion:'absolute', margin:"0"}}>
                                        {burger.ingredients.map((ingredient, index) => (
                                            <li key={index} className="list-group-item" style={{ fontSize: 'smaller' }}>
                                                {ingredient.name} - ${ingredient.price}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                <ul className="list-group list-group-flush">
                                    {burger.ingredients.map((ingredient, i) => (
                                        <img
                                            key={i}
                                            src={ingredient.image}
                                            alt={ingredient.name}
                                            style={{
                                                width: '300px',
                                                height: '300px',
                                                marginRight: 'px',
                                                position: 'absolute',
                                                zIndex: ingredient.z_index,
                                                top: 0,
                                                right: 0
                                            }}
                                        />
                                    ))}
                                </ul>
                            </div>
                            <p className="card-text">Price: {burger.total_price}</p>
                        </div>
                    </div>
                ))}
            </div>
                 
            <CheckoutButton burgers={store.burgers} totalAmount={store.totalAmount}  /> 
            <Link to="/menu" style={{ textDecoration: 'none',   }}>
                <button style={{ backgroundColor: '#3b85fb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginLeft:'10px',marginBottom:'10px' }}>Go back to Menu</button>
            </Link>
            <div className="red-check-pattern"></div> {/* Red checkered pattern div above footer component */}
        </div>
    );
};


