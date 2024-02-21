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
            setBurgerIngredients(burgerIngredients.filter(img => img !== ingredientImg));
        } else {
            // If the ingredient is not selected, add it to the array
            setBurgerIngredients([...burgerIngredients, ingredientImg]);
        }
    };
    

    return (
        <div className="burger-container container mt-5">
            <h2>Build Your Burger</h2>
            <div className="burger-preview">
                {burgerIngredients.map((ingredientImg, index) => (
                    <img key={index} src={ingredientImg} alt={`Ingredient ${index + 1}`} style={{ bottom: `${index * 20}px` }} />
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
            {burgerIngredients.length === 4 && (
                <button className="btn btn-primary mt-3" onClick={() => navigate("/cart")}>
                    Go to Cart
                </button>
            )}
        </div>
    );
};



