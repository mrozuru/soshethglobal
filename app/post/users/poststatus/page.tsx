"use client";

import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

function App(): JSX.Element {
  const router = useRouter();

  return (
    <div className="h-full flex justify-start flex-col items-center">
      <div className="mb-8 mt-10 font-[425]">
        <button className="absolute left-4" onClick={() => router.back()}>
          <Image
            priority={true}
            src={"/BackArrowStatus.svg"}
            width={24}
            height={24}
            alt="back arrow"
          />
        </button>
        <h2 className="font-[425%] leading-Sosh22">Publish post</h2>
      </div>

      <div>
        <Image
          priority={true}
          src={"/success.svg"}
          width={380}
          height={185}
          alt="back arrow"
          className="mb-1"
        />
      </div>

      <div className="mb-4 flex flex-col items-center w-80 px-7">
        <div className="text-SoshColorGreyScale text-2xl leading-Sosh22 mb-4">
          Success
        </div>
        <div className="text-SoshColorGreyScale text-sm font-normal leading-Sosh22 text-center">
          Your post has published. Share your post and start to earn now.
        </div>
      </div>

      <div className="w-96">
        <div className="flex flex-col m-auto gap-5">
          <button
            onClick={() => router.push("/account")}
            className={
              "p-4 w-full rounded-2xl font-[425] leading-5 text-sm bg-green-500 text-white"
            }
          >
            Check your post
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
