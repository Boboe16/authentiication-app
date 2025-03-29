"use client";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // ✅ Get router instance for redirecting

  async function signInManually(e: React.FormEvent) {
    e.preventDefault(); // Prevent page refresh

    if (!emailRef.current || !passwordRef.current) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // 🔥 Sign in without redirecting automatically
    const result = await signIn("credentials", {
      username: email,
      password,
      redirect: false, // ✅ Prevent automatic redirect
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
      alert("Invalid credentials. Please try again."); // 🔥 Show error to user
    } else {
      console.log("Login successful!", result);
      router.push("/store"); // ✅ Redirect manually after success
    }
  };

  return (
    <form onSubmit={signInManually} className="flex flex-col rounded-xl bg-pink-400 my-52 mx-7 mr-96 px-10 py-5">
      <h1 className="text-center font-bold text-3xl">Authentication Form</h1>

      <label className="mt-5">Email:</label>
      <input ref={emailRef} type="email" name="email" required />

      <label className="mt-5">Password:</label>
      <input ref={passwordRef} type="password" name="password" required />

      <a onClick={() => router.push("/forgot-password")} className="self-end mt-5 underline cursor-pointer">Forgot password</a>

      <button className="rounded-2xl bg-green-500 self-center px-16 py-3 text-lg mt-5" type="submit">
        Login
      </button>
      <p className=" text-center mt-5">Login or create account with:</p>
      <div onClick={() => signIn("google", {callbackUrl: "/loading"})} className="flex flex-row cursor-pointer self-center bg-white rounded-2xl w-fit gap-3 justify-center my-5 px-10 py-3 text-lg mt-5">
        <Image src="/google.png" alt="google.png" width={35} height={35}/>
        <h3 className="text-black text-lg mt-[5px]">Google</h3>
      </div>
    </form>
  );
}
