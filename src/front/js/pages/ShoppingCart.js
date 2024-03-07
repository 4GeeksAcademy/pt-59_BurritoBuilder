import React, { useContext, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ShoppingCart = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getBurgers(); // Assuming this is the function to fetch burgers from the API
    }, []);

    return (
        <div className="container mt-5">
            <h2>Shopping Cart</h2>
            
            
            <div className="row">
    {store.burgers.map((burger, index) => (
        <div key={index} className="col-md-3 mb-3">
            <div className="card">
                
                <div className="card-body"style={{
                 width: '250px', 
                 height: '250px', 
                 overflow: 'hidden', 
                 position: 'relative', 
                  
                 borderRadius: '0px 0px 10px 10px',
                 top:'-15px', 
                 zIndex: '10',
                 margin:'0', 
                 display:'flex',
                 }}>
                    <h5 className="card-title">Burger #{burger.id}</h5>
                    
                    <p className="card-text">Ingredients:</p>
                    <ul className="list-group list-group-flush">
                        {burger.ingredients.map((ingredient, i) => (
                            
                                <img
                                    key={i}
                                    src={ingredient.image}
                                    alt={ingredient.name}
                                    style={{
                                        width: '350px',
                                        height: '350px',
                                        marginRight: '5px',
                                        
                                        position: 'absolute',
                                        zIndex: ingredient.z_index,
                                        top: 0,
                                        left: 0
                                    }}
                                />
                               
                           
                        ))}
                        
                    </ul>
                    <p className="card-text">Price: {burger.price}</p>
                </div>
            </div>
        </div>
    ))}
</div>

            
            <button className="btn btn-primary" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
            </button>
            <Link to="/Menu" style={{ textDecoration: 'none' }}>
                <button>Go back to Menu</button>
            </Link>
        </div>
    );
};

