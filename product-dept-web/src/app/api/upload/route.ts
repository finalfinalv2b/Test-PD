import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      // 1. Primary secure storage: Upload to Vercel Blob Storage if token is set
      const blob = await put(file.name, file, {
        access: "public",
        token: token
      });

      return NextResponse.json({
        url: blob.url,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        name: file.name,
        fileType: file.type
      });
    } else {
      // 2. Zero-config cloud fallback: Upload to tmpfiles.org for immediate cross-device sync
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: uploadFormData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === "success" && result.data?.url) {
          // Construct the direct CDN download link by appending /dl/ after domain name
          const directUrl = result.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
          return NextResponse.json({
            url: directUrl,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            name: file.name,
            fileType: file.type
          });
        }
      }
      
      throw new Error("Zero-config cloud upload service returned a failed status.");
    }
  } catch (error: any) {
    console.error("Cloud upload API error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
