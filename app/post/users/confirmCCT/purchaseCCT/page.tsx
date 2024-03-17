"use client";

import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Transfer from "@/components/transfer";

function App(): JSX.Element {
  const router = useRouter();

  return (
    <div className="h-full flex justify-start flex-col items-center">
      <div className="my-8">
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
          Purchase CCT for your post
        </h2>
      </div>

      <div className="flex flex-col py-8 gap-8 rounded-2xl min-w-96 sosh__linear-gradient2 items-center justify-center mb-8 p-4">
        <Image
          className="w-auto"
          priority
          src={"/blastNetworkIconBig.svg"}
          alt="Blast"
          width={64}
          height={64}
        />

        <div className="flex gap-2 text-2xl leading-Sosh22 font-bold text-white">
          1 CCT
        </div>
        <div className="flex items-center gap-2 leading-Sosh22 font-bold text-white">
          <Transfer color="white" />

          <p>2000 Sosh</p>
        </div>
      </div>

      <div className="flex min-w-96 flex-col mb-16 bg-white py-4 px-8 gap-2 items-start rounded-2xl sosh__background border border-SoshColorGrey300">
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Amount Total</div>
          <div className="text-xs text-black leading-Sosh22 ">1 CCT</div>
        </div>
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Tax Fee</div>
          <div className="text-xs text-black leading-Sosh22">
            140 SST | $140{" "}
          </div>
        </div>
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Total Cost</div>
          <div className="text-xs text-black leading-Sosh22">
            2000 SST | $120
          </div>
        </div>
      </div>

      <button
        className="p-4 w-96 text-sm max-w-96 rounded-2xl font-bold leading-Sosh22 sosh__linear-gradient text-white"
        onClick={() => router.push("/post/users/poststatus")}
      >
        Purchase
      </button>
    </div>
  );
}

export default App;
