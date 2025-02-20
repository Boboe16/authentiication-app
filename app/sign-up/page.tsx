'use client'
import { useEffect } from "react";

export default function Home() {

  const fetchData = async () => {
    const response = await fetch("/api/read-data/", { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({ email: "example@example.com", password: "password123" })
  });
    const data = await response.json();
    console.log("API response:", data);
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="">
      <form className="flex flex-col bg-pink-400 p-6 rounded-md m-10 shadow-lg">
        <div className="flex flex-col my-2">
          <label htmlFor="email">Email:</label>
          <input className="p-2 rounded-sm" type="email" id="email" name="email" required />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="password">Password:</label>
          <input className="p-2 rounded-sm" type="password" id="password" name="password" required />
        </div>
        <div className="flex flex-row place-content-between">
          <a className="px-3 py-2 underline" href="/">Sign in</a>
          <button type="submit" className="self-end bg-green-400 px-3 py-2 rounded-lg w-fit">Sign up</button>
        </div>
      </form>
    </div>
  );
}
