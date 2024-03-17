"use client";

import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

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

      <div className="flex min-w-96 flex-col bg-white mb-8 pb-4 pt-8 px-8 gap-4 items-start rounded-2xl border border-SoshColorGrey300">
        <div className="leading-Sosh22 text-2xl flex justify-between w-full">
          <div className="flex justify-start gap-4 items-start">
            <Image
              alt="blast"
              src={"/BlastNetworkIcon.svg"}
              width={24}
              height={24}
              className="pt-1"
            />
            <div>1 CCT</div>
          </div>
          <div>=</div>
          <div className="flex flex-col gap-4 items-end">
            <div>200 SST</div>
            <div className="text-sm leading-Sosh22">200 USD</div>
          </div>
        </div>
      </div>

      <div className="flex min-w-96 flex-col bg-white mb-16 px-8 py-4 gap-4 items-start rounded-2xl sosh__background border border-SoshColorGrey300">
        <div className="leading-Sosh22 text-sm font-medium flex justify-between w-full">
          <div>Wallet Balance</div>
          <div className="flex flex-col items-end gap-4">
            <div>0x3asax...21hx1</div>
            <div className="text-SoshColorGrey700"> 2,140 SST | $2,140</div>
          </div>
        </div>
      </div>

      <button
        className="p-4 w-96 max-w-96 rounded-2xl font-bold leading-Sosh22 sosh__linear-gradient text-white"
        onClick={() => router.push("/post/users/confirmCCT/purchaseCCT")}
      >
        Confirm
      </button>
    </div>
  );
}

export default App;
