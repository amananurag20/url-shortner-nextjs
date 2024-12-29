import mongoose, { Schema, Document } from "mongoose";

export interface UrlData extends Document {
  shortId: string;
  originalUrl: string;
}

const UrlSchema = new Schema<UrlData>({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
});

export const Url =
  mongoose.models.Url || mongoose.model<UrlData>("Url", UrlSchema);
