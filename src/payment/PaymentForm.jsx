import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(100); // Amount in dollars
  const [couponCode, setCouponCode] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState(amount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to apply coupon and get client secret
  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post('https://calal-backend.onrender.com/create-payment-intent', {
        amount,
        couponCode
      });
      
      // Ensure the response contains clientSecret and amount
      const { clientSecret, amount: newAmount } = response.data;
      setDiscountedAmount(newAmount);
    //   alert(`Coupon applied! Final amount: ${newAmount}`);
      return clientSecret;
    } catch (err) {
      setError(`Failed to apply coupon: ${err.message}`);
      return null;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Get client secret from handleApplyCoupon
    const clientSecret = await handleApplyCoupon();

    if (!clientSecret) {
      setLoading(false);
      return;
    }

    try {
      // Confirm card payment
      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
        console.log(stripeError.message);
      } else {
        alert('Payment successful!');
      }
    } catch (err) {
      setError(`Payment error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-gray-700">Enter coupon code:</label>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Apply Coupon
        </button>
      </div>
      <CardElement className="mb-4" />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Pay ${discountedAmount.toFixed(2)}
      </button>
    </form>
  );
};

export default StripePaymentForm;
