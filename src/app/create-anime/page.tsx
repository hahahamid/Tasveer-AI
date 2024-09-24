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
import { useSession } from "next-auth/react";

const formSchema = z.object({
  prompt: z
    .string()
    .min(7, { message: "Prompt must be atleast 7 characters long!" }),
});

const prompts = [
  "A futuristic cityscape at sunset, featuring towering skyscrapers with neon lights, flying cars weaving between buildings, and holographic billboards illuminating the sky.",
  "A serene forest with a cascading waterfall, surrounded by ancient towering trees, vibrant wildflowers, and a crystal-clear pond reflecting the lush greenery.",
  "An astronaut riding a majestic horse across the red sands of Mars, with the planet's rocky terrain stretching into the horizon and Earth visible as a distant blue dot in the sky.",
  "A dragon gracefully flying over a medieval castle perched on a rocky cliff, with banners fluttering in the wind, and a moat shimmering under the moonlight.",
  "A surreal landscape with floating islands connected by ornate bridges, vibrant flora blooming in impossible colors, and waterfalls cascading from one island to another into a misty abyss.",
  "A bustling cyberpunk street market at night, illuminated by colorful neon signs, with diverse vendors selling exotic goods, and pedestrians in futuristic attire navigating through the crowd.",
  "A magical library with endless bookshelves spiraling into the sky, enchanted books floating mid-air, and a grand chandelier made of crystals casting a radiant glow over the space.",
  "A steampunk-inspired airship sailing through fluffy white clouds, adorned with intricate gears and brass fittings, with passengers gazing out of large panoramic windows.",
  "A mystical underwater kingdom illuminated by bioluminescent corals, graceful mermaids swimming alongside ancient ruins, and schools of exotic fish darting through the vibrant marine flora.",
  "A vibrant coral reef teeming with life, showcasing a kaleidoscope of colorful fish, intricate coral formations, and sun rays piercing through the clear turquoise water.",
  "A minimalist black and white portrait of a lone figure standing at the edge of a vast desert, with swirling sand dunes and a dramatic cloudy sky creating a stark contrast.",
  "A vibrant abstract painting with bold colors and dynamic brushstrokes, depicting an explosion of shapes and patterns that evoke a sense of movement and emotion.",
  "A cozy cabin nestled in the snowy mountains during twilight, with smoke gently rising from the chimney, warm golden lights glowing through the windows, and snowflakes softly falling around.",
  "A bustling spaceport with various alien species boarding and disembarking from sleek spacecraft, towering structures adorned with intergalactic signage, and a lively atmosphere filled with activity.",
  "A tranquil Japanese garden in spring, featuring blooming cherry blossoms, a gently flowing koi pond, traditional stone lanterns, and a wooden bridge arching over a serene stream.",
  "A majestic phoenix rising from its ashes amidst a fiery backdrop, with vibrant feathers spread wide, illuminating the dark surroundings with its radiant glow.",
  "An enchanted forest at twilight, where luminescent plants and mythical creatures roam, casting ethereal lights and shadows under the canopy of ancient trees.",
  "A grand Victorian-era ballroom filled with elegantly dressed guests dancing under a magnificent chandelier, with intricate architectural details and opulent decorations.",
  "A whimsical fairy tale village perched on the branches of colossal trees, connected by rope bridges, with charming cottages, lantern-lit pathways, and magical creatures inhabiting the surroundings.",
  "A high-tech laboratory with sleek equipment, holographic displays, and scientists in futuristic attire conducting groundbreaking experiments, all set against a backdrop of advanced technology.",
  "A celestial scene depicting planets aligned in a vast galaxy, with shimmering stars, swirling nebulae, and cosmic phenomena creating a breathtaking and awe-inspiring panorama.",
  "A rustic farmhouse surrounded by golden fields of wheat under a clear blue sky, with a weathered barn, grazing livestock, and a peaceful countryside ambiance.",
  "An ancient underwater temple guarded by sea serpents, adorned with intricate carvings and surrounded by mysterious aquatic flora, illuminated by shafts of light filtering through the water.",
  "A dynamic battle scene between armored knights and mythical beasts in a stormy landscape, with lightning illuminating the chaotic skirmish and dramatic action frozen in time.",
  "A dreamy sunset over a tranquil lake, with reflections of colorful clouds dancing on the water's surface, framed by silhouetted trees and distant mountain peaks.",
  "A futuristic metropolis at night, with sprawling highways filled with autonomous vehicles, towering skyscrapers adorned with digital art, and vibrant street life illuminated by artificial lighting.",
  "A mystical sorceress casting a powerful spell in an ancient stone circle, with swirling magical energy, enchanted symbols glowing on the ground, and an aura of otherworldly power.",
  "A picturesque European village during autumn, with cobblestone streets lined with quaint houses, colorful fall foliage, and bustling local markets filled with seasonal produce.",
  "A vibrant street art mural coming to life, with characters and elements bursting out of the wall into the real world, blending reality with artistic imagination in a seamless transition.",
  "A serene beach at dawn, with gentle waves lapping against the shore, soft pastel colors painting the sky, and a solitary sailboat drifting peacefully on the horizon.",
];

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

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const { setValue } = form;

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

  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
    setValue("prompt", randomPrompt);
  };

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
            {isLoggedIn ? (
              <Link href={"/profile"}>
                <Button className="poppins-semibold">
                  Check Your Creations
                </Button>
              </Link>
            ) : (
              <Button
                className="poppins-semibold"
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
            <Button
              onClick={handleRandomPrompt}
              type="button"
              className="poppins-semibold flex gap-x-2"
            >
              <ShuffleIcon /> Random Prompt
            </Button>
            {/* <Button className="poppins-semibold flex gap-x-2">
              <MagicWandIcon className="font-bold" /> Surprise Me
            </Button> */}
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
