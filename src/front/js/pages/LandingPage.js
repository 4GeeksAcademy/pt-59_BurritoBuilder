import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import theclassichamburger from "../../img/theclassichamburger.png";
import blueclassichamburger from "../../img/blueclassichamburger.png";
import greenclassichamburger from "../../img/greenclassichamburger.png";
import whiteclassichamburger from "../../img/whiteclassichamburger.png";
import hamburgertable from "../../img/hamburgertable.png";

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

    // State variable to track the index of the currently displayed image
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to move to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Use useEffect to automatically switch to the next image at a set interval
    useEffect(() => {
        const intervalId = setInterval(nextImage, 8000); // Switch image every 8 seconds
        return () => clearInterval(intervalId); // Cleanup function to clear the interval
    }, []);

    function onChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({ ...formValue, [id]: value });
    }
    const handleSubmit = async () => {
        let result = await actions.login(formValue);
        if (result) {
            navigate("/");
        }
    };

    return (
        <div className="container mt-5">
            {/* Picture scroller */}
            <div className="picture-scroller-wrapper">
                <div className="picture-scroller">
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            style={{
                                display: index === currentImageIndex ? "block" : "none",
                                width: "100px", // Adjust the width of the images
                                height: "auto" // Maintain aspect ratio
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="row g-3 border border-lightgray">
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
                <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
            </div>
        </div>
    );
};
