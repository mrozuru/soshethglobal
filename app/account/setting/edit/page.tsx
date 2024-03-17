"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

function App(): JSX.Element {
  const [file, setFile] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [userDetail, setUserDetail] = useState<string>("");

  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  }

  return (
    <div className="flex justify-center h-screen flex-col items-center">
      <div className="w-full flex-col flex items-center justify-center">
        <div className="mb-16 mt-8 font-[425]">
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
            Change Profile
          </h2>
        </div>

        <div className=" relative w-28 h-28 mb-20 rounded-3x">
          <Image
            priority={true}
            className="object-cover h-full rounded-2xl overflow-hidden"
            src={previewUrl || "/ProfilePic.svg"}
            width={120}
            height={120}
            alt="uploaded picture"
          />
          <label className="absolute z-20 -bottom-[5px] rounded-3xl -right-[6px] cursor-pointer">
            <Image
              priority={true}
              src="/edit.svg"
              width={36}
              height={36}
              alt="upload image"
              className="bg-cover rounded-3xl"
            />
            <input
              className="hidden"
              accept="image/*"
              type="file"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 h-full px-[25px] w-full rounded-t-3xl">
        <input
          className="border-SoSHColorDisabled bg-[#F9F9F9] w-full py-4 px-8 rounded-3xl text-sm font-medium leading-Sosh22 border"
          placeholder="@johndoes"
          type="text"
          id="fname"
          name="fname"
          onChange={(event) => setUsername(event.target.value)}
        />

        <textarea
          className="border-SoSHColorDisabled w-full bg-[#F9F9F9] pt-4 pb-16 px-8 rounded-3xl text-sm font-medium leading-Sosh22 border"
          placeholder="Hi I am Kitty, I love cats!"
          onChange={(event) => setUserDetail(event.target.value)}
        />

        <button
          className={`w-full p-4 font-[425] text-sm leading-Sosh22 rounded-2xl ${
            username.length > 0 || userDetail.length > 0
              ? "sosh__linear-gradient text-white"
              : "bg-SoSHColorDisabled text-black"
          }`}
          disabled={username.length > 0 || userDetail.length > 0 ? false : true}
          onClick={() => router.push("/account/setting")}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
