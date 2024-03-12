import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css"; // Import your custom CSS styles if needed
import theclassichamburger from "../../img/theclassichamburger.png";
import blueclassichamburger from "../../img/blueclassichamburger.png";
import greenclassichamburger from "../../img/greenclassichamburger.png";
import whiteclassichamburger from "../../img/whiteclassichamburger.png";
import burgerbitelogo from "../../img/burgerbitelogo.jpg";

import { Carousel } from "react-bootstrap";
import VideoPlayer from "../component/VideoPlayer";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Define an array of image URLs
    const images = [
        burgerbitelogo,
        theclassichamburger,
        blueclassichamburger,
        greenclassichamburger,
        whiteclassichamburger
    ];

    // Define an array of label titles corresponding to each image
    const labels = [
        "  ",
        "The Classic Burger",
        "The Beefy Burger",
        "The Special",
        "Buns Voyage Burger"
    ];

    function onChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({ ...formValue, [id]: value });
    }

    const handleSubmit = async () => {
        let result = await actions.login(formValue);
        if (result) {
            navigate("/private");
        }
    };

    return (
        <div className="container mt-5">
            <div>
            <VideoPlayer />
            </div>
            <div className="row">
                {/* Left column for login form */}
                <div className="col-md-6">
                    <h4>About Us</h4>
                    <div>
                    Welcome to our burger builder web app, where we believe that every bite should be a personalized delight! At Burger Bite, our robot is passionate about crafting the perfect burger tailored to your specific taste buds.  
                    </div>
                </div>
    
                {/* Right column for feature's table with centered carousel */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="features-table-wrapper border p-3 rounded">
                        <div id="carouselExampleCaptions" className="carousel slide rounded bronze-border" style={{ maxWidth: "300px" }}>
                            <Carousel>
                                {images.map((imageUrl, index) => (
                                    <Carousel.Item key={index}>
                                        <img src={imageUrl} className="d-block w-100" alt={`Slide ${index + 1}`} />
                                        <Carousel.Caption style={{ top: "8px" }}>
                                            <h5 style={{ fontSize: "20px" }}>{labels[index]}</h5>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <div className="carousel-indicators">
                                {images.map((imageUrl, index) => (
                                    <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current={index === 0 ? "true" : "false"} aria-label={`Slide ${index + 1}`}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;





















