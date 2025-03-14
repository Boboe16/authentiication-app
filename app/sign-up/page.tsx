'use client'
import { useRef } from "react";

export default function SignUp() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const messageToStoreRef = useRef<any>();

  const createData = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/create-data/", { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: emailRef.current.value,
        password: passwordRef.current.value,
        messageToStore: messageToStoreRef.current.value 
      })
    });
    const data = await response.json();
    console.log("API response:", data);
  };

  return (
    <div className="">
      <form onSubmit={createData} method="POST" className="flex flex-col bg-pink-400 p-6 rounded-md m-10 shadow-lg">
        <div className="flex flex-col my-2">
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} className="p-2 rounded-sm" type="email" id="email" name="email" required />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="password">Password:</label>
          <input ref={passwordRef} className="p-2 rounded-sm" type="password" id="password" name="password" required />
        </div>
        <div className="flex flex-col my-2">
          <label>Message to store:</label>
          <input ref={messageToStoreRef} className="p-2 rounded-sm" id="message-to-store" name="message-to-store" required />
        </div>
        <div className="flex flex-row place-content-between">
          <a className="px-3 py-2 underline" href="/">Sign in</a>
          <button type="submit" className="self-end bg-green-400 px-3 py-2 rounded-lg w-fit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
