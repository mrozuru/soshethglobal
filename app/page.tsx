"use client";

import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { login, ready, authenticated } = usePrivy();

  useEffect(() => {
    if (ready && authenticated) {
      redirect("/ccts");
    }
  }, [authenticated, ready]);

  return (
    <main className="flex h-screen flex-col items-center gap-10 justify-center p-24">
      <Image alt="sosh image" src={"/soshIcon.svg"} width={96} height={96} />
      <button
        className="sosh__linear-gradient py-3 px-6 text-white rounded-lg"
        onClick={login}
      >
        Login
      </button>
    </main>
  );
}
