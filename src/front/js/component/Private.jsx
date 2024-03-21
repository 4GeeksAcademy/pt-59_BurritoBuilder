import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        } 
        setTimeout(() => {
            authenticate(navigate)}, 500)        
    }, [])

// createBurger Functionality for button that take you to menu

    return (
        <div className="container text-center mt-3">
            
            <Dashboard />
        </div>
    );
}

export default Private;