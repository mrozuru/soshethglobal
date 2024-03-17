"use client";

import Loading from "@/app/loading";
import FacePile from "@/components/FacePile";
import { axios } from "@/lib";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useContractRead } from 'wagmi';
import SSTABI from '../../../contracts/SST.json'; 
import CertiABI from '../../../contracts/Certi.json'; 
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useWallets, usePrivy } from "@privy-io/react-auth";


const SSTContractAddress = '0x62FAD8c5ff4A29e91De109C6A64C03aA9b2860F3'; 
const CertiContractAddress = '0xd44687D397aaFdEc583bd6218820713Bfa10c59c';

interface data {
  comments: string[];
  createdAt: string;
  ipfs: string[];
  story: string;
  updatedAt: string;
  url: string[];
  userId: string;
  _id: string;
  assetId: number;
}

const LeaderBoard = () => {
  const [option, setOption] = useState<string>("Buy");
  const [cctAmount, setCctAmount] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showHoldersModal, setShowHoldersModal] = useState<boolean>(false);
  const [data, setData] = useState<data[]>([]);
  // const [isLoading, setLoading] = useState(true);

  const [sstBalance, setSSTBalance] = useState('');
  const [cctBalance, setCCTBalance] = useState('');
  const { user, authenticated } = usePrivy();
  const { ready, wallets } = useWallets();
  const [embeddedWalletPirvy, setEmbeddedWalletPirvy] = useState<any>(null);
  const [privyAddress, setPrivyAddress] = useState<string>('null');
  const [amount, setAmount] = useState(BigNumber.from(ethers.utils.parseUnits('1', 'ether')));
  const [currentAssetId, setCurrentAssetId] = useState(0);
  const [formattedBuyPrice, setFormattedBuyPrice] = useState('Calculating...');

  const { data: buyPriceData } = useContractRead({
    address: CertiContractAddress,
    abi: CertiABI,
    functionName: 'getBuyPriceAfterFee',
    args: [currentAssetId, amount],
    watch: true
  });
  
  const { data: sellPriceData } = useContractRead({
    address: CertiContractAddress,
    abi: CertiABI,
    functionName: 'getSellPriceAfterFee',
    args: [currentAssetId, amount],
    watch: true
  });

  const { data: sstBalanceData } = useContractRead({
    address: SSTContractAddress, 
    abi: SSTABI,
    functionName: 'balanceOf',
    args: [privyAddress],
    watch: true, 
  });

  const { data: cctBalanceData } = useContractRead({
    address: CertiContractAddress, 
    abi: CertiABI,
    functionName: 'balanceOf',
    args: [privyAddress, currentAssetId],
    watch: true, 
  });
  

  useEffect(() => {
    if (authenticated && user && wallets.length > 0 && ready) {
      // Assuming the embedded wallet's address matches user.wallet?.address
      const embeddedWallet = wallets.find(wallet => wallet.address === user.wallet?.address);
      if (embeddedWallet) {
        setEmbeddedWalletPirvy(embeddedWallet);
        setPrivyAddress(embeddedWallet.address ?? ''); 
      }
    }
  }, [wallets, user, authenticated, ready]);

  useEffect(() => {
    if (option === "Buy" && buyPriceData) {
      setFormattedBuyPrice(numberWithCommas(parseFloat(formatUnits(buyPriceData as BigNumber, 18)).toString()));
    } else if (sellPriceData) {
      setFormattedBuyPrice(numberWithCommas(parseFloat(formatUnits(sellPriceData as BigNumber, 18)).toString()));
    }
  }, [buyPriceData, sellPriceData, option]);
  
  useEffect(() => {
    if (sstBalanceData) {
      setSSTBalance(numberWithCommas(parseFloat(formatUnits(sstBalanceData as BigNumber, 18)).toFixed(0).toString()));
    }
  }, [sstBalanceData]);

  useEffect(() => {
    if (cctBalanceData) {
      setCCTBalance(numberWithCommas(parseFloat(formatUnits(cctBalanceData as BigNumber, 18)).toFixed(0).toString()));
    }
  }, [cctBalanceData]);
  
  function numberWithCommas(x: String) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formatAccountAddress = (address: string): string => {
    return address.length > 0 ? `${address.slice(0, 5)}...${address.slice(-3)}` : address;
  }

  useEffect(() => {
    axios
      .get("/leaderBoard")
      .then((response) => {
        setData(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDecreaseCCTs = () => {
    if (cctAmount > 1) { 
      setCctAmount((prev) => prev - 1);
      setAmount(amount.sub(ethers.utils.parseUnits('1', 'ether')));
    }
  };

  const handleIncreaseCCTs = () => {
    setCctAmount((prev) => prev + 1);
    setAmount(amount.add(ethers.utils.parseUnits('1', 'ether')));
  };
  
  const handleShowModal = (assetId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setCurrentAssetId(assetId); 
    setShowModal(true);
    e.stopPropagation();
  };

  const handleBuyAsset = async () => {
    if (!embeddedWalletPirvy || parseInt(amount.toString()) <= 0) return;

    if (option === "Buy" && buyPriceData) {
      const embeddedProvider = await embeddedWalletPirvy.getEthereumProvider();
      const ethersProvider = new ethers.providers.Web3Provider(embeddedProvider);
      const signer = ethersProvider.getSigner();
      const certiContract = new ethers.Contract(CertiContractAddress, CertiABI, signer);
      const sstContract = new ethers.Contract(SSTContractAddress, SSTABI, signer);
    
      try {
        const approveTx = await sstContract.approve(CertiContractAddress, buyPriceData);
        await approveTx.wait();

        const buyTx = await certiContract.buy(currentAssetId, cctAmount);
        await buyTx.wait();
    
        console.log("Asset purchased successfully!");
        router.push("ccts/purchaseCCT/status?type=purchase");

      } catch (error) {
        console.error("An error occurred during the purchase:", error);
      }
    } else if (option === "Sell" && sellPriceData) {
      const embeddedProvider = await embeddedWalletPirvy.getEthereumProvider();
      const ethersProvider = new ethers.providers.Web3Provider(embeddedProvider);
      const signer = ethersProvider.getSigner();
      const certiContract = new ethers.Contract(CertiContractAddress, CertiABI, signer);
      const sstContract = new ethers.Contract(SSTContractAddress, SSTABI, signer);
    
      try {
        const approveTx = await sstContract.approve(CertiContractAddress, buyPriceData);
        await approveTx.wait();

        const buyTx = await certiContract.sell(currentAssetId, cctAmount);
        await buyTx.wait();
    
        console.log("Asset purchased successfully!");
        router.push("ccts/purchaseCCT/status?type=sell");

      } catch (error) {
        console.error("An error occurred during the purchase:", error);
      }
    }
  
    
  };

  const router = useRouter();

  const faces = [
    { id: 1, name: "John", imgUrl: "/exampleUser1.svg" },
    { id: 2, name: "Alice", imgUrl: "/exampleUser2.svg" },
    { id: 3, name: "Bob", imgUrl: "/exampleUser3.svg" },
  ];

  return (
    <>
      {/* {isLoading ? ( */}
        {/* <Loading /> */}
      {/* ) : ( */}
      {
        data &&
        data.map((detail, idx) => {
          return (
            <div key={idx} className="w-96 m-auto flex flex-col gap-6 mb-4 ">
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
                      onClick={(e) => handleShowModal(detail.assetId, e)} // Pass the assetId of the current detail
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
                             {sstBalance} SST
                            </div>
                            <div className="text-SoshColorGrey600 text-sm leading-5 font-medium">
                              My Holdings
                            </div>
                          </div>

                          <div className="flex flex-col gap-8 items-end">
                            <div className="text-SoshColorGrey500 text-sm leading-5">
                              {formatAccountAddress(privyAddress)}
                            </div>
                            <div className="text-SoshColorGrey600 text-sm leading-5">
                              Asset ID: {detail.assetId.toString()}
                            </div>
                            <div className="text-SoshColorGrey600 text-sm leading-5">
                            {cctBalance} CCT
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
                            onClick={handleIncreaseCCTs}
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
                              {/* <span className="text-SoshColorGrey600 text-2xl leading-Sosh22">
                                $2000
                              </span> */}
                              <span className="text-SoshColorGrey600 font-medium leading-Sosh22">
                                {formattedBuyPrice} SST
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={handleBuyAsset}
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
      }
    </>
  );
};

export default LeaderBoard;
