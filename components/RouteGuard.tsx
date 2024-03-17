"use client";

import { usePrivy } from "@privy-io/react-auth";
import { read } from "fs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
    if (user) {
      localStorage.setItem("user", user.id);
    }
  }, [authenticated, ready, router, user]);

  return <>{children}</>;
}
