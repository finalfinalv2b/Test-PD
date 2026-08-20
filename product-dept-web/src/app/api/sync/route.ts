import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

export const runtime = "edge";

// Stateless fallback store
let memoryDb: Record<string, any> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key parameter" }, { status: 400 });
  }

  // 1. Google Drive Apps Script database connector
  const gdriveUrl = process.env.GDRIVE_UPLOAD_URL;
  if (gdriveUrl) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

      const res = await fetch(gdriveUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "read_db", key }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data !== null) {
          return NextResponse.json(data);
        }
      }
    } catch (e: any) {
      console.warn("Sync GET from Google Drive Apps Script failed or timed out:", e.message || e);
    }
  }

  // 2. Vercel Blob central database
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      const { blobs } = await list({ token });
      const targetBlob = blobs.find(b => b.pathname === `db/${key}.json`);

      if (targetBlob) {
        const res = await fetch(targetBlob.url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          return NextResponse.json(data);
        }
      }
    }
  } catch (e) {
    console.warn("Sync GET from Vercel Blob failed:", e);
  }

  return NextResponse.json(memoryDb[key] || null);
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Missing key parameter" }, { status: 400 });
  }

  try {
    const data = await request.json();
    memoryDb[key] = data;

    // 1. Google Drive Apps Script database connector
    const gdriveUrl = process.env.GDRIVE_UPLOAD_URL;
    if (gdriveUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

        await fetch(gdriveUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "write_db", key, payload: data }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch (e: any) {
        console.warn("Sync POST to Google Drive Apps Script failed or timed out:", e.message || e);
      }
    }

    // 2. Vercel Blob central database
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      await put(`db/${key}.json`, JSON.stringify(data), {
        access: "public",
        addRandomSuffix: false,
        token,
        contentType: "application/json",
        cacheControl: "no-cache, no-store, must-revalidate"
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Sync POST failed:", error);
    return NextResponse.json({ error: error.message || "Failed to write database updates" }, { status: 500 });
  }
}
