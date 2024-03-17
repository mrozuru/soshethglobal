"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Heart from "@/components/heart";
import { useEffect, useState } from "react";

import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import FacePile from "@/components/FacePile";

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
  const [cctAmount, setCctAmount] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postLiked, setPostLiked] = useState<boolean | undefined>();
  const [showHoldersModal, setShowHoldersModal] = useState<boolean>(false);

  const faces = [
    { id: 1, name: "John", imgUrl: "/exampleUser1.svg" },
    { id: 2, name: "Alice", imgUrl: "/exampleUser2.svg" },
    { id: 3, name: "Bob", imgUrl: "/exampleUser3.svg" },
  ];

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
            <div className="flex flex-col items-center mx-4 mb-8 rounded-3xl sosh__linear-gradient">
              <div className="block relative w-full overflow-x-hidden">
                <div>
                  <div>
                    <div className="absolute top-0 left-0 w-full flex justify-between px-4 py-5 z-50 h-auto">
                      <button onClick={() => setShowHoldersModal(true)}>
                        <FacePile faces={faces} width={60} height={60} />
                      </button>
                      <div className="flex gap-4">
                        <Image
                          alt="share"
                          src={"/share.svg"}
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                      className="mySwiper rounded-3xl"
                    >
                      {cardDetail &&
                        cardDetail.url.map((image, idx) => (
                          <SwiperSlide key={idx}>
                            <Image
                              priority={true}
                              src={image}
                              width={400}
                              height={400}
                              alt="Images"
                              className="rounded-3xl min-h-72"
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="absolute bg-transparent pointer-events-none z-50 gap-4 bottom-0 w-full flex justify-between py-4 px-4 items-center text-white text-sm leading-Sosh22">
                      <p className="text-base">1 Certi | $3490 </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              setPostLiked((prev) =>
                                prev !== undefined ? !prev : false
                              )
                            }
                          >
                            <Heart
                              active={postLiked || false}
                              comment={false}
                            />
                          </button>
                          <p>90</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <Image
                            alt=""
                            src={"/annotationDots.svg"}
                            width={26}
                            height={26}
                            className="h-auto"
                          />
                          <p>910</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Image
                            alt=""
                            src={"/barChart.svg"}
                            width={26}
                            height={26}
                            className="h-auto"
                          />
                          <p>2M</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setShowModal(true)}
                  className="flex justify-center py-4 px-5 text-white text-sm font-bold leading-5"
                >
                  Trade To Earn
                </div>
              </div>
            </div>

            {showModal && (
              <div
                className={
                  "fixed inset-0 z-[71] bg-gray-600 bg-opacity-15 overflow-y-auto h-full w-full flex items-center justify-center"
                }
              >
                <div className="py-8 px-2 w-96 border rounded-3xl sosh__linear-gradient3">
                  <div className="flex flex-col">
                    <div className="flex justify-end px-8">
                      <button onClick={() => setShowModal(false)}>
                        <Image
                          alt="close icon"
                          src={"/closeIcon.svg"}
                          width={24}
                          height={24}
                          className="h-auto"
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="shadow mb-4 w-full relative inline-flex rounded-2xl bg-white cursor-pointer select-none items-center font-bold text-sm">
                        <div
                          className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-medium ${
                            option === "Buy"
                              ? "text-white sosh__linear-gradient"
                              : "text-body-color"
                          }`}
                          onClick={() => setOption("Buy")}
                        >
                          Buy
                        </div>
                        <div
                          onClick={() => setOption("Sell")}
                          className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-medium ${
                            option === "Sell"
                              ? "text-white sosh__linear-gradient"
                              : "text-body-color"
                          }`}
                        >
                          Sell
                        </div>
                      </div>

                      <div className="flex justify-between p-2 mb-4">
                        <div className="flex flex-col gap-8">
                          <div className="text-SoshColorGrey600 leading-5 font-medium">
                            My Balance
                          </div>
                          <div className="flex gap-2 text-SoshColorGrey600 text-2xl leading-5 items-end">
                            $3490
                          </div>
                          <div className="text-SoshColorGrey600 text-sm leading-5 font-medium">
                            My Holdings
                          </div>
                        </div>

                        <div className="flex flex-col gap-8 items-end">
                          <div className="text-SoshColorGrey500 text-sm leading-5">
                            0x27a1...718sgja
                          </div>
                          <div className="text-SoshColorGrey600 text-sm leading-5">
                            Asset ID: UXS123
                          </div>
                          <div className="text-SoshColorGrey600 text-sm leading-5">
                            0
                          </div>
                        </div>
                      </div>

                      <div className="flex rounded-2xl justify-between p-2 mb-4 bg-white bg-opacity-30">
                        <button
                          onClick={handleDecreaseCCTs}
                          className="flex px-4 py-3 rounded-xl bg-white font-bold leading-5 text-sm"
                        >
                          -
                        </button>
                        <div className="flex flex-col justify-center items-center">
                          <span className="text-SoshColorGrey500 text-2xl leading-5 font-bold">
                            {cctAmount}
                          </span>
                          <span className="text-SoshColorGrey500 text-xs text-end leading-rounded-xl">
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
                        <div className="flex flex-col gap-2">
                          <div className="text-SoshColorGrey600 leading-Sosh22 font-medium">
                            Total Cost
                          </div>
                          <div className="flex gap-4 items-center">
                            <span className="text-SoshColorGrey600 text-2xl leading-Sosh22">
                              $2000
                            </span>
                            <span className="text-SoshColorGrey600 font-medium leading-Sosh22">
                              20 SST
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={() => router.push("/account/assetstatus")}
                          className="w-full font-bold px-16 py-4 sosh__linear-gradient text-white rounded-2xl"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showHoldersModal && (
              <div className="fixed inset-0 z-[105] bg-gray-600 bg-opacity-10 overflow-y-auto h-full w-full flex items-center justify-center">
                <div className="py-8 px-2 w-360 border shadow-lg rounded-2xl bg-white">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between px-8">
                      <Image
                        alt="close icon"
                        src={"/closeIcon.svg"}
                        width={24}
                        height={24}
                        className="opacity-0 h-auto"
                      />
                      <div className="text-SoshColorGrey700 font-medium leading-Sosh22">
                        Holders
                      </div>
                      <button onClick={() => setShowHoldersModal(false)}>
                        <Image
                          alt="close icon"
                          src={"/closeIcon.svg"}
                          width={24}
                          height={24}
                          className="h-auto"
                        />
                      </button>
                    </div>

                    <div
                      className="flex justify-between px-4"
                      onClick={() => router.push("account/otherAccount")}
                    >
                      <div className="flex gap-4 justify-center text-SoshColorGrey700 items-center">
                        <div>
                          <Image
                            alt=""
                            src={"/exampleUser1.svg"}
                            width={34}
                            height={34}
                            className="bg-cover h-auto"
                          />
                        </div>
                        <p className="text-sm leading-5">@Kevin001</p>
                      </div>
                      <div className="flex items-center text-sm leading-5">
                        Holding 1 CCTs
                      </div>
                    </div>
                    <div
                      className="flex justify-between px-4"
                      onClick={() => router.push("account/otherAccount")}
                    >
                      <div className="flex gap-4 justify-center items-center">
                        <div>
                          <Image
                            alt=""
                            src={"/exampleUser2.svg"}
                            width={34}
                            height={34}
                            className="bg-cover h-auto"
                          />
                        </div>
                        <p className="text-sm leading-5 text-SoshColorGrey700">
                          @Alan001
                        </p>
                      </div>
                      <div className="flex items-center text-SoshColorGrey700 text-sm leading-5">
                        Holding 1 CCTs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Card;
