import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { Collapse } from 'react-bootstrap';

import Buildertools from "../component/buildertools";
import RobotEyes from "../component/RobotEyes";
import IngredientComponent from "../component/IngredientComponent";
import MenuPageSlider from "../component/MenuPageSlider";
import BurgerPreviewer from "../component/BurgerPreviewer";
import context from "react-bootstrap/esm/AccordionContext";
import OpenWeatherMap from "../component/openweathermap";

export const Menu = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burgerIngredients, setBurgerIngredients] = useState([]);
    const [burger_id, setBurgerId] = useState(null);
   
    useEffect(() => {
        // actions.getCurrentBurger(burger_id);
        // actions.getIngredients();
        
        
    }, []);
    
    // test('Check store state', () => {
    //     // Access the store or context directly and inspect its state
    //     console.log(store.getState()); // Log the state to the console
    // });
    // useEffect(() => {
    //     // Store current burger in local storage when it changes
    //     localStorage.setItem("current_burger", JSON.stringify(store.current_burger));
    // }, [store.current_burger]);

    const handleIngredientClick = (burger, ingredient) => {
        // Call the action to add the ingredient to the burger
        actions.addIngredientToBurger(burger.id, ingredient.id);
        
    };
    
        const handleAddNewBruger = () => {
            actions.createBurger();
            // window.location.reload();
        };

        const handleClearIngredients = () => {
            // Call the clearIngredients function here
            actions.clearIngredients();
        };
  
   
    const handleProceedToCart = () => {
        // Navigate to the cart page
        navigate("/cart");
    };
    
    return (
        <div className="card menu-card">
            <div className="card-body">
                
                <div className="burger-container container mt-5">
                
                    <RobotEyes style={{ zIndex:'0'}}></RobotEyes> 


                    <div className="modual for preview-contaner and util buttons" style={{ display: 'flex', justifyContent:'center',zIndex:'1'}}>
                        
                        {/* Buttons for Profile, Cart, and Favorites */}
                        <div className="MenuPagesSlider" style={{ position: 'relative', top:'105px', zIndex: '2' }}>
                            <MenuPageSlider />
                        </div>
                        
                        {/* Burger Preview Div */}
                        <div className="burger-previewer-container" style={{ 
                            position: 'relative', 
                            zIndex: '3' 
                            }}>
                            
                            <BurgerPreviewer currentBurger={store.current_burger} />
                            
                        </div>
                        
                        {/* Weather Fetch Slider */}
                        <div className="WeatherSlider"style={{ position: 'relative', top:'25px', zIndex: '1' }}>
                            <OpenWeatherMap/> 
                        </div>
                        
                    
                    
                    </div>
                    
                    
                        
                    {/* <-- End of "TopHalf of page" burger preview and buttons-->  */}
                    {/* Builder Tools Tab */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin: "0 auto", }}>
                        <Buildertools handleAddNewBruger={handleAddNewBruger} handleClearIngredients={handleClearIngredients} />
                     </div>
                   
                    
                    
                    {/* <-- End of "ingredient choices"-->  */}            
                </div>
                {/* <-- End of "burger-container container mt-5"-->  */}

                <div className="ingredient component"  style={{ display: 'flex', flexDirection: 'column' }} >
                    {/* Ingredient Choices Tab */}
                    
                    <div style={{ position: "relative", margin: "0 auto", width: '156px', height: '40px', backgroundColor: '#3875ce', clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', borderRadius: '4px 20px 0px 0px', }}>
                        {/* Your menu items */}
                    </div>

                    {/* Ingredient Choices Viewer */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', right:'10px', }}>
                        <div className="ingredient-options" style={{ width: '440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0px', border: '8px solid #3b85fb', borderRadius: '10px 10px 10px 10px', padding: '10px' }}>
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
                </div>
            </div>
            {/* <-- End of "card body"-->  */}
        </div>
        // {/* <-- End of "Menu Card"-->  */}
    );
};
