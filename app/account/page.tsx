"use client";

import React, { useState } from "react";
import Image from "next/image";

import Overview from "./component/Overview";
import Asset from "./component/Asset";
import { useRouter } from "next/navigation";

function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [showFollowModal, setShowFollowModal] = useState(false);

  const router = useRouter();

  return (
    <div>
      <div className="relative pl-9 flex flex-col sosh__linear-gradient mb-11 w-full">
        <div className="flex mb-3 w-full items-center">
          <Image
            alt=""
            src={"/smilingFace.svg"}
            width={72}
            height={72}
            className="w-20 mr-8"
          />
          <div
            onClick={() => setShowFollowModal(true)}
            className="flex flex-col text-white items-center mr-5"
          >
            <div className="text-sm font-bold">20</div>
            <div className="text-sm">Following</div>
          </div>

          <div
            onClick={() => setShowFollowModal(true)}
            className="flex flex-col text-white items-center mr-10"
          >
            <div className="text-sm font-bold">30</div>
            <div className="text-sm">Followers</div>
          </div>

          <button onClick={() => router.push("/account/setting")}>
            <Image
              alt="settings"
              src={"/settingIcon.svg"}
              width={40}
              height={40}
            />
          </button>
        </div>

        <div className="text-white font-bold leading-Sosh22 mb-4">@john254</div>

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
      <div className="flex justify-between w-full items-start px-16 mb-6">
        <button
          onClick={() => setActiveTab("Overview")}
          className={`px-8 py-2 text-xs font-[425] leading-5 ${
            activeTab === "Overview"
              ? " sosh__linear-gradient text-white "
              : " border border-SoSHColorDisabled bg-white text-SoshColorGrey500 "
          }rounded-lg`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("Asset")}
          className={`px-8 py-2 text-xs font-[425] leading-5 ${
            activeTab === "Asset"
              ? " sosh__linear-gradient text-white "
              : " border border-SoSHColorDisabled bg-white text-SoshColorGrey500 "
          }rounded-lg`}
        >
          Asset
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

      {activeTab === "Overview" && <Overview />}
      {activeTab === "Asset" && <Asset />}
    </div>
  );
}

export default App;
