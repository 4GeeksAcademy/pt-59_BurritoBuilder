// Menu.js

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import topBunImg from "../../img/top_bun.png";
import bottomBunImg from "../../img/bottom_bun.png";
import pattyImg from "../../img/patty.png";
import sauceImg from "../../img/sauce.png";
import condimentsImg from "../../img/condiments.png";

export const Menu = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burgerIngredients, setBurgerIngredients] = useState([]);

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(authenticate, 500);
    }, []);

    const handleIngredientSelect = (ingredientImg) => {
        // Check if the ingredient is already in the burgerIngredients array
        const isIngredientSelected = burgerIngredients.includes(ingredientImg);
        
        // If the ingredient is selected, remove it from the array
        if (isIngredientSelected) {
            // If the selected ingredient is the top bun, remove both top and bottom buns
            if (ingredientImg === topBunImg) {
                setBurgerIngredients(burgerIngredients.filter(img => img !== topBunImg && img !== bottomBunImg));
            } else {
                // If other ingredients are selected, remove only the selected ingredient
                setBurgerIngredients(burgerIngredients.filter(img => img !== ingredientImg));
            }
        } else {
            // If the ingredient is not selected
            let updatedIngredients = [];
            
            if (ingredientImg === topBunImg) {
                // If the top bun is selected, add both top and bottom bun images
                updatedIngredients = [bottomBunImg, ...burgerIngredients, topBunImg];
            } else {
                // If other ingredients are selected, add them directly to the array
                updatedIngredients = [...burgerIngredients, ingredientImg];
            }
            
            setBurgerIngredients(updatedIngredients);
        }
    };

    const zIndices = {
        [topBunImg]: 4,
        [condimentsImg]: 3,
        [sauceImg]: 2,
        [pattyImg]: 1,
        [bottomBunImg]: 0
    };

    // Sort the ingredients based on their fixed z-index
    const sortedIngredients = burgerIngredients.sort((a, b) => zIndices[b] - zIndices[a]);

    const hasBun = burgerIngredients.includes(topBunImg) && burgerIngredients.includes(bottomBunImg);
    const hasCondiment = burgerIngredients.includes(condimentsImg);
    const hasSauce = burgerIngredients.includes(sauceImg);
    const hasProtein = burgerIngredients.includes(pattyImg);

    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                    <h2>Build Your Burger</h2>
                    <div className="burger-preview">
                        {sortedIngredients.map((ingredientImg, index) => (
                            <img key={index} src={ingredientImg} alt={`Ingredient ${index + 1}`} style={{ zIndex: zIndices[ingredientImg] }} />
                        ))}
                    </div>
                    <div className="ingredient-options">
                        <h3>Choose Your Ingredients</h3>
                        <div className="ingredient-option" onClick={() => handleIngredientSelect(topBunImg)}>
                            <img src={topBunImg} alt="Top Bun" />
                            <span>Top Bun</span>
                        </div>
                        <div className="ingredient-option" onClick={() => handleIngredientSelect(condimentsImg)}>
                            <img src={condimentsImg} alt="Condiments" />
                            <span>Condiments</span>
                        </div>
                        <div className="ingredient-option" onClick={() => handleIngredientSelect(sauceImg)}>
                            <img src={sauceImg} alt="Sauce" />
                            <span>Sauce</span>
                        </div>
                        <div className="ingredient-option" onClick={() => handleIngredientSelect(pattyImg)}>
                            <img src={pattyImg} alt="Patty" />
                            <span>Patty</span>
                        </div>
                    </div>
                    {hasBun && hasCondiment && hasSauce && hasProtein && (
                        <button className="btn btn-primary mt-3" onClick={() => {
                            actions.create_order({}, burgerIngredients);
                            navigate("/ShoppingApp");
                        }}>
                            Go to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};






