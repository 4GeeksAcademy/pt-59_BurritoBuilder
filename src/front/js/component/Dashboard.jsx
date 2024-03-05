import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    // Functionality for creating a new burger
    const handlepostaBurger = () => {
       actions.createBurger();
        navigate("/menu");
    };

    const handleFavorites = () => {
        alert("Favorites clicked!");
    };

    const handleOrderHistory = () => {
        alert("Order History clicked!"); 
    };

    
        return (
            <div className="container text-center" style={{ height: "100vw", margin: "100px auto", margin: "auto", marginTop: "50px auto", ...customPatternStyle }}>
                {store.user != null ?
                    <div style={{ border: "10px double #e72b37", borderRadius: "18px", boxShadow: "3px 5px 32px 3px rgba(219, 34, 55, 0.4)", background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)", }} className="p-5 text-light" >
                        <div className="p-5 d-flex justify-content-center" >
                            <img height="30px" width="30px" src="https://media.tenor.com/8m4sSqF0nGIAAAAi/hamburger-joypixels.gif" alt="hamburger-icon" />
                            <h1 className="mx-5">Welcome {store.user.username}!</h1>
                            <img height="30px" width="30px" src="https://media.tenor.com/8m4sSqF0nGIAAAAi/hamburger-joypixels.gif" alt="hamburger-icon" />
                        </div>
                        <div className="mt-5">
                            <h5>What are you going to create today?</h5>
                            <div className="d-flex justify-content-center">
                                <Link onClick={handlepostaBurger} className="btn btn-danger my-3 mx-3" to={"/menu"}>Go to Create Burger</Link>
                                <Link  className="btn btn-danger my-3" to={"/orderhistory"}>Past Orders</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div>User not found</div>
                }
            </div>
        );
    }
    
    const customPatternStyle = {
        backgroundImage: "repeating-conic-gradient(#F70000 0% 25%, #E4E4ED 0% 50%)",
        backgroundPosition: "0 0, 20px 20px",
        backgroundSize: "64px 64px",
        backgroundColor: "#E4E4ED",
  
};

export default Dashboard;

