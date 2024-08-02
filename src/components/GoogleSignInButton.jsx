import React, { useEffect, useState } from "react";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";

const GoogleSignInButton = () => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);

        const user = data.user;
        console.log("User signed in: ", user);
    
      })
      .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  };

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      {value ? (
        <Home />
      ) : (
        // <button
         
        //   className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        // >
        //   Sign in with Google
        // </button>
        <button type="button" className="login-with-google-btn" onClick={handleClick} >
        Sign in with Google
      </button>
      )}
    </div>
  );
};

export default GoogleSignInButton;
