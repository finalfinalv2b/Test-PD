import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get("folderId");

  if (!folderId) {
    return NextResponse.json({ error: "Missing folderId parameter" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    // Return simulated files if Google API Key is not yet configured, with instructions
    return NextResponse.json({
      isDemo: true,
      files: [
        {
          id: "demo-gdrive-1",
          name: "Starshield_Structural_Enclosure_Tolerances.pdf",
          size: "4.2 MB",
          mimeType: "application/pdf",
          modifiedTime: new Date().toISOString()
        },
        {
          id: "demo-gdrive-2",
          name: "Starshield_Chassis_Assembly_V4.step",
          size: "18.5 MB",
          mimeType: "application/octet-stream",
          modifiedTime: new Date().toISOString()
        }
      ]
    });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&key=${apiKey}&fields=files(id,name,size,mimeType,modifiedTime)`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();
      
      const formattedFiles = (data.files || []).map((f: any) => ({
        id: f.id,
        name: f.name,
        size: f.size ? `${(parseInt(f.size) / (1024 * 1024)).toFixed(2)} MB` : "GDrive Cloud File",
        mimeType: f.mimeType,
        modifiedTime: f.modifiedTime
      }));

      return NextResponse.json({
        isDemo: false,
        files: formattedFiles
      });
    } else {
      const errorText = await res.text();
      throw new Error(`Google API returned: ${res.status} - ${errorText}`);
    }
  } catch (error: any) {
    console.error("Google Drive folder listing failed:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch folder contents" }, { status: 500 });
  }
}
