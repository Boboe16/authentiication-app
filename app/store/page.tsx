"use client";   
import { useSession, signOut } from "next-auth/react";

export default function Component() {
    const { data: session, status } = useSession();
    
    if (session?.user && status === "authenticated") {
        return (
            <>
                <p>Signed in as {session.user.email}, id is {session.user.id}, and username is {session.user.name}</p>
                <button className="rounded-full bg-green-500" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
            </> 
        )
    } 

    return <p>Loading...</p>
}