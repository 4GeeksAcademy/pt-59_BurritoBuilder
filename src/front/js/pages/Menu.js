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
                

                <div className="burger-container container mt-5" style={{ position: 'relative',textAlign: 'center' }}>
                    <h2>Preview Burger Builder</h2>
                    <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center' }}>
                    <button className="btn btn-primary" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}></button>
                        {/* Burger Previewer Div */}
                        <div className="burger-previewer" style={{ width: '250px', height: '250px', overflow: 'hidden', position: 'relative', border: '4px solid #3b85fb', borderRadius: '10px 10px 0px 10px' }}>
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
                                    <div style={{ width: '30px', height: '40px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
                                        <img src="https://img.icons8.com/fluency/48/AAAAAA/gender-neutral-user.png" alt="Profile" style={{ width: '29px', height: '29px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                    </div>
                                </button>
                            </Link>
                            <Link to="/shoppingcart" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary btn-icon" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}>
                                    <div style={{ width: '30px', height: '40px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
                                        <img src="https://img.icons8.com/fluency/48/AAAAAA/shopping-cart.png" alt="Cart" style={{ width: '29px', height: '29px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                    </div>
                                </button>
                            </Link>
                            <button className="btn btn-primary btn-icon" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}>
                                <div style={{ width: '30px', height: '40px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
                                    <img src="https://img.icons8.com/fluency/48/AAAAAA/like.png" alt="Favorites" style={{ width: '29px', height: '29px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                </div>
                            </button>
                        </div>
                    </div>
                    {/* builderfunctions */}
                </div>
                    
{/* <div className="builderFunctions" style={{ position: 'relative', alignItems:'center', justifyContent: 'center', width: '83px', height: '30px', backgroundColor: '#3b85fb', clipPath: 'polygon(10% 100%, 90% 100%, 100% 0%, 0% 0%)', borderRadius: '0px 0px 20px 20px', position: 'relative', display: 'block' }}> 
    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v1.png" alt="Add" className="icon" style={{ width: '16px', height: '16px', position: 'absolute', top: '50%', left: '20%', transform: 'translate(-50%, -50%)', transition: 'filter 0.3s' }} />
    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/trash--v1.png" alt="Delete" className="icon" style={{ width: '16px', height: '16px', position: 'absolute', top: '50%', left: '80%', transform: 'translate(-50%, -50%)', transition: 'filter 0.3s' }} />
</div> */}
<div style={{ 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}}>
    <div style={{ 
        width: '100px', /* Adjust the width as needed */
        height: '30px', /* Keep the height */
        backgroundColor: '#3b85fb', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)', /* Define the trapezoid shape */
        borderRadius: '0 0 25px 25px', /* Round bottom corners */
        marginLeft: '125px',
    }}>
        <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v1.png" alt="Add" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
        <img src="https://img.icons8.com/material-outlined/24/FFFFFF/trash--v1.png" alt="Delete" style={{ width: '24px', height: '24px' }} />
    </div>
</div>



                    
              
                    {/* This is the end of the burger Preview Div */}
                

                <div className ="ingredientMenu" style={{ marginTop: '0px'}} >
                <div style={{ 
                            width: '120px', 
                            height: '40px', 
                            backgroundColor: '#3b85fb', 
                            clipPath: 'polygon(0% 100%, 100% 100%, 95% 0%, 0% 0%)', 
                            borderRadius: '4px 20px 0px 0px' 
                        }}>
                            {/* Content inside the trapezoid */}
                        </div>
                    </div>

                <div className="ingredient-options" style={{ width: '500px', margin:'0px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0px', border: '4px solid #3b85fb', borderRadius: '0px 10px 10px 10px', padding: '10px' }}>
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