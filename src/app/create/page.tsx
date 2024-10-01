"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import real from "@/images/real.jpg";
import dark from "@/images/five.jpg";
import stan from "@/images/standard.jpg";
import anime from "@/images/anime.jpg";
import threeD from "@/images/3D.png";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ShuffleIcon } from "@radix-ui/react-icons";
import { prompts } from "@/utils/prompts";
import { BorderBeam } from "@/components/ui/border-beam";

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt must be at least 7 characters long!" }),
});

export default function Page() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [selectedStyle, setSelectedStyle] = useState("flux");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const { setValue } = form;
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
    setValue("prompt", randomPrompt);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const payload = {
        ...values,
        style: selectedStyle,
      };

      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status === 200) {
        setOutputImg(data.url);
      } else {
        toast({
          variant: "destructive",
          description: "You are unauthorized! Please login to generate images.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (outputImg && outputRef.current) {
      if (window.innerWidth <= 768) {
        outputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [outputImg]);

  return (
    <div className="w-full p-3 min-h-dvh h-full flex justify-start items-center pt-[72px] flex-col">
      <div className="w-full p-5 lg:mb-5 text-center lg:text-left flex flex-col md:flex-row md:justify-between">
        <div>
          <h1 className="text-white text-4xl poppins-semibold">CREATE</h1>
          <p className="text-white/60 poppins-regular">
            Generate Stunning Images from Text for FREE
          </p>
        </div>

        {isLoggedIn ? (
          <Link href={"/profile"}>
            <Button className="poppins-semibold mt-5 md:mt-0">
              Check Your Creations
            </Button>
          </Link>
        ) : (
          <Button
            className="poppins-semibold mt-5 md:mt-0"
            onClick={() =>
              toast({
                variant: "destructive",
                description: "Please log in to check your creations.",
              })
            }
          >
            Check Your Creations
          </Button>
        )}
      </div>

      <div className="flex w-full lg:px-5 gap-3 h-full lg:h-[calc(100dvh-200px)] md:flex-row flex-col">
        <div className="__form flex-[1.5] h-full gap-2 flex items-center lg:items-start flex-col">
          <p className="w-full text-left text-sm text-white/80 poppins-regular">
            Type your prompt below to create any image you can imagine!
          </p>

          <div className="flex gap-2 w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex gap-2"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="w-full max-w-full lg:max-w-[70%]">
                      <FormControl>
                        <Input
                          placeholder="A cat sitting over a sofa..."
                          className="w-full transition-all border-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  loading={loading}
                  type="submit"
                  className={`${loading ? "gap-x-2" : ""} poppins-semibold`}
                >
                  {loading ? "Generating..." : "Generate"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex justify-center items-center gap-x-3 mt-5">
            <Button
              className="poppins-semibold flex gap-x-2"
              onClick={handleRandomPrompt}
              type="button"
            >
              <ShuffleIcon /> Random Prompt
            </Button>
          </div>
          <div className="poppins-semibold uppercase pt-5 text-lg">
            Select Style
          </div>
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-5 lg:mr-10 text-center">
            {[
              { style: "Standard", imgSrc: stan, model: "flux" },
              { style: "Anime", imgSrc: anime, model: "flux-anime" },
              { style: "Dark", imgSrc: dark, model: "any-dark" },
              { style: "Realistic", imgSrc: real, model: "turbo" },
              { style: "3D", imgSrc: threeD, model: "flux-3d" },
            ].map(({ style, imgSrc, model }) => (
              <div key={style} className="flex flex-col poppins-regular">
                <div
                  className={`relative h-auto w-auto border rounded-xl p-4 cursor-pointer ${
                    selectedStyle === model ? "border-white border-2" : ""
                  }`}
                  onClick={() => setSelectedStyle(model)}
                >
                  {" "}
                  <Image
                    src={imgSrc}
                    alt={`${style} image`}
                    className="rounded-lg w-60 h-60 object-cover"
                  />
                  {selectedStyle !== model && (
                    <BorderBeam size={250} duration={10} delay={9} />
                  )}
                </div>
                <span className="my-1.5 ">{style}</span>
              </div>
            ))}
          </div>

          <div className="lg:hidden flex gap-x-5 flex-nowrap w-screen overflow-x-auto overflow-y-hidden text-center px-5">
            {[
              { style: "Standard AI", imgSrc: stan, model: "flux" },
              { style: "Anime", imgSrc: anime, model: "flux-anime" },
              { style: "Dark", imgSrc: dark, model: "any-dark" },
              { style: "Realistic", imgSrc: real, model: "turbo" },
              { style: "3D", imgSrc: threeD, model: "flux-3d" },
            ].map(({ style, imgSrc, model }) => (
              <div
                key={style}
                className="flex-shrink-0 w-72 flex flex-col poppins-regular"
              >
                <div
                  className={`relative h-auto w-full border rounded-xl p-4 cursor-pointer ${
                    selectedStyle === model ? "border-white border-2" : ""
                  }`}
                  onClick={() => setSelectedStyle(model)}
                >
                  <Image
                    src={imgSrc}
                    alt={`${style} image`}
                    className="rounded-lg w-full h-60 object-cover"
                  />
                  {selectedStyle !== model && (
                    <BorderBeam size={250} duration={10} delay={9} />
                  )}
                </div>
                <span className="my-1.5">{style}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={outputRef}
          className="__output min-h-[300px] lg:min-h-full lg:h-full flex-[1] rounded-lg relative overflow-hidden my-2 lg:my-0"
        >
          {outputImg ? (
            <Image
              alt="output"
              className="w-full h-full object-contain"
              src={outputImg}
              width={1024}
              height={1024}
            />
          ) : (
            <div className="w-full min-h-[300px] bg-white/5 h-full flex justify-center items-center text-white/70 text-center p-3 poppins-regular">
              Enter your prompt and hit generate!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
