import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
                    <div style={{ display: 'flex' }}>
                    {/* Burger Previewer Div */}
                    <div className="burger-previewer" style={{ width: '250px', height: '250px', overflow: 'hidden', position: 'relative', border: '2px solid #3b85fb', borderRadius: '10px' }}>
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
                        {/* Buttons for Profile, Cart, and Favorites */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
    <Link to="/private" style={{ textDecoration: 'none' }}>
        <button className="btn btn-primary btn-icon" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
                <img src="https://img.icons8.com/fluency/48/000000/gender-neutral-user.png" alt="Profile" style={{ width: '29px', height: '29px' }} />
            </div>
        </button>
    </Link>
    <Link to="/shoppingcart" style={{ textDecoration: 'none' }}>
        <button className="btn btn-primary btn-icon" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}>
            <div style={{ width: '30px', height: '30px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
                <img src="https://img.icons8.com/fluency/48/000000/shopping-cart.png" alt="Cart" style={{ width: '29px', height: '29px' }} />
            </div>
        </button>
    </Link>
    <button className="btn btn-primary btn-icon" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}>
        <div style={{ width: '30px', height: '30px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
            <img src="https://img.icons8.com/fluency/48/000000/like.png" alt="Favorites" style={{ width: '29px', height: '29px' }} />
        </div>
    </button>
</div>









                    </div>

                    <div className="ingredient-options" style={{ width: '500px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
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











