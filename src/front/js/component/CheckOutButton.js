import React, { useState } from 'react';
import { useNavigate , Link } from "react-router-dom";

const CheckoutButton = ({ burgers, totalAmount }) => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        let total = 0;

        for (let burger of burgers) {
            total += burger.total_price;
        }

        const response = await fetch(process.env.BACKEND_URL + '/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: total,
                burger_id: 0
            })
        });

        if (!response.ok) {
            throw new Error('Failed to initiate checkout');
        }

        const responseData = await response.json();
        console.log(responseData); // Handle response data accordingly

        setLoading(false);
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
