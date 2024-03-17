"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Transfer from "@/components/transfer";

function App(): JSX.Element {
  const [amount, setAmount] = useState<string>("");

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
          Stake ETH
        </h2>
      </div>

      <div className="flex flex-col gap-2 w-96 mb-8">
        <div className="text-sm font-normal leading-Sosh22 text-SoshColorGrey700">
          Stake ETH to earn SST
        </div>
        <div className="flex h-14">
          <input
            type="number"
            placeholder="Amount of ETH"
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-8 py-4 border rounded-3xl border-SoshColorGrey300"
          />
        </div>
        <div className="text-sm flex gap-2 font-normal leading-Sosh22 text-SoshColorGrey500">
          <Transfer color="#667085" />
          <div>{parseFloat(amount) || 0} ETH = {amount ? (parseFloat(amount) * 1481.4814814814815).toFixed(3) : 0} SST</div>
        </div>
      </div>

      <div className="w-96">
        <div className="flex flex-col m-auto gap-5">
          <button
            onClick={() => {
              const url = `/account/stakeETH/overview?eth=${amount}`;
              router.push(url);
            }}
            className={`p-4 w-full rounded-2xl font-bold leading-5 text-sm  ${
              amount.length > 0
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
