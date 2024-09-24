"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { MagicWandIcon, ShuffleIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt must be atleast 7 characters long!" }),
});

export default function Page() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/anime", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.status === 200) {
        setOutputImg(data.url);
      } else {
        toast({
          variant: "destructive",
          description: "You are unauthorized! Please login to generate images",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full p-3 min-h-dvh h-full flex justify-start items-center pt-[72px] flex-col">
      <div className="w-full p-3 lg:mb-5 text-center lg:text-left">
        <h1 className="text-white text-4xl poppins-semibold">CREATE ANIME</h1>
        <p className="text-white/60 poppins-regular">
          Generate Stunning Anime Images from Text for FREE
        </p>
      </div>

      <div className="flex w-full lg:px-5 gap-3 h-full lg:h-[calc(100dvh-200px)] md:flex-row flex-col">
        <div className="__form flex-[2] h-full gap-2 flex items-center lg:items-start flex-col">
          <div className="flex justify-center items-center gap-x-3  mb-5 lg:mb-[10%] mt-5 lg:mt-10">
            <Link href={"/create"}>
              <Button className="poppins-semibold">Generate Images</Button>
            </Link>
            <Link href={"/profile"}>
              <Button className="poppins-semibold">check your creations</Button>
            </Link>
          </div>
          <p className="w-full text-left text-sm text-white/80">
            Type your prompt below to create your anime image!
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
                          placeholder="a cat sitting over a sofa..."
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
            <Button className="poppins-semibold flex gap-x-2">
              <ShuffleIcon /> Random Prompt
            </Button>
            <Button className="poppins-semibold flex gap-x-2">
              <MagicWandIcon className="font-bold" /> Surprise Me
            </Button>
          </div>
        </div>
        <div className="__output min-h-[300px] lg:min-h-full lg:h-full flex-[1] rounded-lg relative overflow-hidden my-2 lg:my-0">
          {outputImg ? (
            <Image
              alt="output"
              className="w-full h-full object-contain"
              src={outputImg}
              width={1024}
              height={1024}
            />
          ) : (
            <>
              <div className="w-full min-h-[300px] bg-white/5 h-full flex justify-center items-center text-white/70 text-center p-3">
                Enter your prompt and hit generate!
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
