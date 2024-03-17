"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heart from "@/components/heart";
import { useRouter, useParams } from "next/navigation";
import { axios } from "@/lib";
import Loading from "@/app/loading";
import { Pagination } from "swiper/modules";
import VideoPlayer from "@/app/ccts/component/VideoPlayer";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { usePrivy } from "@privy-io/react-auth";
import FacePile from "@/components/FacePile";

interface data {
  comments: string[];
  createdAt: string;
  ipfs: string[];
  story: string;
  updatedAt: string;
  url: string[];
  userId: string;
  likes: string[];
  _id: string;
  views: number;
  videoIds?: string[]; // Add this line
}

function App(): JSX.Element {
  const [active, setActive] = useState(false);
  const [option, setOption] = useState<string>("Buy");
  const [showReportPopUp, setShowReportPopUp] = useState<boolean>(false);
  const [showReportStatus, setShowReportStatus] = useState<boolean>(false);
  const [cctAmount, setCctAmount] = useState<number>(1);
  const [showCCTModal, setShowCCTModal] = useState<boolean>(false);
  const [postLiked, setPostLiked] = useState<boolean | undefined>();
  const [showHoldersModal, setShowHoldersModal] = useState(false);

  const router = useRouter();
  const param = useParams();

  const [data, setData] = useState<data | undefined>();
  const [isLoading, setLoading] = useState(true);

  const faces = [
    { id: 1, name: "John", imgUrl: "/exampleUser1.svg" },
    { id: 2, name: "Alice", imgUrl: "/exampleUser2.svg" },
    { id: 3, name: "Bob", imgUrl: "/exampleUser3.svg" },
  ];

  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (param) {
      axios
        .get(`/getPost`, {
          params: param,
        })
        .then((response) => {
          setData(response.data);
          setPostLiked(response.data.likes.includes(user));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [param]);

  useEffect(() => {
    if (!isLoading) {
      const user = localStorage.getItem("user");
      axios
        .post(
          `/getPost`,
          {
            user: user,
            like: postLiked,
          },
          {
            params: param,
          }
        )
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, postLiked]);

  const handleDecreaseCCTs = () => {
    if (cctAmount === 0) {
      return;
    }
    setCctAmount((prev) => prev - 1);
  };

  const handleReportPost = () => {
    setShowReportPopUp(false);
    setShowReportStatus(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex fixed top-0 left-0 z-30 w-screen justify-center flex-col items-center">
            <div className="mb-8 mt-10 font-[425] ">
              <button className="absolute left-4" onClick={() => router.back()}>
                <Image
                  priority={true}
                  src={"/BackArrowStatus.svg"}
                  width={24}
                  height={24}
                  alt="back arrow"
                />
              </button>
              <h2 className="font-medium leading-Sosh22">View post</h2>
            </div>
          </div>
          <div className="mt-24 flex flex-col items-center sosh__linear-gradient mb-4">
            <div>
              <div className="absolute left-0 w-full flex justify-between px-4 py-5 z-20 h-auto">
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
                  <button onClick={() => setShowReportPopUp(true)}>
                    <Image
                      alt="dots"
                      src={"/dots.svg"}
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper relative w-full h-72"
              >
                {data &&
                  data.url.map((image, idx) => {
                    // useVideo && data.videoIds.length > 0
                    if (useVideo && (data.videoIds?.length ?? 0) > 0) {
                      return (
                        <SwiperSlide key={idx}>
                          <VideoPlayer video_id={data.videoIds} />
                        </SwiperSlide>
                      )
                    } else {
                      return (
                        <SwiperSlide key={idx}>
                          <Image
                            alt="postImage"
                            src={image}
                            width={200}
                            height={0}
                            className="w-full bg-cover h-auto"
                          />
                        </SwiperSlide>
                      )
                    }

                  })}
                <div className="absolute bg-transparent z-10 gap-4 bottom-0 w-full flex justify-between py-4 px-4 items-center text-white text-sm leading-Sosh22">
                  <p className="text-base">1 Certi | $3490 </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setPostLiked((prev) =>
                          prev !== undefined ? !prev : false
                        )
                      }
                    >
                      <Heart active={postLiked || false} comment={false} />
                    </button>
                    <p>90</p>
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
                    </div>
                    <p>2M</p>
                  </div>
                </div>
              </Swiper>
              {/* {if (data.videoIds.length > 0)} */}
              {/* <button
                onClick={() => {
                  console.log("eeeeeeeeeeeee");
                  setUseVideo(true);
                }}
              >
                Play
              </button> */}
              <button
                onClick={() => setShowCCTModal(true)}
                className="flex w-full justify-center py-3 px-4 text-white font-bold leading-Sosh22"
              >
                Trade To Earn
              </button>
            </div>
          </div>
          <div className="flex gap-2 px-4 text-sm leading-Sosh22">
            <div>@cutme</div>
            <div>
              I did a good job today.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do asaeiusmod tempor incididunt ut
              laboresasa!
            </div>
            <div className="w-7">
              <button onClick={() => setActive((prev) => !prev)}>
                <Heart active={active} comment={true} />
              </button>
            </div>
          </div>

          {showHoldersModal && (
            <div className="fixed inset-0 z-[71] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
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

          {showCCTModal && (
            <div
              className={
                "fixed inset-0 z-[71] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
              }
            >
              <div className="py-8 px-2 w-96 border rounded-3xl sosh__linear-gradient3">
                <div className="flex flex-col">
                  <div className="flex justify-end">
                    <button onClick={() => setShowCCTModal(false)}>
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
                        className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-medium ${option === "Buy"
                            ? "text-white sosh__linear-gradient"
                            : "text-body-color"
                          }`}
                        onClick={() => setOption("Buy")}
                      >
                        Buy
                      </div>
                      <div
                        onClick={() => setOption("Sell")}
                        className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-medium ${option === "Sell"
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
                        onClick={() => router.push("/ccts/purchaseCCT/status")}
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

          {showReportPopUp && (
            <div className="fixed bottom-0 z-[71] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-end justify-center">
              <div
                onClick={handleReportPost}
                className="bg-white w-full px-8 pb-10 pt-4 flex justify-between items-center"
              >
                <div className="flex gap-2">
                  <Image alt="flag" src={"/flag.svg"} width={24} height={24} />
                  <span className="text-sm font-medium">Report this post</span>
                </div>
                <Image
                  alt="right arrow"
                  src={"/chevron-right.svg"}
                  width={24}
                  height={24}
                />
              </div>
            </div>
          )}

          {showReportStatus && (
            <div
              className={
                "fixed inset-0 z-[71] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
              }
            >
              <div className="p-8 w-80 border rounded-3xl bg-white">
                <div className="flex flex-col items-center">
                  <div className="flex text-SoshStatusWordColor w-full mb-4 justify-end">
                    <button onClick={() => setShowReportStatus(false)}>
                      <Image
                        alt="close icon"
                        src={"/closeIcon.svg"}
                        width={24}
                        height={24}
                        className="h-auto"
                      />
                    </button>
                  </div>
                  <Image
                    alt="success"
                    src={"/success.svg"}
                    height={160}
                    width={160}
                    className="mb-10"
                  />
                  <div className="text-2xl leading-Sosh22 mb-4">
                    Report Success
                  </div>
                  <div className="text-center text-sm leading-Sosh22">
                    Thank you for protecting our community!
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
