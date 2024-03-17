"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Transfer from "@/components/transfer";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { parseEther } from 'viem'

import { usePrivy } from "@privy-io/react-auth";

import { useAccount, useContractWrite } from 'wagmi';
import SSTABI from '../../../../contracts/SST.json'; 

const contractAddress = '0x593600A2531869C4a493AB62065336AcD843849E';


function App(): JSX.Element {
  const { user, ready, authenticated } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams()
  const eth = searchParams.get('eth');
  const ethAmount = eth ? parseFloat(eth) : 0;
  const [sstAmount, setSstAmount] = useState(0);
  const [privyAddress, setPrivyAddress] = useState<string | null>(null);

  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { write: writeContract, isLoading: isMintLoading, isSuccess: isMintSuccess, isError: errorMint } = useContractWrite({
    address: contractAddress,
    abi: SSTABI,
    functionName: 'mintWithGasTap',
  });

  const MINT_PRICE_PER_TOKEN = 675000000000000; // 0.000675 ETH in wei
  const GAS_FEE_PERCENTAGE = 2; // 2%

  // Calculate the number of SST tokens for a given amount of ETH
  const calculateSST = (eth: number) => {
    return (eth * 10 ** 18) / MINT_PRICE_PER_TOKEN;
  };

  // Calculate the gas fee based on the percentage
  const calculateGasFee = (eth: number) => {
    return eth * (GAS_FEE_PERCENTAGE / 100);
  };

  // Update the SST amount when the ETH amount changes
  useEffect(() => {
    const sst = calculateSST(ethAmount);
    setSstAmount(sst);
  }, [ethAmount]);

  useEffect(() => {
    console.log(user, ready, authenticated);
    if (ready && authenticated && user) {
      setPrivyAddress(user.wallet?.address ?? null); // If address is undefined, set privyAddress to null
    }
  }, [user, ready, authenticated]);

  useEffect(() => {
    if (isMintSuccess) {
      router.push(`/account/stakeETH/stakeStatus?sst=${sstAmount}`);
    }
  }, [isMintSuccess, router, sstAmount]);

  const handleMint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() 
    if (!address) {
      try {
        await open(); // Open the Web3Modal to connect wallet
      } catch (error) {
        console.error("Failed to open Web3Modal:", error);
      }
    } else {
      try {
        console.log(contractAddress, SSTABI, ethAmount, privyAddress, parseEther(sstAmount.toString()), parseEther((ethAmount + ethAmount * GAS_FEE_PERCENTAGE / 100).toString()))
        await writeContract({
          args: [parseEther(sstAmount.toString()), privyAddress],
          value: parseEther((ethAmount + ethAmount * GAS_FEE_PERCENTAGE / 100).toString())
        });
      } catch (error) {
        console.error("Failed to execute contract write:", error);
      }
    }
  };
  
  return (
    <div className="h-full flex justify-start flex-col items-center">
      <div className="my-8">
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
          Stake ETH
        </h2>
      </div>

      <div className="flex flex-col py-8 gap-8 rounded-2xl min-w-96 sosh__linear-gradient items-center justify-center mb-8 p-4">
        <Image
          className="w-auto"
          priority
          src={"/ETH.svg"}
          alt="Blast"
          width={64}
          height={64}
        />

        <div className="flex gap-2 text-2xl leading-Sosh22 font-bold text-white">
        {ethAmount} ETH
        </div>
        <div className="flex items-center gap-2 leading-Sosh22 font-bold text-white">
          <Transfer color="white" />

          <p>{sstAmount.toFixed(0)} SST</p>
        </div>
      </div>

      <div className="flex min-w-96 flex-col mb-11 bg-white py-4 px-8 gap-2 items-start rounded-2xl sosh__background border border-SoshColorGrey300">
      <div className="flex justify-between w-full text-SoshColorGrey600">
        <div className="leading-Sosh22 text-black">Amount Total</div>
        <div className="text-xs text-black leading-Sosh22 ">{ethAmount} ETH</div>
      </div>
      <div className="flex justify-between w-full text-SoshColorGrey600">
        <div className="leading-Sosh22 text-black">Gas for Trading</div>
        <div className="text-xs text-black leading-Sosh22">{calculateGasFee(ethAmount).toFixed(3)} ETH</div>
      </div>
      <div className="flex justify-between w-full text-SoshColorGrey600">
        <div className="leading-Sosh22 text-black">Total Cost</div>
        <div className="text-xs text-black leading-Sosh22">
          {(ethAmount + calculateGasFee(ethAmount)).toFixed(3)} ETH | {sstAmount.toFixed(0)} SST
        </div>
      </div>
      </div>


      <div className="flex flex-col gap-2 w-96 mb-10">
        <div className="flex items-center px-8 text-sm font-medium leading-Sosh22 bg-white gap-2 py-4 w-full border rounded-3xl border-SoshColorGrey300 select-none">
          <Image
            width={24}
            height={24}
            alt="Blast"
            src={"/base-logo-in-blue.svg"}
          />
          <div className="flex flex-row justify-between w-80">
            <div>Base Network</div>
            <div className="text-green-500">{address ? 'Connected' : ''}</div>
          </div>
        </div>
      </div>

      <div className="w-96">
      <form onSubmit={handleMint}>
        <div className="flex flex-col m-auto gap-2">
          <button
            type="submit"
            className={`p-4 w-full rounded-2xl leading-5 text-sm text-white sosh__linear-gradient m-auto`}
          >
            {isMintLoading ? 'Minting...' : (address ? 'Confirm' : 'Connect Wallet')}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default App;
