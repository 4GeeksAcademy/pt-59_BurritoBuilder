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
            const response = await fetch('https://orange-space-halibut-jj5w55qrw4pr3jg55-3001.app.github.dev/api/burgers');
            if (!response.ok) {
                throw new Error('Failed to fetch burgers');
            }
            const data = await response.json();
            setBurgers(data.burgers);
            calculateTotalAmount(data.burgers); // Calculate total amount
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const calculateTotalAmount = (burgers) => {
        const total = burgers.reduce((acc, burger) => acc + burger.price, 0);
        setTotalAmount(total);
    };

    return (
        <div>
            <h1>Checkout</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                <h2>Order Summary</h2>
                <ul>
                    {burgers.map((burger) => (
                        <li key={burger.id}>
                            {burger.name} - ${burger.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm totalAmount={totalAmount} />
            </Elements>
        </div>
    );
};

export default BurgerCheckout;
