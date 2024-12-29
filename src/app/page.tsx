"use client";
import { useState, FormEvent } from "react";
import api from "@/app/api/API";
import { ApiResponse } from "@/types/url";
import { AxiosError } from "axios";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const { data } = await api.post<ApiResponse>("/api/shorten", { url });
      setShortUrl(`${window.location.origin}/${data.shortId}`);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "Failed to shorten URL");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-black">URL Shortener</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to shorten"
            className="w-full p-2 border rounded mb-4 text-black"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {shortUrl && (
          <div className="mt-4">
            <p className="font-bold mb-2 text-black">Your shortened URL:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="w-full p-2 border rounded bg-gray-50 text-black"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shortUrl);
                  alert("url copied");
                }}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-blue-700 font-bold"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
