"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Loading() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.redirectTo) {
      router.push(session.user.redirectTo);
    }
  }, [session]);

  return <div>Loading...</div>;
}
