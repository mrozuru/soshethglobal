import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import PrivyProviderWrapper from "@/components/PrivyProvider";
import { Web3ModalProvider } from '../context/Web3Modal';
import RouteGuard from "@/components/RouteGuard";
import { PostDataProvider } from '@/context/PostDataContext';

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "SoSH",
  description: "SoSh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <PrivyProviderWrapper>
        <Web3ModalProvider>
        <PostDataProvider> 
          <RouteGuard>{children}</RouteGuard>
        </PostDataProvider>
          </Web3ModalProvider>
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
