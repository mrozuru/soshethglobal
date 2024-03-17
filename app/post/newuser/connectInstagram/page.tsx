"use client";

import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { axios } from "@/lib";

function App(): JSX.Element {
  const router = useRouter();

  const handleSubmit = async () => {};

  return (
    <div className="h-screen flex justify-start flex-col items-center">
      <div className="w-full flex-col flex items-center justify-center">
        <div className="mb-10 mt-8">
          <button className="absolute left-4" onClick={() => router.back()}>
            <Image
              priority={true}
              src={"/BackArrowStatus.svg"}
              width={24}
              height={24}
              alt="back arrow"
            />
          </button>
          <h2 className="font-medium leading-Sosh22 text-SoshColorGrey700">
            Connect to Instagram
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col items-center h-full">
        <div className="sosh__linear-gradient w-96 mb-14 rounded-3xl flex flex-col items-center gap-[72px] justify-start px-12 py-8">
          <h2 className="font-bold leading-Sosh22 text-sm text-white">
            Connect to Instagram
          </h2>
          <Image
            className="w-auto"
            priority
            src={"/instagramBig.svg"}
            alt="Follow us on Instagram"
            width={40}
            height={40}
          />
          <h2 className="font-bold text-sm text-center text-white leading-Sosh22">
            Connect your instagram account with SST for better experience!
          </h2>
          <button
            className="w-full font-bold text-sm leading-Sosh22 text-white"
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
        <button
          className="w-96 leading-Sosh22 text-sm text-SoSHColorPrimary rounded-2xl p-4 mb-6 border border-SoshColorGrey300"
          onClick={() => router.push("/post/newuser/publishpost")}
        >
          Skip
        </button>
      </div>
    </div>
  );
}

export default App;
