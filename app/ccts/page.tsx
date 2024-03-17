"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Trending from "./component/Trending";
import Top from "./component/Top";
import Latest from "./component/Latest";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import LeaderBoard from "./component/LeaderBoard";

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("LeaderBoard");

  return (
    <div className="mt-8">
      <div className="flex w-96 px-8 py-4 gap-2 mb-8 flex-shrink-0 rounded-3xl m-auto border border-gray-300 bg-white">
        <Image alt="search" src={"/search.svg"} width={16} height={16} />
        <input
          type="text"
          id="input"
          placeholder="Search"
          className="w-full outline-none border-none font-medium text-sm leading-5 text-SoshColorGrey500 placeholder:text-sm placeholder:leading-5 placeholder:text-SoshColorGrey500 focus:bg-white"
        />
      </div>

      <div className="mb-4">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={16}
          centeredSlides={true}
          className="mySwiper z-10 text-center"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            waitForTransition: true,
          }}
          modules={[Autoplay]}
          loop={true}
          loopAddBlankSlides={false}
        >
          <SwiperSlide>
            <Image
              priority={true}
              className="rounded-lg"
              src={"/cctHeader1.svg"}
              width={320}
              height={144}
              alt="CCT Image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              priority={true}
              className="rounded-lg"
              src={"/cctHeader1.svg"}
              width={320}
              height={144}
              alt="CCT Image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              priority={true}
              className="rounded-lg"
              src={"/cctHeader1.svg"}
              width={320}
              height={144}
              alt="CCT Image"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              priority={true}
              className="rounded-lg"
              src={"/cctHeader1.svg"}
              width={320}
              height={144}
              alt="CCT Image"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex justify-center w-full mb-4">
        <button
          onClick={() => setActiveTab("LeaderBoard")}
          className={`rounded-lg w-96 px-4 py-2 text-center font-bold text-xs leading-Sosh22 ${
            activeTab === "LeaderBoard"
              ? "text-white sosh__linear-gradient"
              : "text-SoshColorGrey400 border border-SoshColorGrey400"
          }`}
        >
          Weekly LeaderBoard Pool
        </button>
      </div>

      <div className="flex w-96 m-auto mb-8 justify-center gap-8 text-xs leading-4 text-center">
        <button
          className={`rounded-lg w-[116px] px-4 py-2 text-center font-bold text-xs leading-Sosh22 ${
            activeTab === "Latest"
              ? "text-white sosh__linear-gradient"
              : "text-SoshColorGrey400 border border-SoshColorGrey400"
          }`}
          onClick={(e) => setActiveTab("Latest")}
        >
          Latest
        </button>
        <button
          className={`rounded-lg w-[116px] px-4 py-2 text-center font-bold text-xs leading-Sosh22 ${
            activeTab === "Trending"
              ? "text-white sosh__linear-gradient"
              : "text-SoshColorGrey400 border border-SoshColorGrey400"
          }`}
          onClick={(e) => setActiveTab("Trending")}
        >
          Trending
        </button>
        <button
          className={`rounded-lg w-[116px] px-4 py-2 text-center font-bold text-xs leading-Sosh22 ${
            activeTab === "Top"
              ? "text-white sosh__linear-gradient"
              : "text-SoshColorGrey400 border border-SoshColorGrey400"
          }`}
          onClick={(e) => setActiveTab("Top")}
        >
          Top
        </button>
      </div>
      {activeTab === "Trending" && <Trending />}
      {activeTab === "Top" && <Top />}
      {activeTab === "Latest" && <Latest />}
      {activeTab === "LeaderBoard" && <LeaderBoard />}
    </div>
  );
}

export default App;
