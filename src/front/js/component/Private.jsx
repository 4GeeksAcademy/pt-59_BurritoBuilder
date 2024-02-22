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

    return (
        <div className="container text-center">
            <h1>User Informtation</h1>
            <Dashboard />
        </div>
    );
}

export default Private;