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
          Withdraw ETH
        </h2>
      </div>

      <div className="flex flex-col py-8 gap-8 rounded-2xl min-w-96 sosh__linear-gradient items-center justify-center mb-8 p-4">
        <Image
          className="w-auto"
          priority
          src={"/ETH.svg"}
          alt="Blast"
          width={64}
          height={64}
        />

        <div className="flex gap-2 text-2xl leading-Sosh22 font-bold text-white">
          0.5 ETH
        </div>
        <div className="flex items-center gap-2 leading-Sosh22 font-bold text-white">
          <Transfer color="white" />
          <p>2000 SST</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-96 mb-8">
        <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
          Wallet Address
        </div>
        <div className="flex items-center px-8 text-sm font-medium leading-Sosh22 bg-white gap-2 py-4 w-full border rounded-3xl border-SoshColorGrey300 select-none">
          0x132o3820udsandasodisadsakda813
        </div>
      </div>

      <div className="flex min-w-96 flex-col mb-10 bg-white py-4 px-8 gap-2 items-start rounded-2xl sosh__background border border-SoshColorGrey300">
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Amount Total</div>
          <div className="text-xs text-black leading-Sosh22 ">0.5 ETH</div>
        </div>
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Tax Fee</div>
          <div className="text-xs text-black leading-Sosh22">0.023 ETH</div>
        </div>
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Total Cost</div>
          <div className="text-xs text-black leading-Sosh22">
            0.523 ETH | 9000 SST
          </div>
        </div>
      </div>

      <div className="w-96">
        <div className="flex flex-col m-auto gap-2">
          <button
            onClick={() => router.push("/account/withdrawETH/status")}
            className={`p-4 w-full rounded-2xl font-bold leading-5 text-sm text-white sosh__linear-gradient`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
