"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

interface Option {
  label: string;
  image: string;
}

// const options: Option[] = [
//   {
//     label: "Coinbase",
//     image: "/coinbase.svg",
//   },
//   {
//     label: "Metamask",
//     image: "/metamask.svg",
//   },
//   {
//     label: "Binance",
//     image: "/binance.svg",
//   },
//   {
//     label: "Trust",
//     image: "/trust.svg",
//   },
// ];

function App(): JSX.Element {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
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

      {/* <div className="relative w-96 mx-auto mb-8 max-w-md">
        <div className="dropdown">
          <div
            className="dropdown-toggle items-center text-sm font-medium leading-Sosh22 bg-white flex px-8 gap-2 py-4 w-full border rounded-3xl border-SoshColorGrey300"
            onClick={toggleDropdown}
          >
            {selectedOption && (
              <Image
                width={24}
                height={24}
                src={selectedOption.image}
                alt={selectedOption.label}
                className="rounded-full"
              />
            )}
            <span className="dropdown-option-label flex-grow">
              {selectedOption ? (
                selectedOption.label
              ) : (
                <div className="text-sm leading-Sosh22 text-SoshColorGrey500">
                  Select wallet to connect
                </div>
              )}
            </span>
            <Image alt="DOWN" src={"/chevronDown.svg"} width={16} height={16} />
          </div>
          <div
            className={`dropdown-menu ${
              isDropdownOpen ? "visible block" : "invisible hidden"
            } bg-white border p-4 absolute top-1/2 right-14 border-gray-300 rounded shadow-md overflow-y-auto transition duration-200 ease-in-out`}
          >
            {options.map((option, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div
                  onClick={() => selectOption(option)}
                  className="flex items-center cursor-pointer hover:bg-gray-100"
                >
                  <Image
                    width={24}
                    height={24}
                    src={option.image}
                    alt={option.label}
                    className="rounded-full mr-2"
                  />
                  <span className="text-sm font-medium leading-Sosh22 flex-grow">
                    {option.label}
                  </span>
                </div>
                {options.length - 1 !== index && (
                  <div className="w-full h-[1px] mb-4 bg-SoshColorGrey600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="flex flex-col gap-2 w-96 mb-10">
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
        <div className="flex flex-col m-auto gap-2">
          <button
            onClick={() => router.push("/account/stakeETH/sharewallet")}
            className={`p-4 w-full font-bold rounded-2xl leading-5 text-sm  ${
              selectedOption !== null
                ? " text-white sosh__linear-gradient"
                : "text-black bg-SoSHColorDisabled"
            }`}
            disabled={selectedOption == null}
          >
            Connect
          </button>
          {/* <div className="text-center text-SoshColorGrey600 text-sm leading-Sosh22">
            Or
          </div>
          <button
            onClick={() => router.push("/account/stakeETH/sharewallet")}
            className={
              "p-4 w-full font-bold rounded-2xl leading-5 text-sm border border-SoSHColorPrimary"
            }
          >
            Prefer not to say
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
