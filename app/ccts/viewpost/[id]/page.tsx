"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heart from "@/components/heart";
import { useRouter, useParams } from "next/navigation";
import { axios } from "@/lib";
import Loading from "@/app/loading";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { usePrivy } from "@privy-io/react-auth";

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
}

function App(): JSX.Element {
  const [active, setActive] = useState(false);

  const [postLiked, setPostLiked] = useState<boolean | undefined>();
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const param = useParams();

  const [data, setData] = useState<data | undefined>();
  const [isLoading, setLoading] = useState(true);

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex fixed top-0 left-0 z-20 bg-white w-screen justify-center flex-col items-center">
            <div className="mb-8 mt-10 font-[425] ">
              <button className="absolute left-4" onClick={() => router.back()}>
                <Image
                  priority={true}
                  src={"/BackArrowStatus.svg"}
                  width={24}
                  height={24}
                  alt="back arrow"
                  className="h-auto"
                />
              </button>
              <h2 className="font-bold leading-Sosh22">Publish a post</h2>
            </div>
          </div>
          <div className="mt-24 flex flex-col items-center bg-green-900 mb-4">
            <button onClick={() => setShowModal(true)}>
              <Image
                alt="holders"
                src={"/holders.svg"}
                width={84}
                height={60}
                className="fixed left-8 top-32 z-50 h-auto"
              />
            </button>
            <div className="relative w-full">
              <Swiper
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {data &&
                  data.url.map((image, idx) => (
                    <SwiperSlide key={idx}>
                      <Image
                        alt="postImage"
                        src={image}
                        width={200}
                        height={0}
                        className="w-full bg-cover h-auto"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>

              <div className="flex justify-between py-8 px-4 items-center text-white text-sm font-bold bg-black leading-Sosh22">
                <p>1 CCT 20 SST $3490</p>
                <button
                  onClick={() => setPostLiked((prev) => (prev ? !prev : false))}
                >
                  <Heart active={postLiked || false} comment={false} />
                </button>
                <div>
                  <Image
                    alt=""
                    src={"/annotationDots.svg"}
                    width={26}
                    height={26}
                    className="h-auto"
                  />
                </div>
                <div>
                  <Image
                    alt=""
                    src={"/share.svg"}
                    width={26}
                    height={26}
                    className="h-auto"
                  />
                </div>
              </div>

              <div className="flex justify-center py-8 px-5 text-white text-sm font-bold leading-Sosh22">
                Content Certification Token
              </div>
            </div>
          </div>
          <div className="flex gap-2 px-4 ">
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
          <div
            className={
              `${showModal ? "flex " : "hidden "}` +
              "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
            }
          >
            <div className="py-8 px-2 w-360 border shadow-lg rounded-2xl bg-white">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between px-8">
                  <button onClick={() => setShowModal(false)}>
                    <Image
                      alt="close icon"
                      src={"/closeIcon.svg"}
                      width={24}
                      height={24}
                      className="h-auto"
                    />
                  </button>
                  <div>Holders</div>
                  <div>
                    <Image
                      alt="close icon"
                      src={"/closeIcon.svg"}
                      width={24}
                      height={24}
                      className="opacity-0 h-auto"
                    />
                  </div>
                </div>
                <div className="flex justify-between px-4">
                  <div className="flex gap-4 justify-center items-center">
                    <div>
                      <Image
                        alt=""
                        src={"/smilingFace.svg"}
                        width={34}
                        height={34}
                        className="bg-cover h-auto"
                      />
                    </div>
                    <p className="text-sm leading-5">@Jaden001</p>
                  </div>
                  <div className="flex items-center text-sm leading-5">
                    Holding 1 CCTs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
