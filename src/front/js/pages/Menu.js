import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import IngredientComponent from "../component/IngredientComponent";



export const Menu = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burgerIngredients, setBurgerIngredients] = useState([]);
    const [burger_id, setBurgerId] = useState(null);

    useEffect(() => {
        actions.getBurgers(burger_id);
        actions.fetchBurgerIngredients();
        // actions.createBurger();
    }, []);
    
    const handleIngredientClick = (burger, ingredient) => {
        // Call the action to add the ingredient to the burger
        actions.addIngredientToBurger(burger.id, ingredient.id);
    };;
    
    

    const handleProceedToCart = () => {
        // Navigate to the cart page
        navigate("/cart");
    };

    // const zIndices = {
    //     [topBunImg]: 4,
    //     [condimentsImg]: 3,
    //     [sauceImg]: 2,
    //     [pattyImg]: 1,
    //     //if the ingredients zindex is equal to 0 its at the
    //     [ingredient.z_index]: 0
    // };

    // // Sort the ingredients based on their fixed z-index
    // const sortedIngredients = burgerIngredients.sort((a, b) => zIndices[b.imgSrc] - zIndices[a.imgSrc]);

    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                    <h2>Build Your Burger</h2>
                    {/* Burger Previewer Div */}
                    <div className="burger-previewer" style={{ width: '250px', height: '250px', overflow: 'hidden', position: 'relative' }}>
                        {store.current_burger?.ingredients && Array.isArray(store.current_burger.ingredients) && store.current_burger.ingredients.map((ingredient, index) => (
                            <img 
                                key={index} 
                                src={ingredient.image} 
                                alt={ingredient.name} 
                                style={{ 
                                    zIndex: ingredient.z_index, 
                                    position: 'absolute', 
                                    width: '100%', 
                                    height: '100%', 
                                    top: 0, 
                                    left: 0 
                                }}
                            />
                        ))}
                    </div>
    
                    <div className="ingredient-options">
                        <h3>Choose Your Ingredients</h3>
                        {/* Render ingredient options */}
                        {store.ingredients.map((ingredient, index) => (
                            <IngredientComponent  
                                key={index}
                                ingredient={ingredient}
                                onIngredientClick={() => handleIngredientClick(store.current_burger, ingredient)} // Pass burger_id and ingredient to the handler
                            />
                        ))}
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleProceedToCart}>
                        Go to Cart
                    </button>
                </div>
            </div>
        </div>
    );
    
};











