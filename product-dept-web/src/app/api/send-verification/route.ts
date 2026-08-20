import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "temp_key");

export async function POST(request: Request) {
  try {
    const { email, verificationLink } = await request.json();

    if (!email || !verificationLink) {
      return NextResponse.json(
        { error: "Missing email or verificationLink parameters." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend API Key is not configured on the server." },
        { status: 500 }
      );
    }

    // Deliver email using the Resend onboarding sandbox sender address
    const data = await resend.emails.send({
      from: "Product Dept Auth <onboarding@resend.dev>",
      to: [email],
      subject: "Access Key Verification Link",
      html: `
        <div style="font-family: sans-serif; padding: 32px; max-width: 600px; background-color: #f9f4ef; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px; color: #000000; margin: 0 auto;">
          <h2 style="font-size: 20px; font-weight: 900; letter-spacing: -0.025em; text-transform: uppercase; margin-bottom: 8px; border-bottom: 2px solid #000; padding-bottom: 12px;">
            PRODUCT DEPT. SECURE PORTAL
          </h2>
          <p style="font-size: 13px; line-height: 1.6; color: #333333; margin-top: 16px; margin-bottom: 24px; font-family: monospace; text-transform: uppercase;">
            Identity verification requested for access key configuration.
          </p>
          <div style="margin: 32px 0;">
            <a href="${verificationLink}" style="background-color: #000000; color: #ffffff; padding: 14px 28px; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; border-radius: 4px; display: inline-block;">
              Verify Email & Set Passkey
            </a>
          </div>
          <p style="font-size: 10px; color: #666666; margin-top: 36px; border-t: 1px solid rgba(0,0,0,0.1); padding-top: 16px; font-family: monospace; text-transform: uppercase;">
            This link is valid for 15 minutes. If you did not initiate this authentication, please notify network security.
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
