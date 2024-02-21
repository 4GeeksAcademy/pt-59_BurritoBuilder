import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm.js"
import "../../styles/stripe.css";


const PUBLIC_KEY = "pk_test_rgWMA3zxjAtwaB6iV8b5W40x"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export const StripeContainer=() => {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}