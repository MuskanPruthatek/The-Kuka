import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom'; // Ensure you have react-router-dom installed
const VITE_API_KEY = import.meta.env.VITE_API_KEY

const PaymentGateway = () => {
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [card, setCard] = useState(null);
  const location = useLocation(); // To access URL parameters

  useEffect(() => {
    // Initialize Stripe
    const stripePromise = loadStripe(VITE_API_KEY); // Replace with your Stripe test publishable key
    stripePromise.then((stripeInstance) => {
      setStripe(stripeInstance);
      const elementsInstance = stripeInstance.elements();
      setElements(elementsInstance);
      const cardElement = elementsInstance.create('card');
      cardElement.mount('#card-element');
      setCard(cardElement);
    });

    // Check for client secret in URL (after redirect)
    const query = new URLSearchParams(location.search);
    const clientSecret = query.get('payment_intent_client_secret');
    if (clientSecret && stripe) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case 'succeeded':
            alert('Payment succeeded!');
            break;
          case 'processing':
            alert('Your payment is processing.');
            break;
          case 'requires_payment_method':
            alert('Your payment was not successful, please try again.');
            break;
          default:
            alert('Something went wrong.');
            break;
        }
      });
    }
  }, [stripe, location.search]);

  // Function to create a Payment Intent on the backend
  const createPaymentIntent = async (amount) => {
    const response = await fetch('http://localhost:3000/api/v1/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount, // Amount in the smallest currency unit (e.g., 1000 for $10.00)
        currency: 'usd', // Currency code (optional, defaults to 'usd')
      }),
    });

    const data = await response.json();
    return data.clientSecret; // Return the client secret
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !card) return;

    // Get the client secret from the backend
    const clientSecret = await createPaymentIntent(1000); // Example amount: $10.00

    // Confirm the payment with the card details
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card, // The card Element created earlier
      },
      // Optionally, specify a return_url if using redirect-based methods
      // return_url: 'https://your-website.com/payment-success',
    });

    if (error) {
      // Show error to your customer (e.g., insufficient funds)
      console.error('Payment failed:', error.message);
    } else if (paymentIntent.status === 'succeeded') {
      // The payment has been processed!
      console.log('Payment succeeded:', paymentIntent);
      alert('Payment successful!');
    }
  };

  return (
    <div className='flex flex-col gap-y-10 justify-center items-center'>
    <h1 className='text-black text-[40px] '>Stripe Payment</h1>

    {/* Payment form */}
    <form id="payment-form" onSubmit={handleSubmit}>
      <div id="card-element" className='bg-blue-100 flex flex-col w-[200px] h-[100px] '>
        {/* Stripe's card element will be inserted here */}
      </div>
      <button type="submit" className='w-fit h-fit px-5 mt-8 py-3 bg-blue-300 '>Pay Now</button>
    </form>
  </div>
  );
};

export default PaymentGateway;

