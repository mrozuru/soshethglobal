"use client";

import Transfer from "@/components/transfer";
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
          Transcation Detail
        </h2>
      </div>
      <div className="flex flex-col border-y gap-4 py-4 border-SoshColorGrey600  text-sm text-SoshColorGrey700 leading-Sosh22 w-full px-8 justify-between">
        <div className="flex w-full gap-2 flex-col items-center">
          <Image
            priority={true}
            src={"/BackArrowStatus.svg"}
            width={24}
            height={24}
            alt="back arrow"
          />
          <div>Complete</div>
          <div>0.233 ETH</div>
          <div className="flex gap-2 items-center">
            <Transfer color="#344054" />
            <div>323 USD</div>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>From</div>
          <div>0xreu83...0382</div>
        </div>
      </div>
    </div>
  );
}

export default App;
