"use client";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import one from "@/images/one.png";
import two from "@/images/two.jpg";
import three from "@/images/three.jpg";
import four from "@/images/four.jpg";
import five from "@/images/five.jpg";
import six from "@/images/six.png";
import seven from "@/images/seven.png";
import eight from "@/images/eight.jpg";
import nine from "@/images/nine.jpg";
import ten from "@/images/ten.png";
import { useIsMobile } from "@/lib/isMobile";

export default function Home() {
  const images = [ten, one, eight, two, seven, five, four, six, three, nine];
  const duplicatedImages = [...images, ...images];

  const isMobile = useIsMobile(768);

  const animationDuration = isMobile ? 30 : 40;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const totalWidth = carouselRef.current.scrollWidth;
        const width = totalWidth / 2;
        setCarouselWidth(width);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {/* Animated Title */}
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

          {/* Animated Subtitle (Desktop) */}
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

          {/* Animated Subtitle (Mobile) */}
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

          {/* Animated Button and Recent Creations */}
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
            className="w-full flex flex-col items-center"
          >
            {/* Start Creating Button */}
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

            {/* Infinite Scrolling Carousel */}
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
              transition={{ duration: 0.35, delay: 0.85 }}
              className="flex flex-col justify-center items-center mt-10 lg:mt-20 w-full"
            >
              {/* Section Title */}
              <div className="poppins-semibold text-xl mb-4">
                Recent Creations
              </div>

              {/* Carousel Container */}
              <div className="overflow-hidden w-[97%] md:w-full">
                <motion.div
                  className="flex flex-nowrap space-x-5 lg:space-x-10"
                  ref={carouselRef}
                  animate={{ x: -carouselWidth }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: animationDuration,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedImages.map((src, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Image
                        src={src}
                        alt={`carousel-image-${index + 1}`}
                        className="h-72 w-60 object-contain"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
