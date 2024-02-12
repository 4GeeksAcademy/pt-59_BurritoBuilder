import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const ShoppingCart = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    

    return(
        <div className="container mt-5">This where the shoppingcart page should go</div>
    );
}