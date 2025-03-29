"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation"; // ✅ For handling redirects
import { useSession } from "next-auth/react";

export default function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { data: session, status } = useSession();

  const router = useRouter(); // ✅ Get router instance for redirecting

  // If user is already signed in, redirect to home page
  // if (status === "unauthenticated") {
  //   router.push("/");
  //   return;
  // }

  async function signUpManually(e: React.FormEvent) {
    e.preventDefault(); // Prevent page refresh

    if (!usernameRef.current || !emailRef.current || !passwordRef.current || !confirmPasswordRef.current) return;

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    
    if (password!== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }
    // 🔥 Sign up without redirecting automatically
    try {
      const signUp = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      console.log(signUp.json())
      
      // Redirect to home page after successful sign up
      router.push("/");
    } catch(error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form onSubmit={signUpManually} className="flex flex-col rounded-xl bg-pink-400 my-52 mx-7 mr-96 px-10 py-5">
      <h1 className="text-center font-bold text-3xl">Authentication Form</h1>

      <label className="mt-5">Email:</label>
      <input ref={emailRef} type="email" name="email" value={session?.user.email} required disabled/>

      <label className="mt-5">Username:</label>
      <input ref={usernameRef} type="username" name="username" required />

      <label className="mt-5">Password:</label>
      <input ref={passwordRef} type="password" name="password" required />

      <label className="mt-5">Confirm Password:</label>
      <input ref={confirmPasswordRef} type="password" name="password" required />

      <div className="flex flex-row content-between justify-between">
        <a onClick={() => router.push("/")} className="self-end mt-5 underline cursor-pointer">Already have an account?</a>
      </div>

      <button className="rounded-2xl bg-green-500 self-center px-16 py-3 text-lg mt-5" type="submit">
        Sign up
      </button>
    </form>
  );
}
