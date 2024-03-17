"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Trending from "./component/Trending";
import Top from "./component/Top";
import Latest from "./component/Latest";

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("Trending");

  return (
    <div className="mt-8">
      <div className="flex w-96 px-8 py-4 gap-2 mb-8 flex-shrink-0 rounded-3xl m-auto border border-gray-300 bg-white">
        <Image alt="search" src={"/search.svg"} width={16} height={16} />
        <input
          type="text"
          id="input"
          placeholder="Search Asset ID"
          className="w-full outline-none border-none  text-sm leading-5 text-SoshColorGrey500 placeholder:text-sm placeholder:leading-5 placeholder:text-SoshColorGrey500 focus:bg-white"
        />
      </div>
      <div className="flex mb-8 justify-center gap-8 text-xs leading-4 text-center">
        <button
          className={
            activeTab === "Latest"
              ? "text-SoSHColorPrimary"
              : "text-SoshColorGrey400"
          }
          onClick={(e) => setActiveTab("Latest")}
        >
          Latest
        </button>
        <button
          className={
            activeTab === "Trending"
              ? "text-SoSHColorPrimary"
              : "text-SoshColorGrey400"
          }
          onClick={(e) => setActiveTab("Trending")}
        >
          Trending
        </button>
        <button
          className={
            activeTab === "Top"
              ? "text-SoSHColorPrimary"
              : "text-SoshColorGrey400"
          }
          onClick={(e) => setActiveTab("Top")}
        >
          Top
        </button>
      </div>
      {activeTab === "Trending" && <Trending />}
      {activeTab === "Top" && <Top />}
      {activeTab === "Latest" && <Latest />}
    </div>
  );
}

export default App;
