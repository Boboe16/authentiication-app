"use client"
import { useState, useRef } from "react";

export default function SignIn() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [storedMessage, setStoredMessage] = useState("");
  const [showStoredMessage, setShowStoredMessage] = useState(false);

  const readData = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("this is working")
    const response = await fetch(`/api/read-data?email=${emailRef.current.value}&password=${passwordRef.current.value}`, { method: "GET" })
    const data = await response.json();
    try {
      const getStoreMessage = data.messageToStore
      console.log("Output: ", data);
      setStoredMessage(getStoreMessage);
      setShowStoredMessage(true);  
    } catch(error) {
      console.log(error);
      console.log("Failed to retrieve stored message: ", data);
      setStoredMessage("The data doesn't have message stored");
      setShowStoredMessage(true);  // Reset message display if error occurs.
    }
  };

  return (
    <div>
      <form onSubmit={readData} method="GET" className="flex flex-col bg-pink-400 p-6 rounded-md m-10 shadow-lg">
        <div className="flex flex-col my-2">
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} className="p-2 rounded-sm" type="email" id="email" name="email" required />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="password">Password:</label>
          <input ref={passwordRef} className="p-2 rounded-sm" type="password" id="password" name="password" required />
        </div>
        <div className="flex flex-row place-content-between">
          <a className="px-3 py-2 underline" href="/sign-up">Sign up</a>
          <button type="submit" className="self-end bg-green-400 px-3 py-2 rounded-lg w-fit">Login</button>
        </div>
      </form>
      {showStoredMessage && 
        <div>
          <p>{storedMessage}</p>
        </div>
      }
    </div>
  );
}
