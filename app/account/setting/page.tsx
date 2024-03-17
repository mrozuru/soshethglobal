"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

function App(): JSX.Element {
  const router = useRouter();

  const { logout } = usePrivy();

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
          Setting
        </h2>
      </div>

      <div className="px-8 w-full py-4 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="text-sm leading-Sosh22 text-SoshOrange">
            Account Setting
          </div>
          <div
            className="flex justify-between items-center"
            onClick={() => router.push("/account/setting/edit")}
          >
            <div className="flex items-center gap-2">
              <Image
                alt="user square"
                src={"/user-square.svg"}
                width={24}
                height={24}
              />
              <span className="text-sm font-medium text-SoshColorGrey500">
                Profile Edit
              </span>
            </div>
            <Image alt="" src={"/chevron-right.svg"} width={24} height={24} />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Image
                alt="notification box"
                src={"/notification-box.svg"}
                width={24}
                height={24}
              />
              <span className="text-sm font-medium text-SoshColorGrey500">
                Enable Notification
              </span>
            </div>
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`box block h-8 w-14 rounded-full ${
                    isChecked ? "sosh__linear-gradient" : "bg-SoshColorGrey300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                    isChecked ? "translate-x-full" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-sm leading-Sosh22 text-SoshOrange">
            Social Link
          </div>
          <div
            className="flex justify-between items-center"
            onClick={() => router.push("/account/setting/connectX")}
          >
            <div className="flex gap-2 items-center">
              <Image alt="x" src={"/twitterBlack.svg"} width={24} height={24} />
              <span className="text-sm font-medium text-SoshColorGrey500">
                Connect X
              </span>
            </div>
            <Image alt="" src={"/chevron-right.svg"} width={24} height={24} />
          </div>
          <div
            className="flex justify-between items-center"
            onClick={() => router.push("/account/setting/connectinstagram")}
          >
            <div className="flex gap-2 items-center">
              <Image
                alt="instagram"
                src={"/instagramBlack.svg"}
                width={24}
                height={24}
              />
              <span className="text-sm font-medium text-SoshColorGrey500">
                Connect Instagram
              </span>
            </div>
            <Image alt="" src={"/chevron-right.svg"} width={24} height={24} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-sm leading-Sosh22 text-SoshOrange">Other</div>
          <div
            className="flex justify-between items-center"
            onClick={() => router.push("/account/setting/termofservices")}
          >
            <div className="flex gap-2 items-center">
              <Image alt="file" src={"/file.svg"} width={24} height={24} />
              <span className="text-sm font-medium text-SoshColorGrey500">
                Terms of Service
              </span>
            </div>
            <Image alt="" src={"/chevron-right.svg"} width={24} height={24} />
          </div>
          <div
            className="flex justify-between items-center"
            onClick={() => router.push("/account/setting/privacypolicy")}
          >
            <div className="flex gap-2 items-center">
              <Image alt="lock" src={"/lock.svg"} width={24} height={24} />
              <span className="text-sm font-medium text-SoshColorGrey500">
                Privacy Policy
              </span>
            </div>
            <Image alt="" src={"/chevron-right.svg"} width={24} height={24} />
          </div>
        </div>

        <div onClick={logout} className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image alt="logout" src={"/logout.svg"} width={24} height={24} />
            <span className="text-sm font-medium text-SoshColorGrey500">
              Log out
            </span>
          </div>
          <Image alt="" src={"/chevron-right.svg"} width={24} height={24} />
        </div>
      </div>
    </div>
  );
}

export default App;
