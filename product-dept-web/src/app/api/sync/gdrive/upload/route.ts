import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const uploadUrl = process.env.GDRIVE_UPLOAD_URL;
  if (!uploadUrl) {
    return NextResponse.json({ error: "GDRIVE_UPLOAD_URL not configured in Vercel" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { folderId, fileName, fileContent, contentType } = body;

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        folderId,
        fileName,
        fileContent,
        contentType
      })
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const errText = await res.text();
      throw new Error(`Apps Script upload returned: ${res.status} - ${errText}`);
    }
  } catch (error: any) {
    console.error("Google Drive Apps Script upload proxy failed:", error);
    return NextResponse.json({ error: error.message || "Failed to upload to Google Drive" }, { status: 500 });
  }
}
