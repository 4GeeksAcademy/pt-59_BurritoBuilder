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
        // Fetch Ingredients when component mounts
        actions.getIngredients();
    }, []);

    useEffect(() => {
        // Set selected ingredients based on fetched ingredient names
        if (store.ingredients.length > 0) {
            const selectedIngredients = ingredients.map(ingredient => {
                return {
                    ...ingredient,
                    isSelected: store.ingredients.includes(ingredient.name)
                };
            });
            setBurgerIngredients(selectedIngredients);
            
        }
        
    }, [store.ingredients]);

    const ingredients = [
        { name: "Bun", imgSrc: topBunImg, price: 1.99 },
        { name: "Condiments", imgSrc: condimentsImg, price: 0.5 },
        { name: "Sauce", imgSrc: sauceImg, price: 0.75 },
        { name: "Patty", imgSrc: pattyImg, price: 2.5 },
        ,
    ];
    

    const handleIngredientSelect = async (ingredient) => {
        const ingredientExists = burgerIngredients.some(bi => bi.name === ingredient.name);
    
        try {
            if (ingredientExists) {
                // If the ingredient exists in local state, remove it
                await fetch(`${process.env.BACKEND_URL}/api/remove-ingredient/${ingredient.name}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                removeIngredientFromPreview(ingredient);
            } else {
                // Ingredient does not exist in local state, add it
                await fetch(`${process.env.BACKEND_URL}/api/add-ingredient`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name: ingredient.name, price: ingredient.price })
                });
                addIngredientToPreview(ingredient);
            }
        } catch (error) {
            console.log("Error handling ingredient selection:", error);
        }
    };

    const addIngredientToPreview = (ingredient) => {
        let updatedIngredients = [...burgerIngredients];
        if (ingredient.name === "Bun") {
            updatedIngredients.push({ name: "Bottom Bun", imgSrc: bottomBunImg, zIndex: 0 });
        }
        updatedIngredients.push({ ...ingredient, isSelected: true });
        setBurgerIngredients(updatedIngredients);

    };

    const removeIngredientFromPreview = (ingredient) => {
        let updatedIngredients = burgerIngredients.filter(item => item.name !== ingredient.name);
        setBurgerIngredients(updatedIngredients);
    };

    const handleProceedToCart = () => {
        // Step 3: Create a burger and navigate to the cart page
        // actions.createBurger({}, burgerIngredients);
        actions.createIngredientstoBurger({}, burgerIngredients)
        navigate("/shoppingcart"); // This link is for the cart page i designed
    };

    const zIndices = {
        [topBunImg]: 4,
        [condimentsImg]: 3,
        [sauceImg]: 2,
        [pattyImg]: 1,
        [bottomBunImg]: 0
    };


    
    // Sort the ingredients based on their fixed z-index
    const sortedIngredients = burgerIngredients.sort((a, b) => zIndices[b.imgSrc] - zIndices[a.imgSrc]); // Sort by z-index
    
   
    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                    <h2>Build Your Burger</h2>
                    <div className="burger-preview">
                        {sortedIngredients.map((ingredient, index) => (
                            <img key={index} src={ingredient.imgSrc} alt={ingredient.name} style={{ zIndex: zIndices[ingredient.imgSrc] }} />
                        ))}
                    </div>
                    <div className="ingredient-options">
                        <h3>Choose Your Ingredients</h3>
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-option" onClick={() => handleIngredientSelect(ingredient)}>
                                <img src={ingredient.imgSrc} alt={ingredient.name} />
                                <span>{ingredient.name}</span>
                            </div>
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










