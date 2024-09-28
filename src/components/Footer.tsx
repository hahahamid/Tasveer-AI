'use client'
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; 

export default function Footer() {
  const pathname = usePathname(); 

  if (pathname !== "/") {
    return null; 
  }

  return (
    <div className="fixed bottom-0 w-full h-[30px] bg-black/30 border-b border-white/30 p-3 flex justify-center items-center z-50 px-5 poppins-regular text-sm gap-x-2">
      Built with ❤️ by{" "}
      <span className="-ml-1 flex items-center cursor-pointer hover:text-blue-500">
        <Link href={"https://github.com/hahahamid/"} target="_blank">
          Hamid
        </Link>
      </span>
      <span className="border-l-2 border-white pl-2 cursor-pointer hover:text-blue-500">
        <Link href={"https://linkedin.com/in/hahahamid/"} target="_blank">
          <LinkedInLogoIcon />
        </Link>
      </span>
    </div>
  );
}
