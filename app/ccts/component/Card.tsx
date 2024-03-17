"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Heart from "@/components/heart";
import { useState } from "react";

import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

interface data {
  data: {
    comments: string[];
    createdAt: string;
    ipfs: string[];
    story: string;
    updatedAt: string;
    url: string[];
    userId: string;
    _id: string;
  }[];
}

const Card = ({ data }: data) => {
  const [option, setOption] = useState<string>("Buy");
  const [like, setLike] = useState<boolean>(false);
  const [cctAmount, setCctAmount] = useState<number>(1);
  const [showPurchase, setShowPurchase] = useState<number>();

  const handleDecreaseCCTs = () => {
    if (cctAmount === 0) {
      return;
    }
    setCctAmount((prev) => prev - 1);
  };

  const router = useRouter();

  return (
    <>
      {data.map((cardDetail, idx) => {
        return (
          <div key={idx}>
            <div className="flex flex-col items-center mx-4 mb-8 rounded-3xl bg-green-900">
              <div
                className={`${
                  showPurchase === idx
                    ? "transition-opacity duration-100 opacity-0 absolute pointer-events-none"
                    : "block w-full overflow-x-hidden"
                }`}
              >
                <div className="relative">
                  <div
                    onClick={() =>
                      router.push(`/ccts/viewpost/${cardDetail._id}`)
                    }
                  >
                    <Swiper
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination, EffectCards]}
                      effect={"cards"}
                      grabCursor={true}
                      className="mySwiper overflow-x-hidden"
                    >
                      {cardDetail &&
                        cardDetail.url.map((image, idx) => (
                          <SwiperSlide
                            className="w-[95%] rounded-3xl"
                            key={idx}
                          >
                            <Image
                              priority={true}
                              src={image}
                              width={400}
                              height={280}
                              alt="Image"
                              className="rounded-3xl justify-center min-h-[280px]"
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>

                  <button>
                    <Image
                      alt="holders"
                      src={"/holders.svg"}
                      width={84}
                      height={60}
                      className="absolute z-50 left-4 top-5"
                    />
                  </button>

                  <div className="absolute w-full bottom-0 filter backdrop-blur-md z-50  rounded-b-3xl bg-gradient-to-b from-transparent via-transparent to-black bg">
                    <div className="flex justify-between py-5 px-4 items-center text-white text-sm font-bold leading-Sosh22">
                      <p className="text-center">1 CCT 20 SST $3490</p>
                      <div className="flex gap-5">
                        <button onClick={() => setLike((prev) => !prev)}>
                          <Heart active={like} comment={false} />
                        </button>
                        <div>
                          <Image
                            alt=""
                            src={"/annotationDots.svg"}
                            width={26}
                            height={26}
                          />
                        </div>
                        <div>
                          <Image
                            alt=""
                            src={"/share.svg"}
                            width={26}
                            height={26}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => setShowPurchase(idx)}
                  className="flex justify-center py-6 px-5 text-white text-sm font-bold leading-5"
                >
                  Content Certification Token
                </div>
              </div>

              <div
                className={`${
                  showPurchase === idx
                    ? "transition-opacity duration-100 opacity-100"
                    : "transition-opacity duration-100 opacity-0 absolute pointer-events-none"
                } + w-full`}
              >
                <div className="p-4">
                  <div className="shadow mb-4 w-full relative inline-flex rounded-2xl cursor-pointer select-none items-center font-bold text-sm bg-SoSHColorDisabled">
                    <div
                      className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-bold ${
                        option === "Buy"
                          ? "text-primary bg-white"
                          : "text-body-color"
                      }`}
                      onClick={() => setOption("Buy")}
                    >
                      Buy
                    </div>
                    <div
                      onClick={() => setOption("Sell")}
                      className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-bold ${
                        option === "Sell"
                          ? "text-primary bg-white"
                          : "text-body-color"
                      }`}
                    >
                      Sell
                    </div>
                  </div>

                  <div className="flex justify-between p-2 mb-6">
                    <div className="flex flex-col gap-3">
                      <div className="text-white text-sm leading-5 font-bold">
                        My Balance
                      </div>
                      <div className="flex gap-2 items-end">
                        <span className="text-white text-2xl leading-5 font-bold">
                          $3490
                        </span>
                        <span className="text-white text-[10px] font-bold text-end leading-[14px]">
                          20 SST
                        </span>
                      </div>
                      <div className="text-white text-sm leading-5 font-bold">
                        My Holdings 0
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-white text-sm leading-5">
                        0x27a1...718sgja
                      </div>
                      <div className="text-white text-sm leading-5">
                        Asset ID: UXS123
                      </div>
                    </div>
                  </div>

                  <div className="flex rounded-[14px] justify-between p-2 mb-3 bg-white bg-opacity-10">
                    <button
                      onClick={handleDecreaseCCTs}
                      className="flex px-4 py-3 rounded-[14px] bg-white font-bold leading-5 text-sm"
                    >
                      -
                    </button>
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-white text-2xl leading-5 font-bold">
                        {cctAmount}
                      </span>
                      <span className="text-white text-[10px] font-bold text-end leading-[14px]">
                        CCT
                      </span>
                    </div>
                    <button
                      onClick={() => setCctAmount((prev) => prev + 1)}
                      className="flex px-4 py-3 rounded-2xl bg-white font-bold leading-5 text-sm"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-between p-2 mb-6">
                    <div className="flex flex-col gap-3">
                      <div className="text-white text-sm leading-5 font-bold">
                        Total Cost
                      </div>
                      <div className="flex gap-2 items-end">
                        <span className="text-white text-2xl leading-5 font-bold">
                          $0
                        </span>
                        <span className="text-white text-[10px] font-bold text-end leading-[14px]">
                          0 SST
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => router.push("/ccts/purchaseCCT")}
                      className="w-full font-bold px-16 py-4 bg-green-200 text-gray-800 rounded-2xl hover:bg-gray-400 transition duration-300 ease-in-out"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
