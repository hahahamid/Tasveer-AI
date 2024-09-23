"use client";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import one from "@/images/one.png";
import two from "@/images/two.jpg";
import three from "@/images/three.jpg";
import four from "@/images/four.jpg";
import five from "@/images/five.jpg";

export default function Home() {
  return (
    <>
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="w-full pt-32 flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.35, delay: 0 }}
            className="text-4xl sm:text-6xl font-bold"
          >
            TASVEER AI
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.35, delay: 0.35 }}
            className="hidden md:block mt-2 text-center text-white/60 poppins-regular uppercase"
          >
            Your imagination, visualized with AI — no cost, no limits.
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.35, delay: 0.35 }}
            className="md:hidden mt-2 text-center text-white/60 poppins-regular uppercase text-sm"
          >
            Your imagination, visualized with AI
            <br /> no cost, no limits.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.35, delay: 0.7 }}
          >
            <Link href="/create" className="flex justify-center items-center">
              <HoverBorderGradient
                containerClassName="rounded-full px-3 mt-5"
                as="button"
                className="bg-transparent text-white flex items-center"
              >
                <span className="flex items-center justify-center gap-x-1 text-sm poppins-regular">
                  START CREATING{" "}
                  <ChevronRight size={20} className="-mt-[1px]" />
                </span>
              </HoverBorderGradient>
            </Link>
            {/* <Link href="/create">
            <Button className=" mt-3 font-bold p-5">Start Creating</Button>
          </Link> */}

            <div className="flex flex-col justify-center items-center mt-5 lg:mt-20">
              <div className="poppins-semibold text-xl">Recent Creations</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 lg:gap-x-10">
                <Image
                  src={two}
                  alt="image"
                  className="h-72 w-60 object-contain"
                />
                <Image
                  src={three}
                  alt="image"
                  className="h-72 w-60 object-contain"
                />
                <Image
                  src={four}
                  alt="image"
                  className="h-72 w-60 object-contain"
                />
                <Image
                  src={five}
                  alt="image"
                  className="h-72 w-60 object-contain"
                />
                <Image
                  src={one}
                  alt="image"
                  className="h-72 w-60 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
