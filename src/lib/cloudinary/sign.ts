// src/lib/cloudinary/sign.ts
import crypto from 'node:crypto';

export interface CloudinarySignatureResult {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export function generateUploadSignature(folder: string = 'flower-shop'): CloudinarySignatureResult | null {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const cloudName = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!apiSecret || !apiKey || !cloudName) {
    return null;
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

  return {
    signature,
    timestamp,
    apiKey,
    cloudName,
    folder
  };
}
