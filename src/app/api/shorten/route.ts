import { NextRequest, NextResponse } from "next/server";
import { createUrl } from "@/db/urlController";

const generateId = (): string => Math.random().toString(16).slice(2, 8);

export async function POST(req: NextRequest) {
  try {
    const { url } = (await req.json()) as { url: string };

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return NextResponse.json(
        { message: "Invalid URL. Must start with http:// or https://" },
        { status: 400 }
      );
    }

    const shortId = generateId();
    const shortUrl = await createUrl(shortId, url);

    return NextResponse.json({ shortId: shortUrl.shortId });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { message: "Error creating short URL" },
      { status: 500 }
    );
  }
}
