"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Created from "../component/Created";
import Holding from "../component/Holding";

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("Created");
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div>
      <div className="relative px-8 pt-9 flex flex-col sosh__linear-gradient mb-4 w-full">
        <button className="mb-3" onClick={() => router.back()}>
          <Image
            priority={true}
            src={"/BackArrowStatus.svg"}
            width={24}
            height={24}
            alt="back arrow"
          />
        </button>

        <div className="flex mb-3 w-full items-center justify-between">
          <Image alt="" src={"/profilePic.svg"} width={72} height={72} />

          <div
            onClick={() => setShowFollowModal(true)}
            className="flex flex-col text-white items-center"
          >
            <div className="text-sm font-bold">20</div>
            <div className="text-sm">Following</div>
          </div>

          <div
            onClick={() => setShowFollowModal(true)}
            className="flex flex-col text-white items-center"
          >
            <div className="text-sm font-bold">30</div>
            <div className="text-sm">Followers</div>
          </div>

          <button
            className="px-4 py-2 bg-white text-SoshOrange text-xs leading-Sosh22 rounded-lg"
            onClick={() => setIsFollowing((prev) => !prev)}
          >
            {isFollowing ? "Following" : "Follw"}
          </button>
        </div>

        <div className="text-white font-bold leading-Sosh22 mb-4">
          @Kevin254
        </div>

        <div className="flex gap-4 mb-4">
          <Image alt="" src={"/x.svg"} width={20} height={20} />
          <Image alt="" src={"/instagram.svg"} width={20} height={20} />
          <Image alt="" src={"/telegram.svg"} width={20} height={20} />
        </div>

        <div className="text-xs leading-Sosh22 max-w-80 text-white mb-5">
          Hi everyone, I&rsquo;m John, a software engineer who loves life and is
          full of curiosity
        </div>
      </div>
      <div className="flex justify-between w-full items-start px-10 mb-6">
        <button
          onClick={() => setActiveTab("Created")}
          className={`px-8 py-2 text-xs font-[425] leading-5 ${
            activeTab === "Created"
              ? " sosh__linear-gradient text-white "
              : " border border-SoSHColorDisabled bg-white text-SoshColorGrey500 "
          }rounded-lg`}
        >
          Created
        </button>
        <button
          onClick={() => setActiveTab("Holding")}
          className={`px-8 py-2 text-xs font-[425] leading-5 ${
            activeTab === "Holding"
              ? " sosh__linear-gradient text-white "
              : " border border-SoSHColorDisabled bg-white text-SoshColorGrey500 "
          }rounded-lg`}
        >
          Holding
        </button>
      </div>

      {showFollowModal && (
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
                  Follow
                </div>
                <button onClick={() => setShowFollowModal(false)}>
                  <Image
                    alt="close icon"
                    src={"/closeIcon.svg"}
                    width={24}
                    height={24}
                    className="h-auto"
                  />
                </button>
              </div>
              <div className="flex justify-between px-4">
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
                  Followers
                </div>
              </div>
              <div className="flex justify-between px-4">
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
                  Followers
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Created" && <Created />}
      {activeTab === "Holding" && <Holding />}
    </div>
  );
}

export default App;
