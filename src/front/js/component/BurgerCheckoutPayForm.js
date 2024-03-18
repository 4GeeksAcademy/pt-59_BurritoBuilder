import React, { useState } from 'react'; // Import useState
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('Error creating payment method:', error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            // Proceed with payment processing, e.g., sending paymentMethod.id to your server
            setLoading(true); // Start loading state
            setTimeout(() => {
                setLoading(false); // Stop loading state
                navigate('/paymentsuccess'); // Navigate to '/paymentsuccess' after 4 seconds
            }, 4000); // 4 seconds delay
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={loading || !stripe}>
                {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
            </button>
        </form>
    );
};

export default CheckoutForm;


