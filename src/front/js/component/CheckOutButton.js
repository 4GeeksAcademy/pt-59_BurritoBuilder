import React, { useState } from 'react';
import { useNavigate , Link } from "react-router-dom";

const CheckoutButton = ({ burgers, totalAmount }) => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const response = await fetch(process.env.BACKEND_URL + '/api/process_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    
                    total_price: totalAmount
                })
            });

            if (!response.ok) {
                throw new Error('Failed to initiate checkout');
            }

            const responseData = await response.json();
            console.log(responseData); // Handle response data accordingly

            setLoading(false);
        } catch (error) {
            console.error('Error initiating checkout:', error);
            setLoading(false);
        }
    };

    return (
        <Link to="/burgercheckout">
            <button onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Checkout'}
            </button>
        </Link>
    );
};

export default CheckoutButton;
