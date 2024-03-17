"use client";

import React from "react";
import Image from "next/image";
import { VerificationLevel, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import type { VerifyReply } from "../../../api/(auth)/worldcoinverify/verify";
import { usePrivy } from "@privy-io/react-auth";

import { useRouter } from "next/navigation";
import { axios } from "@/lib";

function App(): JSX.Element {
  const { user } = usePrivy();
  const router = useRouter();

  const handleSubmit = async () => {};

  const onSuccess = (result: ISuccessResult) => {
		// This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
		window.alert("Successfully verified with World ID! Your nullifier hash is: " + result.nullifier_hash);
	};

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:\n", JSON.stringify(result));

    const reqBody = {
      userId: user?.id,
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      verification_level: result.verification_level,
      action: process.env.NEXT_PUBLIC_WLD_ACTION,
      signal: "",
    };

    try {
      const response = await axios.post("/api/worldcoin/verify", reqBody);
      console.log("Successful response from backend:\n", response.data);
      router.push("/account") 
    } catch (error) {
      console.error("Error verifying Worldcoin ID:\n", error);
    }
  };
  return (
    <div className="h-screen flex w-full bg-SoshBackground fixed top-0 justify-start flex-col items-center">
      <div className="w-full flex-col flex items-center justify-center">
        <div className="mb-10 mt-8">
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
          Verify with Worldcoin
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col items-center h-full">
        <div className="sosh__linear-gradient w-96 mb-14 rounded-3xl flex flex-col items-center gap-[72px] justify-start px-12 py-8">
          <h2 className="font-bold leading-Sosh22 text-sm text-white">
          Verify with Worldcoin
          </h2>
          <Image
            className="w-auto"
            priority
            src={"/wc-logo.png"}
            alt="Follow us on Instagram"
            width={200}
            height={200}
          />
          <h2 className="font-bold text-sm text-center text-white leading-Sosh22">
          Connect your Worldcoin account to trade with $WLD
          </h2>
          <IDKitWidget
					action={process.env.NEXT_PUBLIC_WLD_ACTION!}
					app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`}
					onSuccess={onSuccess}
					handleVerify={handleProof}
					verification_level={VerificationLevel.Orb} // Change this to VerificationLevel.Device to accept Orb- and Device-verified users
				>
					{({ open }) =>
						<button className="w-full font-bold text-sm leading-Sosh22 text-white" onClick={open}>
							Proceed
						</button>
					}
				</IDKitWidget>
          {/* <button
            className="w-full font-bold text-sm leading-Sosh22 text-white"
            onClick={handleSubmit}
          >
            Proceed
          </button> */}
        </div>
        <button
          className="w-96 leading-Sosh22 text-sm text-SoshColorGrey400 rounded-2xl p-4 mb-6 border border-SoshColorGrey300"
          onClick={() =>       router.push("/account")        }
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}

export default App;
