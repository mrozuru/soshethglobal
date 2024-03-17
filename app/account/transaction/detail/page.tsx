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
      <div className="flex flex-col gap-4 py-4 text-sm text-SoshColorGrey700 leading-Sosh22 w-full px-8 justify-between">
        <div className="flex w-full gap-2 flex-col items-center">
          <Image
            priority={true}
            src={"/check.svg"}
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

        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              From
            </div>
            <div className="text-sm text-SoshColorGrey600">0xreu83...0382</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              To
            </div>
            <div className="text-sm text-SoshColorGrey600">0xreu83...0382</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Network
            </div>
            <div className="text-sm text-SoshColorGrey600">Blast</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Transaction hash
            </div>
            <div className="text-sm text-SoshColorGrey600">0xreu83...0382</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Submitted
            </div>
            <div className="text-sm text-SoshColorGrey600">
              Oct 26, 2024, 10:33 PM
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Completed
            </div>
            <div className="text-sm text-SoshColorGrey600">
              Oct 26, 2024, 10:33 PM
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Amount
            </div>
            <div className="text-sm text-SoshColorGrey600">
              0.21 ETH = 300 USD
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Network Fee
            </div>
            <div className="text-sm text-SoshColorGrey600">
              0.013 ETH = 23 USD
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Total Fee
            </div>
            <div className="text-sm text-SoshColorGrey600">
              0.223 ETH = 323 USD
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="text-sm font-medium leading-Sosh22 text-SoshColorGrey700">
              Type
            </div>
            <div className="text-sm text-SoshColorGrey600">Stake</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
