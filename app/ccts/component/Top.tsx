"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Top = () => {
  const pathname = usePathname();

  const currentUrl = pathname.split("/")[1];

  const [active, setActive] = useState<string>(currentUrl);

  const { push } = useRouter();

  const handleChange = (section: string) => {
    setActive(section);
    push(`/${section}`);
  };

  return <div>Top</div>;
};

export default Top;
