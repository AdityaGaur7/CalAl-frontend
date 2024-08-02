import React, { useState } from 'react';
import StripeProvider from './StripeProvider';
import PaymentForm from './PaymentForm';
import PaypalProvider from './PaypalProvider';

const Ok = () => {
  const [checkout, setCheckout] = useState('');
  let amount = 100; // Amount in dollars

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Payment Options</h1>
      <div className="text-center">
        <button
          onClick={() => setCheckout('stripe')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Checkout with Stripe
        </button>
        <button
          onClick={() => setCheckout('paypal')}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Checkout with PayPal
        </button>
      </div>
      {checkout === 'stripe' && (
        <StripeProvider>
          <PaymentForm />
        </StripeProvider>
      )}
      {checkout === 'paypal' && <PaypalProvider amount={amount} />}
    </div>
  );
};

export default Ok;
