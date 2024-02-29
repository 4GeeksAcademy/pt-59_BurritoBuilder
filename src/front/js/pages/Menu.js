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

    // Define the z-indices for burger ingredients
    // const zIndices = {
    //     [topBunImg]: 4,
    //     [condimentsImg]: 3,
    //     [sauceImg]: 2,
    //     [pattyImg]: 1,
    //     [bottomBunImg]: 0
    // };

    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                <h2>Build Your Burger</h2>
                    <div>
                        {store.current_burger?.ingredients
                            ?.sort((ingredient) => ingredient.z_index ) // Sort ingredients based on zIndex
                            .map((ingredient, index) => (
                                <img key={index} src={ingredient.image} alt={ingredient.name} />
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











