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

    const handledeleteBurgerID =(burger_id)=> {
        // Call your deleteBurgerID action here with burgerId as an argument
        actions.deleteBurgerID(burger_id);
    };
    
    return (
        <div className="container mt-5">
            <h2>Shopping Cart</h2>
            
            <div className="row">
                {store.burgers.map((burger, index) => (
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
                                <ul className="list-group list-group-flush">
                                    {burger.ingredients.map((ingredient, index) => (
                                        <li key={index} className="list-group-item">
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
                                                marginRight: '5px',
                                                position: 'absolute',
                                                zIndex: ingredient.z_index,
                                                top: 0,
                                                left: 0
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
                 
            <CheckoutButton burgers={store.burgers} totalAmount={store.totalAmount} /> 
                 {/* <link to="/burgercheckout">
                    <CheckoutButton  />
                </link> */}
            
            <Link to="/menu" style={{ textDecoration: 'none' }}>
                <button>Go back to Menu</button>
            </Link>
        </div>
    );
};

