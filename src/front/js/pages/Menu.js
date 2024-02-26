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
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
       

    }, []);

    

    const handleIngredientSelect = async (ingredient) => {
        // Implement your logic for handling ingredient selection here
    };

    const handleProceedToCart = () => {
        // Implement your logic for proceeding to cart here
    };

    // Define the z-indices for burger ingredients
    const zIndices = {
        [topBunImg]: 4,
        [condimentsImg]: 3,
        [sauceImg]: 2,
        [pattyImg]: 1,
        [bottomBunImg]: 0
    };

    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                    <h2>Build Your Burger</h2>
                    <div className="burger-preview">
                        {/* {sortedIngredients.map((ingredient, index) => (
                            <img key={index} src={ingredient.imgSrc} alt={ingredient.name} style={{ zIndex: zIndices[ingredient.imgSrc] }} />
                        ))} */}
                    </div>
                   
                    <div className="ingredient-options">
                        <h3>Choose Your Ingredients</h3>
                        {store.ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-option">
                             <img src={ingredient.image} alt={ingredient.name} />
                         <div>
                        <span>{ingredient.name}</span>
                        <span>{ingredient.price}</span>
                    </div> 
                </div>
            ))}
                        {/* {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-option" onClick={() => handleIngredientSelect(ingredient)}>
                                <img src={ingredient.imgSrc} alt={ingredient.name} />
                                <span>{ingredient.name} - ${ingredient.price.toFixed(2)}</span>
                            </div>
                        ))} */}
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleProceedToCart}>
                        Go to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};











