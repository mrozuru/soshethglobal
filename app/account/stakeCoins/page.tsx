"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const StakeCoins = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center my-8">
        <h2 className="font-medium leading-Sosh22 text-SoshColorGrey700">
          Stake Coins
        </h2>      
        <div className="space-y-4 flex flex-col mt-8">
        <button
          onClick={() => router.push('/account/stakeETH')}
          className="px-8 py-2 text-sm leading-Sosh22 text-white rounded-lg sosh__linear-gradient"
        >
          Stake ETH
        </button>
        {/* <button
          onClick={() => router.push('/account/stakeAPE')}
          className="px-8 py-2 text-sm leading-Sosh22 text-white rounded-lg sosh__linear-gradient"
        >
          Stake APE
        </button>
        <button
          onClick={() => router.push('/account/stakeWRLD')}
          className="px-8 py-2 text-sm leading-Sosh22 text-white rounded-lg sosh__linear-gradient"
        >
          Stake WLD
        </button> */}
      </div>
    </div>
  );
};

export default StakeCoins;
