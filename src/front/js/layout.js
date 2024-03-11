import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import Private from "./component/Private.jsx";
import injectContext from "./store/appContext";
import { Menu } from "./pages/Menu.js";
import { ShoppingCart } from "./pages/ShoppingCart.js";

import { EditFavorites } from "./pages/EditFavorties.js";
import { FavoriteBurgers } from "./pages/FavoriteBurgers.js";
import { OrderHistory } from "./pages/OrderHistory.js";
import ShoppingApp from './component/ShoppingApp';
import BurgerCheckout from "./pages/BurgerCheckout.js";
// import { StripeContainer } from "./component/StripeContainer.js";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<Menu />} path="/menu" />
                        <Route element={<ShoppingCart />} path="/shoppingcart" />
                        <Route element={<BurgerCheckout />} path="/burgercheckout" />
                        <Route element={<EditFavorites />} path="/editfavorites" />
                        <Route element={<FavoriteBurgers />} path="/favoriteburgers" />
                        <Route element={<OrderHistory />} path="/orderhistory" />
                        {/* <Route element={<StripeContainer />} path="/react-stripe" /> */}
                        {/* Error on line above. Need to mold these files untill they fit  */}
                        <Route element={<ShoppingApp />} path="/component/ShoppingApp" />
                        <Route element={<h1>Not found!</h1>} path="*"/>
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
