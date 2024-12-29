import { getUrl } from "@/db/urlController";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: Promise<{ shortId: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const shortId = (await params).shortId;
  console.log({ shortId });
  const url = await getUrl(shortId);

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-xl font-bold">URL not found</h1>
          <p className="mt-2">This short URL doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  redirect(url);
}
