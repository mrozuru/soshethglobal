"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function App(): JSX.Element {
  const router = useRouter();

  return (
    <div className="h-full flex justify-start flex-col items-center">
      <div className="mb-10 mt-10 font-[425]">
        <button className="absolute left-4" onClick={() => router.back()}>
          <Image
            priority={true}
            src={"/BackArrowStatus.svg"}
            width={24}
            height={24}
            alt="back arrow"
          />
        </button>
        <h2 className="text-SoshColorGrey700 leading-Sosh22">
          Transcation History
        </h2>
      </div>
      <div
        onClick={() => router.push("/account/transaction/detail")}
        className="flex border-b border-SoshColorGrey600 text-SoshColorGrey600 leading-Sosh22 w-full px-8 py-2 justify-between"
      >
        <div className="font-medium">Sell Certi</div>
        <div className="text-sm text-SoshColorGrey500 flex flex-col items-end">
          <div>+4000 SST</div>
          <div>2023 / 10 / 10</div>
        </div>
      </div>
    </div>
  );
}

export default App;
