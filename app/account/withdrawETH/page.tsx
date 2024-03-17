"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Transfer from "@/components/transfer";

function App(): JSX.Element {
  const [amount, setAmount] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState("");

  const router = useRouter();

  return (
    <div className="h-full flex justify-start flex-col items-center">
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
          Withdraw ETH
        </h2>
      </div>

      <div className="flex flex-col gap-2 w-96 mb-4">
        <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
          Withdraw staked ETH
        </div>
        <div className="flex h-14">
          <input
            type="number"
            placeholder="Amount of ETH"
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 text-sm font-medium px-8 py-4 border rounded-3xl border-SoshColorGrey300"
          />
        </div>
        <div className="text-sm flex gap-2 font-normal leading-Sosh22 text-SoshColorGrey500">
          <Transfer color="#667085" />
          <div>0.1 ETH = 2000 SST</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-96 mb-4">
        <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
          Wallet Address
        </div>
        <div className="flex items-center px-8 text-sm font-medium leading-Sosh22 bg-white gap-2 py-4 w-full border rounded-3xl border-SoshColorGrey300 select-none">
          <Image width={24} height={24} alt="scan" src={"/scan.svg"} />
          <input
            type="text"
            placeholder="ETH Address"
            onChange={(e) => setWalletAddress(e.target.value)}
            className="flex-1 text-sm font-medium focus:outline-none"
          />
        </div>
        <div className="text-sm flex gap-2 font-normal leading-Sosh22 text-SoshColorGrey500">
          <Transfer color="#667085" />
          <div>0.1 ETH = 2000 SST</div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-96 mb-10">
        <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
          Wallet Network
        </div>
        <div className="flex items-center px-8 text-sm font-medium leading-Sosh22 bg-white gap-2 py-4 w-full border rounded-3xl border-SoshColorGrey300 select-none">
          <Image
            width={24}
            height={24}
            alt="Blast"
            src={"/BlastNetworkIcon.svg"}
          />
          Base Network
        </div>
      </div>

      <div className="w-96">
        <div className="flex flex-col m-auto gap-5">
          <button
            onClick={() => router.push("/account/withdrawETH/overview")}
            className={`p-4 w-full rounded-2xl font-bold leading-5 text-sm  ${
              amount.length > 0 && walletAddress.length > 0
                ? " text-white sosh__linear-gradient"
                : "text-black bg-SoSHColorDisabled"
            }`}
            disabled={amount.length === 0}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
