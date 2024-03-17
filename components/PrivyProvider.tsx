"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      onSuccess={(user, isNewUser) => {
        return isNewUser ? router.push("/post/newuser") : router.push("/ccts");
      }}
      config={{
        appearance: {
          showWalletLoginFirst: false,
          accentColor: "#6A6FF5",
          theme: "#FFFFFF",
          logo: "https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png",
        },
        loginMethods: ["email", "apple", "google", "twitter"],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
