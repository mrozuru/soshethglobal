"use client";

import { usePrivy } from "@privy-io/react-auth";
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
    <main className="flex h-screen flex-col items-center gap-1 justify-center p-24">
      <h1 className="text-[48px] font-bold  leading-Sosh22">SoSH</h1>
      <button
        className="bg-green-400 hover:bg-green-500 py-3 px-6 text-white rounded-lg"
        onClick={login}
      >
        Login
      </button>
    </main>
  );
}
