import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51POHrrSIkOV7J91YyUemMD1Ak19zaWECFEpQWbZApvQra29WW5HqipuoX0M304MZKOf1CZ04crWPqNMctxlh6s1400do0VEFb4'); // Replace with your Stripe public key

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeProvider;
