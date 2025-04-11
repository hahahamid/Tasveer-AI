import { authOptions } from "@/utils/authOptions";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are Unauthorized" },
      { status: 401 }
    );
  }
  const { prompt, style }: { prompt: string; style: string } =
    await request.json();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "No user found" }, { status: 401 });
  }

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100000000) + 1;
  }

  const randomSeed = generateRandomNumber();
  // const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
  //   prompt
  // )}?seed=${randomSeed}&model=${style}&enhance=True&nologo=True`;

  const stylePromptMap = {
    flux: "", // No additional text for Standard
    "flux-anime": " and make the image in anime style",
    "any-dark": " and make the image in a dark, moody style",
    turbo: " and make the image in a hyper-realistic style",
    "flux-3d": " and make the image in a 3D-rendered style",
  };

  type StyleKey = keyof typeof stylePromptMap;

  // Function to construct the image URL
  const getImageURL = (prompt: string, style: StyleKey, randomSeed: number) => {
    console.log(style);

    // Get the prompt enhancement based on the style
    const promptEnhancement = stylePromptMap[style] || "";

    // Combine the original prompt with the style-specific enhancement
    const finalPrompt = `${prompt}${promptEnhancement}`;

    // Construct the URL without the model parameter
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      finalPrompt
    )}?seed=${randomSeed}&enhance=True&nologo=True`;

    return imageURL;
  };

  // Generate the image URL
  const imageURL = getImageURL(prompt, style as StyleKey, randomSeed);
  console.log(imageURL);

  await fetch(imageURL);
  await prisma.post.create({
    data: {
      prompt: prompt,
      url: imageURL,
      seed: randomSeed,
      userId: user.id,
    },
  });

  return NextResponse.json({ url: imageURL });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are Unauthorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "No user found" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}
