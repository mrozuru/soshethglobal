"use client";

import React, { useState } from "react";
import Image from "next/image";

import Overview from "./component/Overview";
import Asset from "./component/Asset";

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("Overview");

  return (
    <div>
      <div
        className="
        before:bg-green-300 before:-z-10 before:-bottom-8 before:w-[100vw] before:h-[40%] before:rounded-[50%] before:absolute
      relative flex bg-green-300 gap-4 flex-col items-center mb-11 justify-center w-full"
      >
        <Image alt="" src={"/smilingFace.svg"} width={104} height={104} />

        <div className="text-white font-bold leading-Sosh22">@john254</div>

        <Image
          alt="settings"
          src={"/settingIcon.svg"}
          width={40}
          height={40}
          className="absolute right-4 top-6"
        />

        <div className="flex gap-7">
          <Image alt="" src={"/x.svg"} width={20} height={20} />

          <Image
            alt=""
            src={"/instagram.svg"}
            width={20}
            height={20}
            className="mt-5"
          />
          <Image alt="" src={"/telegram.svg"} width={20} height={20} />
        </div>
      </div>
      <div className="flex justify-between w-full items-start px-16 mb-6">
        <button
          onClick={() => setActiveTab("Overview")}
          className={`px-8 py-2 text-xs font-[425] leading-5 ${
            activeTab === "Overview"
              ? " bg-green-500 text-white "
              : " border border-SoSHColorDisabled text-black "
          }rounded-lg`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("Asset")}
          className={`px-8 py-2 text-xs font-[425] leading-5 ${
            activeTab === "Asset"
              ? " bg-green-500 text-white "
              : " border border-SoSHColorDisabled text-black "
          }rounded-lg`}
        >
          Asset
        </button>
      </div>

      {activeTab === "Overview" && <Overview />}
      {activeTab === "Asset" && <Asset />}
    </div>
  );
}

export default App;
