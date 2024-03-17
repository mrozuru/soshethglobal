"use client";

import { usePathname } from "next/navigation";
import AccountImage from "./AccountImage";
import CCTImage from "./CCTImage";
import PostImage from "./PostImage";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const currentUrl = pathname.split("/")[1];

  const [active, setActive] = useState<string>(currentUrl);

  const { push } = useRouter();

  const handleChange = (section: string) => {
    setActive(section);
    push(`/${section}`);
  };

  return (
    <footer className="fixed z-[70] left-0 bottom-0 w-full flex px-8 py-2 justify-between items-center bg-[#f2efe8] h-[10vh]">
      <button
        className="flex flex-col items-center justify-center gap-1"
        onClick={() => handleChange("ccts")}
      >
        <CCTImage active={active === "ccts"} />
        <p>CCTs</p>
      </button>
      <button
        className="flex flex-col items-center justify-center gap-1"
        onClick={() => handleChange("post/newuser/publishpost")}
      >
        <PostImage active={active === "post"} />
        <p>Post</p>
      </button>
      <button
        className="flex flex-col items-center justify-center gap-1"
        onClick={() => handleChange("account")}
      >
        <AccountImage active={active === "account"} />
        <p>Account</p>
      </button>
    </footer>
  );
};

export default Footer;
