"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Transfer from "@/components/transfer";

function App(): JSX.Element {
  const [amount, setAmount] = useState<string>("");

  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="h-full flex justify-start flex-col items-center">
      <div className="mb-8 mt-10">
        <button className="absolute left-4" onClick={() => router.back()}>
          <Image
            priority={true}
            src={"/BackArrowStatus.svg"}
            width={24}
            height={24}
            alt="back arrow"
          />
        </button>
        <h2 className="font-medium leading-Sosh22">Stake ETH</h2>
      </div>

      <div className="flex flex-col gap-4 mb-4 justify-center items-center">
        <Image alt="qr" src={"/qr.svg"} width={243} height={228} />
        <div className="flex gap-2 text-SoshColorGrey500 justify-start items-start leading-Sosh22 max-w-44">
          <Image
            priority={true}
            src={"/alertTriangle.svg"}
            width={24}
            height={24}
            alt="alert triangle"
          />
          ETH Only Address
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <div className="text-sm font-bold leading-Sosh22 text-SoshColorGrey600">
          Stake Address
        </div>
        <div className="px-8 bg-white font-bold text-SoshColorGrey700 py-4 w-96 rounded-2xl leading-5 text-sm border border-SoSHColorPrimary">
          0x2e1dqdasx0ajxsadadsda212
        </div>
      </div>

      <div className="flex min-w-96 flex-col mb-8 py-4 px-8 gap-4 items-start rounded-2xl sosh__linear-gradient2 border border-SoshColorGrey300">
        <div className="flex justify-between w-full">
          <div className="text-base leading-Sosh22 text-SoshColorGrey500">
            Network
          </div>
          <div className="text-xs leading-Sosh22 text-SoshColorGrey600">
            Blast
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-base leading-Sosh22 text-SoshColorGrey500">
            Expire in
          </div>
          <div className="text-xs leading-Sosh22 text-SoshColorGrey600">
            3 hr
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="text-base leading-Sosh22 text-SoshColorGrey500">
            Total Amount
          </div>
          <div className="text-xs leading-Sosh22 text-SoshColorGrey600">
            0.531 ETH
          </div>
        </div>
      </div>

      <div className="w-96">
        <button
          onClick={() => router.push("/account/stakeETH/connectwallet")}
          className={`p-4 w-full font-bold rounded-2xl leading-5 text-sm mb-7 text-white sosh__linear-gradient`}
        >
          Open in Coinbase wallet
        </button>
      </div>
    </div>
  );
}

export default App;
