"use client";

import { usePrivy } from "@privy-io/react-auth";
import React, { useState, ChangeEvent, useEffect } from "react";
import ReactPlayer from "react-player";

import Image from "next/image";
import { uploadPost } from "./action";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { usePostData } from '@/context/PostDataContext';

import "swiper/css";
import "swiper/css/pagination";

function App(): JSX.Element {
  const { ready, authenticated, user } = usePrivy();

  const { push } = useRouter();

  const [userStory, setUserStory] = useState<string | undefined>();

  const [files, setFiles] = useState<File[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [showWarningModal, setShowWarningModal] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string[] | null | undefined>(
    null
  );

  const [previewType, setPreviewType] = useState<string | null>(null);
  const { setPostData } = usePostData();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const filesArray = e.target.files;
    if (!filesArray) {
      return;
    }
    const selectedFiles = Array.from(filesArray);
    if (selectedFiles.length > 9) {
      alert("You can only upload up to 9 photos.");
    } else {
      setFiles(selectedFiles);
      const url = selectedFiles.map((a) => {
        setPreviewType(a.type.split("/")[0]);
        return URL.createObjectURL(a)
      });
      console.log(url);
      setPreviewUrl(url);
    }
  };

  const handleClick = async () => {
    if (files.length > 0) {
      const { image, ipfsLink, videoIds } = await uploadPost(files, user!.id);
      const data = { image, ipfsLink, videoIds, userStory, user, files };
      console.log(ipfsLink)
      setPostData(data);
      // if (files[0].type == "video/mp4") {
      //   await axios.post("/uploadPost", {
      //     url: image,
      //     userId: user?.id,
      //     story: userStory,
      //     ipfs: ipfsLink,
      //     views: [],
      //     videoIds: videoIds,
      //   });
      // } else {
      //   await axios.post("/uploadPost", {
      //     url: image,
      //     userId: user?.id,
      //     story: userStory,
      //     ipfs: ipfsLink,
      //     views: [],
      //     videoIds: [],
      //   });
      // }

    }

    push("/post/users/confirmCCT");
  };

  const handleRemoveImage = (index: number) => {
    const newArray = previewUrl?.filter((_, idx) => idx !== index);
    setPreviewUrl(newArray);
    setPreviewType(null);
  };

  useEffect(() => {
    if (ready && !authenticated) {
      push("/");
    }
  }, [authenticated, push, ready]);

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        <div className="mb-4 mt-8 font-medium leading-Sosh22">
          <h2 className="font">Publish a post</h2>
        </div>
        <div
          className={
            `${showWarningModal &&
              (userStory === undefined || userStory.length === 0)
              ? "flex "
              : "hidden "
            }` +
            "absolute px-4 py-[18px] top-9 rounded-2xl bg-white z-50 w-96 gap-2 flex items-start justify-start"
          }
        >
          <Image
            alt="alert"
            src={"/alertTriangle.svg"}
            height={24}
            width={24}
          />
          <div className="text-sm leading-Sosh22">
            You cannot publish blank post
          </div>
        </div>
      </div>

      <div className="flex w-96 justify-between text-xs font-medium leading-Sosh22 items-start m-auto mb-8">
        <button onClick={() => push("/ccts")}>Cancel</button>
        <button
          onClick={
            userStory !== undefined
              ? userStory.length > 0
                ? () => setShowModal(true)
                : () => setShowWarningModal(true)
              : () => setShowWarningModal(true)
          }
          className="px-8 py-2 text-white sosh__linear-gradient rounded-lg"
        >
          Publish
        </button>
      </div>

      <div className="flex m-auto w-96 gap-4 mb-8 items-start justify-center">
        <Image
          priority={true}
          className="object-cover rounded-2xl overflow-hidden"
          src={"/profilePic.svg"}
          width={48}
          height={48}
          alt="uploaded picture"
        />
        <div>
          <textarea
            className="resize-none pt-3 text-sm font-medium leading-Sosh22 min-h-16 w-72 bg-[#f2efe8] outline-none focus:border-none"
            placeholder="Something worth sharing..."
            onChange={(e) => setUserStory(e.target.value)}
          />
        </div>
      </div>

      <div className="pl-8">
        <div className="flex">
          <Swiper
            slidesPerView={previewUrl && previewUrl?.length > 1 ? 1.2 : "auto"}
            spaceBetween={8}
            className="mySwiper z-10"
          >
            {previewUrl &&
              previewUrl.map((preview, idx) => (
                <SwiperSlide key={idx} className="relative">
                  {previewType == "video" &&
                    <ReactPlayer
                      width="300px"
                      height="200px"
                      url={preview || "/ProfilePic.svg"}
                      playing={false}
                      controls={true}
                      // light is usefull incase of dark mode
                      light={false}
                      // picture in picture
                      pip={true}
                    />}
                  {previewType == "image" &&
                    <Image
                      priority={true}
                      className="rounded-lg"
                      src={preview || "/ProfilePic.svg"}
                      width={320}
                      height={192}
                      alt="uploaded picture"
                    />
                  }
                  <button onClick={() => handleRemoveImage(idx)}>
                    <Image
                      priority={true}
                      className="absolute top-4 right-4 rounded-lg"
                      src={"/x-close.svg"}
                      width={24}
                      height={24}
                      alt="uploaded picture"
                    />
                  </button>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div
          className={
            `${showModal ? "flex " : "hidden "}` +
            "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full z-50 w-full flex items-center justify-center"
          }
        >
          <div className="py-8 px-2 w-360 border shadow-lg rounded-2xl bg-white">
            <div className="flex flex-col justify-center items-center gap-8">
              <div className="flex font-medium text-SoshColorGrey700 leading-Sosh22 justify-center px-8">
                <div>Purchase 1 CCT to post</div>
              </div>
              <div className="flex gap-8 justify-center w-full items-start m-auto mb-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-2 text-xs font-bold leading-5 border border-SoSHColorDisabled rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClick}
                  // disabled={disableButton}
                  className="px-8 py-2 text-xs text-white font-bold leading-5 sosh__linear-gradient rounded-lg"
                >
                  Purchase
                </button>
              </div>
            </div>
            <div className="text-xs text-center text-SoshColorGrey500 leading-5 ">
              *Content Certification Token (CCT){" "}
            </div>
          </div>
        </div>
      </div>

      <label className="fixed bottom-0 flex justify-center left-0 py-4 w-screen sosh__linear-gradient">
        <Image
          priority={true}
          src="/camera.svg"
          width={26}
          height={24}
          alt="upload image"
          className="object-cover overflow-hidden"
        />
        <input
          className="hidden"
          accept="image/*,video/*"
          type="file"
          multiple
          max={9}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default App;
