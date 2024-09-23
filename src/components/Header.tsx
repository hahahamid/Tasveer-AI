"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Aperture, Loader, LogOut } from "lucide-react";

export default function Header() {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading") {
      setInitialLoading(false);
    }
  }, [status, session]);

  return (
    <div className="fixed top-0 w-full h-[60px] bg-black border-b border-white/30 p-3 flex justify-between items-center z-50 px-5">
      <Link href="/" className="flex items-center gap-x-3">
        <Aperture size={28} />
        <h2 className="font-bold text-xl cursor-pointer poppins-semibold tracking-wider">
          TASVEER AI
        </h2>
      </Link>
      {initialLoading && status === "loading" ? (
        <Loader className="animate-spin" />
      ) : !session ? (
        <div className="__menu">
          <Button onClick={() => signIn("google")}>Login</Button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center items-center">
          <Button
            onClick={() => signOut()}
            className="bg-transparent text-white hover:bg-inherit"
          >
            <LogOut />
          </Button>
          <Link href="/profile">
            <Avatar>
              <AvatarImage src={session.user?.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      )}
    </div>
  );
}
