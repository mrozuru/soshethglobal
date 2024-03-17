"use client";

import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

function App(): JSX.Element {
  const router = useRouter();

  return (
    <div className="h-full flex justify-start flex-col items-center">
      <div className="mt-8 mb-16">
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
          Stake status
        </h2>
      </div>

      <div className="mb-20">
        <Image
          priority={true}
          src={"/success.svg"}
          width={160}
          height={160}
          alt="success image"
        />
      </div>

      <div className="mb-24 flex flex-col items-center w-80 px-7">
        <div className="text-SoshColorGreyScale text-2xl leading-Sosh22 mb-4">
          Success
        </div>
        <div className="text-SoshColorGreyScale text-sm font-normal leading-Sosh22 text-center">
          Your CCT asset purchase is successful. Share your post and start to
          earn now.
        </div>
      </div>

      <button
        className="p-4 w-96 max-w-96 rounded-2xl font-bold leading-Sosh22 sosh__linear-gradient text-white"
        onClick={() => router.push("/account")}
      >
        Check asset
      </button>
    </div>
  );
}

export default App;
