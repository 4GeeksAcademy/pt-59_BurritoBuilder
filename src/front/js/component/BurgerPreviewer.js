import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";



const BurgerPreviewer = ({ currentBurger }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burger_id, setBurgerId] = useState(null);
   
 useEffect(()=>{
    actions.getBurgers()
 },[])   
    

// console.log(burger_id)

    return (
        <div className="burger-previewer" style={{ width: '250px', height: '250px', overflow: 'hidden', position: 'relative', border: '4px solid #3b85fb', borderRadius: '0px 0px 10px 10px', backgroundColor: 'white' }}>
            {currentBurger?.ingredients && Array.isArray(currentBurger.ingredients) && currentBurger.ingredients.map((ingredient, index) => (
            //  console.log(burgerIngredients),
            //  console.log(currentBurger),  
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
    );
};

export default BurgerPreviewer;

