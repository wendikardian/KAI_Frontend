/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../component/Navbar";
import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function Payment() {
  const { id } = useParams();
  console.log(id);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Make an API call to your server to process the payment
    const response = await fetch("/your-server-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    if (response.ok) {
      setSuccess(true);
    } else {
      setError("Payment failed");
    }
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        {error && <div>{error}</div>}
        {success && <div>Payment successful!</div>}
      </form>
    </div>
  );
}
