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
        { name: "Patty", imgSrc: pattyImg, price: 2.5 }
    ];

    const handleIngredientSelect = async (ingredient) => {
        try {
            // Check if the ingredient is stored in the backend
            const response = await fetch(process.env.BACKEND_URL + `/api/ingredients/${ingredient.name}`);
            if (response.ok) {
                // If the ingredient exists in the backend, remove it
                await actions.removeIngredientFromOrder({ name: ingredient.name });
                removeIngredientFromPreview(ingredient);
            } else {
                // If the ingredient does not exist in the backend, add it
                await actions.addIngredientToOrder({ name: ingredient.name, price: ingredient.price });
                addIngredientToPreview(ingredient);
            }
        } catch (error) {
            console.log("Error handling ingredient selection:", error);
        }
    };

    const addIngredientToPreview = (ingredient) => {
        let updatedIngredients = [...burgerIngredients];
        updatedIngredients.push({ ...ingredient, isSelected: true });
        setBurgerIngredients(updatedIngredients);
    };

    const removeIngredientFromPreview = (ingredient) => {
        let updatedIngredients = burgerIngredients.filter(item => item.name !== ingredient.name);
        setBurgerIngredients(updatedIngredients);
    };

    const handleProceedToCart = () => {
        // Step 3: Create Order and navigate to the cart page
        actions.createOrder({}, burgerIngredients);
        navigate("/shoppingcart"); // Assuming you have a route for the cart page
    };

    const zIndices = {
        [topBunImg]: 4,
        [condimentsImg]: 3,
        [sauceImg]: 2,
        [pattyImg]: 1,
        [bottomBunImg]: 0
    };

    // Sort the ingredients based on their fixed z-index
    const sortedIngredients = burgerIngredients.sort((a, b) => zIndices[b.imgSrc] - zIndices[a.imgSrc]);

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










