import React, { useState } from 'react';

import Ok from '../payment/Ok';
const Home = () => {
  const [checkout, setCheckout] = useState(false);

  const logout = () => {
    localStorage.removeItem("email");
    window.location.reload();
  };

  const ok = () => {
    setCheckout(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="mb-6 text-2xl font-semibold text-blue-800">CalAI Task</div>
      <Ok/>
      <button
        onClick={logout}
        className="mb-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Logout
      </button>

    </div>
  );
};

export default Home;
