import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Backgroundpreviewer from "./backgroundpreviewer";
import RobotMouth from "./RobotMouth";


const BurgerPreviewer = ({ currentBurger }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [burger_id, setBurgerId] = useState(null);
   
 useEffect(()=>{
    actions.getBurgers()
    //    window.location.reload();
 },[])   
    

// console.log(burger_id)

 return (
        <div className="burger-previewer-wrapper">
            
            {/* BurgerPreviewer */}
            <div className="burger-previewer" style={{
                 width: '250px', 
                 height: '250px', 
                 overflow: 'hidden', 
                 position: 'relative', 
                  
                 borderRadius: '0px 0px 10px 10px',
                 top:'-15px', 
                 zIndex: '10',
                 margin:'0', 
                 }}>
                {currentBurger?.ingredients && Array.isArray(currentBurger.ingredients) && currentBurger.ingredients.map((ingredient, index) => (
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
            {/* BackgroundPreviewer */}
            <div className="background-previewer" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                zIndex: '0' }}>
                <Backgroundpreviewer />
            </div>
            <div className="robo jaw" style={{ 
                position: 'relative', 
                 
                zIndex: '20' }}>
                <RobotMouth />
            </div>
        </div>
    );
};

export default BurgerPreviewer;

