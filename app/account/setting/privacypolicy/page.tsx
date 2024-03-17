"use client";

import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

function App(): JSX.Element {
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-SoshBackground fixed z-[72] text-SoshColorGrey700 top-0 flex justify-start flex-col items-center">
      <div className="mt-8 mb-5">
        <button className="absolute left-4" onClick={() => router.back()}>
          <Image
            priority={true}
            src={"/BackArrowStatus.svg"}
            width={24}
            height={24}
            alt="back arrow"
          />
        </button>
        <h2 className="font-medium leading-Sosh22 text-SoshColorGrey700">
          Privacy Policy
        </h2>
      </div>

      <div className="h-full w-full px-8 py-10 bg-white">
        <div className="flex items-center flex-col gap-4 mb-8">
          <div className="medium-normal leading-Sosh22 text-center">
            SoSHOW Privacy Policy
          </div>
          <div>Last updated on 04/03/2024</div>
        </div>
        <div className="flex flex-col gap-4">
          1. Privacy Policy
          <ul className="list-[lower-alpha] text-sm leading-Sosh22 pl-7">
            <li className="mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur ma
            </li>
            <li className="mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur ma
            </li>
            <li className="mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur ma
            </li>
            <li className="mb-4">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut fugit, sed quia consequuntur ma
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
