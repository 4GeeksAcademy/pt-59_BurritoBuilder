import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css"; // Import your custom CSS styles if needed
import theclassichamburger from "../../img/theclassichamburger.png";
import blueclassichamburger from "../../img/blueclassichamburger.png";
import greenclassichamburger from "../../img/greenclassichamburger.png";
import whiteclassichamburger from "../../img/whiteclassichamburger.png";
import { Carousel } from "react-bootstrap";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Define an array of image URLs
    const images = [
        theclassichamburger,
        blueclassichamburger,
        greenclassichamburger,
        whiteclassichamburger
    ];

    // Define an array of label titles corresponding to each image
    const labels = [
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
            <div className="row">
                {/* Left column for login form */}
                <div className="col-md-6">
                    <div className="login-wrapper border p-3 rounded">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
                                    <h2>Login</h2>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input onChange={onChange} value={formValue.email} type="email" className="form-control" placeholder="Enter email" id="email" />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input onChange={onChange} value={formValue.password} type="password" className="form-control" placeholder="Enter password" id="password" />
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <button type="button" onClick={handleSubmit} className="btn btn-primary mb-2">Login</button>
                                    <Link to="/signup" className="btn btn-secondary mb-2">Signup</Link>
                                </div>
                            </div>
                        </div>
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





















