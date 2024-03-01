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
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
    useEffect(() => {
        actions.getBurgers(burger_id);
        actions.fetchBurgerIngredients();
        // actions.createBurger();
    }, []);
    
    const handleIngredientClick = (burger, ingredient) => {
        // Call the action to add the ingredient to the burger
        actions.addIngredientToBurger(burger.id, ingredient.id);
    };;
      
    // const SquareWithIcon = () => {
    
    const DropdownMenu = () => {
        return (
            <div className="dropdown-menu">
                {/* Three little icons */}
                <div className="dropdown-item">
                    <img src="https://img.icons8.com/fluency/48/AAAAAA/gender-neutral-user.png" alt="Icon 1" />
                </div>
                <div className="dropdown-item">
                    <img src="https://img.icons8.com/fluency/48/AAAAAA/shopping-cart.png" alt="Icon 2" />
                </div>
                <div className="dropdown-item">
                    <img src="https://img.icons8.com/fluency/48/AAAAAA/like.png" alt="Icon 3" />
                </div>
            </div>
        );
    };
      
    const handleMouseEnter = () => {
        setIsDropdownVisible(true);
     };
      
    const handleMouseLeave = () => {
        setIsDropdownVisible(false);
    };
    
    const handleProceedToCart = () => {
        // Navigate to the cart page
        navigate("/cart");
    };
    
    return (
        <div className="card menu-card">
            <div className="card-body">
                <div className="burger-container container mt-5">
                    <div className="burger-container container mt-5" style={{ position: 'relative', textAlign: 'center' }}>
                        <h2>Preview Burger Builder</h2>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        
                        {/* Pages icon */}
                        <div className="menu-pages-column" >
                        <div
    className="square-with-icon"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{
        width: '60px',
        height: '60px',
        marginBottom: '0px',
        position: 'relative',
        backgroundColor: '#3b85fb',
        borderRadius: '10px 0px 0px 10px',
    }}>
    <div style={{ position: 'relative' }}>
        {/* White rectangle */}
        <div
            className="white-rectangle"
            style={{
                width: '56px',
                height: '54px',
                backgroundColor: 'white',
                position: 'absolute',
                top: '30px',
                left: '52.5%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '8px 0px 0px 8px',
                zIndex: 1, // Ensure it's above the icons
            
            }}></div>
        {/* Icons */}
       
        <img
            src="https://img.icons8.com/fluency/48/AAAAAA/like.png"
            alt="Main Icon"
            style={{ position: 'absolute', top: 1, left: 5, width: '30px', height: '30px', zIndex: 2 }}
        />
        <img
            src="https://img.icons8.com/fluency/48/AAAAAA/gender-neutral-user.png"
            style={{ position: 'absolute', top: 4, left: 27, width: '38px', height: '42px', zIndex: 2 }}
        />
         <img
            src="https://img.icons8.com/fluency/48/AAAAAA/shopping-cart.png"
            style={{ position: 'absolute', top: 24, left: 6, width: '30px', height: '30px', zIndex: 2 }}
        />
    </div>

    {isDropdownVisible && <DropdownMenu isVisible={isDropdownVisible} />}
</div>

                             
                        </div> 
                        
                            
                            {/* Burger Previewer Div */}
                            <div className="burger-previewer" style={{ width: '250px', height: '250px', overflow: 'hidden', position: 'relative', border: '4px solid #3b85fb', borderRadius: '0px 10px 0px 10px' }}>
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
                    </div>
                    {/* <-- End of "TopHalf of page" burger preview and buttons-->  */}
                    {/* Builder Tools Tab */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft: '130px'  }}>
                        <div style={{ width: '100px', height: '30px', backgroundColor: '#3b85fb', display: 'flex', justifyContent: 'center', alignItems: 'center', clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)', borderRadius: '0 0 25px 25px', }}>
                            <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v1.png" alt="Add" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                            <img src="https://img.icons8.com/material-outlined/24/FFFFFF/trash--v1.png" alt="Delete" style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                    {/* Ingredient Choices Tab */}
                    <div
    className="ingredientMenu"
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '275px' }}>
    <div
        style={{
            width: '225px',
            height: '40px',
            backgroundColor: '#3b85fb',
            clipPath: 'polygon(0% 100%, 100% 100%, 95% 0%, 0% 0%)',
            borderRadius: '4px 20px 0px 0px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
        {/* Hamburger Icon */}
        <img
            src="https://img.icons8.com/fluency/48/000000/hamburger.png"
            alt="Hamburger"
            style={{ width: '24px', height: '24px' }}
        />
        {/* Bread Icon */}
        <img
            src="https://img.icons8.com/fluency/48/000000/bread.png"
            alt="Bread"
            style={{ width: '24px', height: '24px' }}
        />
        {/* Steak and Fish (Stacked) */}
        
        <div className="Protein" style={{ position: 'relative', bottom: '8px', right: '15px' }}>
            <img
                src="https://img.icons8.com/fluency/48/000000/steak-medium.png"
                alt="Steak"
                style={{ width: '24px', height: '24px', position: 'absolute', top: 0, left: 0 }}
            />
            <img
                src="https://img.icons8.com/fluency/48/000000/fish-food.png"
                alt="Fish"
                style={{ width: '24px', height: '24px', position: 'absolute', top: -7, left: 10 }}
            />
        </div>
        {/* Condiments Icon */}
        <img
            src="https://img.icons8.com/fluency/48/000000/ketchup.png"
            alt="Condiments"
            style={{ width: '24px', height: '24px' }}
        />
        {/* Tomato Icon */}
        <img
            src="https://img.icons8.com/fluency/48/000000/tomato.png"
            alt="Tomato"
            style={{ width: '24px', height: '24px' }}
        />
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