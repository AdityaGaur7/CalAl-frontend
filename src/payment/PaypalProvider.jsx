// PayPalPaymentButton.js
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const PayPalPaymentButton = () => {
  const paypalRef = useRef();
  const [amount, setAmount] = useState(100); // Amount in dollars
  const [couponCode, setCouponCode] = useState('');
  const [finalAmount, setFinalAmount] = useState(amount);

  useEffect(() => {
    const renderPayPalButton = () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = ''; // Clear previous buttons if any

        window.paypal.Buttons({
          createOrder: async () => {
            const { data } = await axios.post('https://calal-backend.onrender.com/create-paypal-order', {
              amount: finalAmount,
              couponCode
            });
            return data.id;
          },
          onApprove: async (data) => {
            console.log(`PayPal payment ID: ${data.id}`);
            alert('Payment successful!');
          },
          onError: (err) => {
            console.error('PayPal error:', err);
          }
        }).render(paypalRef.current);
      }
    };

    renderPayPalButton();
  }, [finalAmount]);

  const handleApplyCoupon = async () => {
    try {
      const { data } = await axios.post('https://calal-backend.onrender.com/create-paypal-order', {
        amount,
        couponCode
      });

      setFinalAmount(data.finalAmount);
      alert(`Coupon applied! Final amount: ${data.finalAmount}`);
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Failed to apply coupon');
    }
  };

  return (
    <div>
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
      <div ref={paypalRef} className="my-4"></div>
    </div>
  );
};

export default PayPalPaymentButton;
