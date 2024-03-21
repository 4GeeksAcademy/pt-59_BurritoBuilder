import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../component/BurgerCheckoutPayForm';

const stripePromise = loadStripe('pk_test_51OsCor073rU1HC30du5j5wPFuXxoDJRG3FG3I6YiYf5ug13vesiR3bDGMH0bMrEUATROpclHhKmnU3CiYipHHdIF000Nwacky9'); // Replace with your Stripe publishable key

const BurgerCheckout = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [burgers, setBurgers] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchBurgers(); // Fetch burgers when the component mounts
    }, []);

    const fetchBurgers = async () => {
        setLoading(true);
        try {
            const response = await fetch(process.env.BACKEND_URL + '/api/burgers');
            if (!response.ok) {
                throw new Error('Failed to fetch burgers');
            }
            const data = await response.json();
            console.log(data)
            setBurgers(data.burgers);
            calculateTotalAmount(data.burgers); // Calculate total amount
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const calculateTotalAmount = (burgers) => {
        const total = burgers.reduce((acc, burger) => acc + burger.total_price, 0);
        setTotalAmount(total);
    };
    // return (
    //     <div>
    //         <h2>Checkout Summary</h2>
    //         <ul>
    //             {burgers.map((burger, index) => (
    //                 <li key={index}>
    //                     Burger ID: {burger.id}<br />
    //                     {/* Add null check for price */}
    //                     Price: {burger.total_price ? burger.total_price.toFixed(2) : "N/A"}<br />
    //                     {/* Add null check for quantity */}
                        
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh' }}>
            <div style={{ border: '8px solid #3b85fb', padding: '20px', borderRadius: '8px', width: 'fit-content', marginBottom: '20px' }}>
                <h1>Checkout</h1>
                <div>
                    <h2>Order Summary</h2>
                    <ul>
                        {burgers.map((burger) => (
                            <li key={burger.id}>
                               Burger #{burger.id} - ${burger.total_price?.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                </div>
            </div>
            <div style={{ border: '8px solid #3b85fb', padding: '20px', borderRadius: '8px', width: '500px' }}> {/* Adjusted width */}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <h2>Payment Form</h2>
                <Elements stripe={stripePromise}>
                    <CheckoutForm totalAmount={totalAmount} />
                </Elements>
            </div>
        </div>
    );

};

export default BurgerCheckout;
