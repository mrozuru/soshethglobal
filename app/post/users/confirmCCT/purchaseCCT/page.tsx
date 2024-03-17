"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Transfer from "@/components/transfer";
import { usePostData } from '@/context/PostDataContext';
import { axios } from "@/lib";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import { ethers } from 'ethers';
import CertiABI from '../../../../../contracts/Certi.json'; 
import SSTABI from '../../../../../contracts/SST.json'; 

const SSTContractAddress = '0x593600A2531869C4a493AB62065336AcD843849E';
const CertiContractAddress = '0x38ad2F92da092442F7657E439Da8e122B5bC3908';

function App(): JSX.Element {
  const router = useRouter();
  const { postData } = usePostData();
  const { ready, wallets } = useWallets();
  const [embeddedWalletPirvy, setEmbeddedWalletPirvy] = useState<any>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const requiredSSTAmount = ethers.utils.parseEther("1.02"); 
  const { user, authenticated } = usePrivy();


  useEffect(() => {
    if (authenticated && user && wallets.length > 0 && ready) {
      // Assuming the embedded wallet's address matches user.wallet?.address
      const embeddedWallet = wallets.find(wallet => wallet.address === user.wallet?.address);
      if (embeddedWallet) {
        setEmbeddedWalletPirvy(embeddedWallet);
      }
    }
  }, [wallets, user, authenticated, ready]);

  const handleApproveAndCreate = async () => {
    if (!embeddedWalletPirvy) return;
    const { image, ipfsLink, videoIds, userStory, user } = postData;
    const embeddedProvider = await embeddedWalletPirvy.getEthereumProvider();

    const ethersProvider = new ethers.providers.Web3Provider(embeddedProvider);
    const signer = ethersProvider.getSigner();

    // Contract instances
    const sstContract = new ethers.Contract(SSTContractAddress, SSTABI, signer);
    const certiContract = new ethers.Contract(CertiContractAddress, CertiABI, signer);

    setIsApproving(true);
    try {
      // Approve the Certi contract to spend the required SST amount
      const approveTx = await sstContract.approve(CertiContractAddress, requiredSSTAmount);
      await approveTx.wait();
      setIsApproving(false);

      setIsCreating(true);
      // Replace "IPFS_ID_HERE" with actual IPFS ID
      console.log(ipfsLink)
      const createTx = await certiContract.create(ipfsLink[0]);
      const receipt = await createTx.wait();

      // Extract assetId from the event logs (Assuming the event signature is known and matches 'Create(uint256,address,string)')
      const eventSignature = "Create(uint256,address,string)";
      const createEvent = receipt.events?.find((event : any) => event.eventSignature === eventSignature);
      const assetId = createEvent?.args?.[0]
      const assetIdBN = ethers.BigNumber.from(assetId).toString();

      // const scaledAssetIdBN = assetIdBN.mul(ethers.constants.WeiPerEther);
      // const scaledAssetIdStr = scaledAssetIdBN.toString();
      const scaledAssetIdInt = parseInt(assetIdBN, 10);

      setIsCreating(false);

      // Handle post-create logic, e.g., navigate to a success page
      console.log("Asset created successfully!", assetId);

      if (postData && postData.image && postData.userStory) {
        try {
          if (postData.files[0].type === "video/mp4") {
            await axios.post("/uploadPost", {
              url: image,
              userId: user?.id,
              story: userStory,
              ipfs: ipfsLink,
              views: [],
              videoIds: videoIds,
              asserId: scaledAssetIdInt
            });
          } else {
            await axios.post("/uploadPost", {
              url: image,
              userId: user?.id,
              story: userStory,
              ipfs: ipfsLink,
              views: [],
              videoIds: [],
              asserId: scaledAssetIdInt
            });
          }
          // Redirect after successful post
          router.push("/post/users/poststatus");
        } catch (error) {
          console.error("Failed to upload post:", error);
          // Handle error (e.g., show error message to user)
        }
      }
    } catch (error) {
      console.error("An error occurred during the transaction:", error);
      setIsApproving(false);
      setIsCreating(false);
    }
  };

  // const handleClick = async () => {
  //   if (postData && postData.image && postData.userStory) {
  //     try {
  //       const { image, ipfsLink, videoIds, userStory, user } = postData;

  //       if (postData.files[0].type === "video/mp4") {
  //         await axios.post("/uploadPost", {
  //           url: image,
  //           userId: user?.id,
  //           story: userStory,
  //           ipfs: ipfsLink,
  //           views: [],
  //           videoIds: videoIds,
  //         });
  //       } else {
  //         await axios.post("/uploadPost", {
  //           url: image,
  //           userId: user?.id,
  //           story: userStory,
  //           ipfs: ipfsLink,
  //           views: [],
  //           videoIds: [],
  //         });
  //       }
  //       // Redirect after successful post
  //       router.push("/post/users/poststatus");
  //     } catch (error) {
  //       console.error("Failed to upload post:", error);
  //       // Handle error (e.g., show error message to user)
  //     }
  //   }
  // };

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
          Purchase CCT for your post
        </h2>
      </div>

      <div className="flex flex-col py-8 gap-8 rounded-2xl min-w-96 sosh__linear-gradient2 items-center justify-center mb-8 p-4">
        <Image
          className="w-auto"
          priority
          src={"/profilePic.svg"}
          alt="Blast"
          width={64}
          height={64}
        />

        <div className="flex gap-2 text-2xl leading-Sosh22 font-bold text-white">
          1 CCT
        </div>
        <div className="flex items-center gap-2 leading-Sosh22 font-bold text-white">
          <Transfer color="white" />

          <p>1 SST</p>
        </div>
      </div>

      <div className="flex min-w-96 flex-col mb-16 bg-white py-4 px-8 gap-2 items-start rounded-2xl sosh__background border border-SoshColorGrey300">
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Amount Total</div>
          <div className="text-xs text-black leading-Sosh22 ">1 SST</div>
        </div>
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Tax Fee</div>
          <div className="text-xs text-black leading-Sosh22">
            0.02 SST | 0.0000135 ETH {" "}
          </div>
        </div>
        <div className="flex justify-between w-full text-SoshColorGrey600">
          <div className="leading-Sosh22 text-black">Total Cost</div>
          <div className="text-xs text-black leading-Sosh22">
            1.02 SST | 0.0006885 ETH
          </div>
        </div>
      </div>

      <button
        className="p-4 w-96 text-sm max-w-96 rounded-2xl font-bold leading-Sosh22 sosh__linear-gradient text-white"
        onClick={handleApproveAndCreate}
      >
        {isApproving ? 'Approving...' : isCreating ? 'Posting...' : 'Purchase'}
      </button>
    </div>
  );
}

export default App;
