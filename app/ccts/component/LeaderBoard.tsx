"use client";

import Loading from "@/app/loading";
import FacePile from "@/components/FacePile";
import { axios } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface data {
  comments: string[];
  createdAt: string;
  ipfs: string[];
  story: string;
  updatedAt: string;
  url: string[];
  userId: string;
  _id: string;
}

const LeaderBoard = () => {
  const [option, setOption] = useState<string>("Buy");
  const [cctAmount, setCctAmount] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showHoldersModal, setShowHoldersModal] = useState<boolean>(false);
  const [data, setData] = useState<data[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/leaderBoard")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDecreaseCCTs = () => {
    if (cctAmount === 0) {
      return;
    }
    setCctAmount((prev) => prev - 1);
  };

  const handleShowModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setShowModal(true);
    e.stopPropagation();
  };

  const router = useRouter();

  const faces = [
    { id: 1, name: "John", imgUrl: "/exampleUser1.svg" },
    { id: 2, name: "Alice", imgUrl: "/exampleUser2.svg" },
    { id: 3, name: "Bob", imgUrl: "/exampleUser3.svg" },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        data &&
        data.map((detail, idx) => {
          return (
            <div key={idx} className="w-96 m-auto flex flex-col gap-4">
              <div className="flex w-full justify-between">
                <div
                  style={{ backgroundImage: `url(${detail.url[0]})` }}
                  className="px-3 text-white h-[83px] flex items-center bg-cover rounded-xl"
                >
                  #{idx + 1}
                </div>
                <div
                  style={{ backgroundImage: `url(${detail.url[0]})` }}
                  className="p-4 rounded-xl flex gap-2 bg-cover"
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => setShowHoldersModal(true)}
                      className="w-14 pl-4"
                    >
                      <FacePile faces={faces} width={32} height={32} />
                    </button>
                  </div>
                  <div
                    onClick={() => router.push(`/ccts/viewpost/${detail._id}`)}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="text-white font-bold text-lg leading-Sosh22">
                        $20
                      </div>
                      <div className="w-28 h-[1px] bg-white"></div>
                      <button
                        onClick={(e) => handleShowModal(e)}
                        className="px-2 rounded-xl bg-white py-[2px] text-sm font-bold text-SoSHColorPrimary"
                      >
                        Trade
                      </button>
                    </div>
                    <div className="flex text-sm text-white items-center gap-4">
                      <div className="flex gap-1 leading-Sosh22">
                        <div>67</div>
                        <Image
                          alt=""
                          src={"/users.svg"}
                          width={18}
                          height={18}
                        />
                      </div>
                      <div>117 minted</div>
                      <div className="flex gap-1 leading-Sosh22">
                        <div>2M</div>
                        <Image
                          alt=""
                          src={"/barChart.svg"}
                          width={18}
                          height={18}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showHoldersModal && (
                <div className="fixed inset-0 z-[200] bg-gray-600 bg-opacity-10 overflow-y-auto h-full w-full flex items-center justify-center">
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
                          Holders
                        </div>
                        <button onClick={() => setShowHoldersModal(false)}>
                          <Image
                            alt="close icon"
                            src={"/closeIcon.svg"}
                            width={24}
                            height={24}
                            className="h-auto"
                          />
                        </button>
                      </div>

                      <div
                        className="flex justify-between px-4"
                        onClick={() => router.push("account/otherAccount")}
                      >
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
                          Holding 1 CCTs
                        </div>
                      </div>

                      <div
                        className="flex justify-between px-4"
                        onClick={() => router.push("account/otherAccount")}
                      >
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
                          Holding 1 CCTs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showModal && (
                <div
                  className={
                    "fixed inset-0 z-[101] bg-gray-600 bg-opacity-15 overflow-y-auto h-full w-full flex items-center justify-center"
                  }
                >
                  <div className="py-8 px-2 w-96 border rounded-3xl sosh__linear-gradient3">
                    <div className="flex flex-col">
                      <div className="flex justify-end px-8">
                        <button onClick={() => setShowModal(false)}>
                          <Image
                            alt="close icon"
                            src={"/closeIcon.svg"}
                            width={24}
                            height={24}
                            className="h-auto"
                          />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="shadow mb-4 w-full relative inline-flex rounded-2xl bg-white cursor-pointer select-none items-center font-bold text-sm">
                          <div
                            className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-medium ${
                              option === "Buy"
                                ? "text-white sosh__linear-gradient"
                                : "text-body-color"
                            }`}
                            onClick={() => setOption("Buy")}
                          >
                            Buy
                          </div>
                          <div
                            onClick={() => setOption("Sell")}
                            className={`flex items-center justify-center w-1/2 rounded-2xl py-3 w-60% text-sm font-medium ${
                              option === "Sell"
                                ? "text-white sosh__linear-gradient"
                                : "text-body-color"
                            }`}
                          >
                            Sell
                          </div>
                        </div>

                        <div className="flex justify-between p-2 mb-4">
                          <div className="flex flex-col gap-8">
                            <div className="text-SoshColorGrey600 leading-5 font-medium">
                              My Balance
                            </div>
                            <div className="flex gap-2 text-SoshColorGrey600 text-2xl leading-5 items-end">
                              $3490
                            </div>
                            <div className="text-SoshColorGrey600 text-sm leading-5 font-medium">
                              My Holdings
                            </div>
                          </div>

                          <div className="flex flex-col gap-8 items-end">
                            <div className="text-SoshColorGrey500 text-sm leading-5">
                              0x27a1...718sgja
                            </div>
                            <div className="text-SoshColorGrey600 text-sm leading-5">
                              Asset ID: UXS123
                            </div>
                            <div className="text-SoshColorGrey600 text-sm leading-5">
                              0
                            </div>
                          </div>
                        </div>

                        <div className="flex rounded-2xl justify-between p-2 mb-4 bg-white bg-opacity-30">
                          <button
                            onClick={handleDecreaseCCTs}
                            className="flex px-4 py-3 rounded-xl bg-white font-bold leading-5 text-sm"
                          >
                            -
                          </button>
                          <div className="flex flex-col justify-center items-center">
                            <span className="text-SoshColorGrey500 text-2xl leading-5 font-bold">
                              {cctAmount}
                            </span>
                            <span className="text-SoshColorGrey500 text-xs text-end leading-rounded-xl">
                              CCT
                            </span>
                          </div>
                          <button
                            onClick={() => setCctAmount((prev) => prev + 1)}
                            className="flex px-4 py-3 rounded-2xl bg-white font-bold leading-5 text-sm"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex justify-between p-2 mb-6">
                          <div className="flex flex-col gap-2">
                            <div className="text-SoshColorGrey600 leading-Sosh22 font-medium">
                              Total Cost
                            </div>
                            <div className="flex gap-4 items-center">
                              <span className="text-SoshColorGrey600 text-2xl leading-Sosh22">
                                $2000
                              </span>
                              <span className="text-SoshColorGrey600 font-medium leading-Sosh22">
                                20 SST
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() =>
                              router.push("/ccts/purchaseCCT/status")
                            }
                            className="w-full font-bold px-16 py-4 sosh__linear-gradient text-white rounded-2xl"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </>
  );
};

export default LeaderBoard;
