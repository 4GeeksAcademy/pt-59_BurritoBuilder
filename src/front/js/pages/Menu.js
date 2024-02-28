import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import IngredientComponent from "../component/IngredientComponent";



export const Menu = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burgerIngredients, setBurgerIngredients] = useState([]);
    const [burgerId, setBurgerId] = useState(null);

    useEffect(() => {
       
        // actions.getBurger();
   
    }, []);
    
    const handleIngredientClick = (burger_id, ingredient) => {
        // Call the action to add the ingredient to the burger
        actions.addIngredientToBurger(burger_id, ingredient);
    };
    
    

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
                    <div className="burger-preview">
                        {/* Render burger ingredients based on the selected ingredients */}
                        {burgerIngredients.map((ingredientId, index) => {
                            const ingredient = store.ingredients.find(item => item.id === ingredientId);
                            return ingredient ? (
                                <img key={index} src={ingredient.image} alt={ingredient.name} style={{ zIndex: zIndices[ingredient.image] }} />
                            ) : null;
                        })}
                    </div>
                   
                    <div className="ingredient-options">
                        <h3>Choose Your Ingredients</h3>
                        {/* Render ingredient options */}
                        {store.ingredients.map((ingredient, index) => (
                            console.log(ingredient),
                            <IngredientComponent  
                            key={index}
                            ingredient={ingredient}
                            onIngredientClick={() => handleIngredientClick()}
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











