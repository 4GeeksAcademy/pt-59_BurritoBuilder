import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Collapse } from 'react-bootstrap';

import IngredientComponent from "../component/IngredientComponent";
import MenuPageSlider from "../component/MenuPageSlider";
import BurgerPreviewer from "../component/BurgerPreviewer";

export const Menu = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burgerIngredients, setBurgerIngredients] = useState([]);
    const [burger_id, setBurgerId] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        actions.getBurgers(burger_id);
        
        actions.fetchBurgerIngredients();
        // actions.createBurger();
    }, []);
    
    const handleIngredientClick = (burger, ingredient) => {
        // Call the action to add the ingredient to the burger
        actions.addIngredientToBurger(burger.id, ingredient.id);
    };
    
    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    // };

    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    // };

   
    const handleProceedToCart = () => {
        // Navigate to the cart page
        navigate("/cart");
    };
    
    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                    <div className="modual for preview-contaner and util buttons" style={{ display: 'flex', justifyContent:'center',}}>
                        {/* Buttons for Profile, Cart, and Favorites */}
                        <div className="MenuPagesSlider" style={{ position: 'relative', zIndex: '1' }}>
    <MenuPageSlider />
</div>
{/* Burger Preview Div */}
<div className="burger-previewer-container" style={{ position: 'relative', zIndex: '2' }}>
    <BurgerPreviewer currentBurger={store.current_burger}/>
</div>


                        {/* These will be for different functions */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '20px' }}>
                            <Link to="/private" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-primary btn-icon" style={{ width: '60px', height: '60px', marginBottom: '10px', position: 'relative', border: '1px solid #3b85fb', borderRadius: '8px' }}>
                                    <div style={{ width: '30px', height: '40px', backgroundColor: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px' }}>
                                        
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
                    {/* <-- End of "TopHalf of page" burger preview and buttons-->  */}
                    {/* Builder Tools Tab */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '72px' }}>
                        <div style={{ width: '100px', height: '30px', backgroundColor: '#3b85fb', display: 'flex', justifyContent: 'center', alignItems: 'center', clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)', borderRadius: '0 0 25px 25px', }}>
                            <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v1.png" alt="Add" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                            <img src="https://img.icons8.com/material-outlined/24/FFFFFF/trash--v1.png" alt="Delete" style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                    
                    {/* Ingredient Choices Tab */}
                    <div className="ingredientMenu" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '275px' }}>
                        <div style={{ width: '225px', height: '40px', backgroundColor: '#3b85fb', clipPath: 'polygon(0% 100%, 100% 100%, 95% 0%, 0% 0%)', borderRadius: '4px 20px 0px 0px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <img src="https://img.icons8.com/fluency/48/000000/hamburger.png" alt="Hamburger" style={{ width: '24px', height: '24px' }} />
                            <img src="https://img.icons8.com/fluency/48/000000/bread.png" alt="Bread" style={{ width: '24px', height: '24px' }} />
                            <div className="Protein" style={{ position: 'relative', bottom: '8px', right: '15px' }}>
                                <img src="https://img.icons8.com/fluency/48/000000/steak-medium.png" alt="Steak" style={{ width: '24px', height: '24px', position: 'absolute', top: 0, left: 0 }} />
                                <img src="https://img.icons8.com/fluency/48/000000/fish-food.png" alt="Fish" style={{ width: '24px', height: '24px', position: 'absolute', top: -7, left: 10 }} />
                            </div>
                            <img src="https://img.icons8.com/fluency/48/000000/ketchup.png" alt="Condiments" style={{ width: '24px', height: '24px' }} />
                            <img src="https://img.icons8.com/fluency/48/000000/tomato.png" alt="Tomato" style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                    
                    {/* Ingredient Choices Viewer */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="ingredient-options" style={{ width: '500px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0px', border: '4px solid #3b85fb', borderRadius: '0px 10px 10px 10px', padding: '10px' }}>
                            {/* Render ingredient options */}
                            {store.ingredients.map((ingredient, index) => (
                                <IngredientComponent
                                    key={index}
                                    ingredient={ingredient}
                                    onIngredientClick={() => handleIngredientClick(store.current_burger, ingredient)} // Pass burger_id and ingredient to the handler
                                />
                            ))}
                        </div>
                    </div>
                    {/* <-- End of "ingredient choices"-->  */}            
                </div>
                {/* <-- End of "burger-container container mt-5"-->  */}
            </div>
            {/* <-- End of "card body"-->  */}
        </div>
        // {/* <-- End of "Menu Card"-->  */}
    );
};
