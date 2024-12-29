import { Url } from "@/db/URL";
import { connectToDatabase } from "@/db/dbConnect";
import { UrlData } from "@/db/URL";

export const createUrl = async (
  shortId: string,
  originalUrl: string
): Promise<UrlData> => {
  await connectToDatabase();
  const url = new Url({ shortId, originalUrl });
  return await url.save();
};

export const getUrl = async (shortId: string): Promise<string | undefined> => {
  await connectToDatabase();
  const url = await Url.findOne({ shortId });
  return url?.originalUrl;
};
