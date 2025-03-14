"use client";
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
export default function Component() {
  const { data: session } = useSession()
  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <Image src={session.user.image as string} alt="wtf" width={100} height={100}/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}