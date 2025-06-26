import otpStore from "@/lib/otpStore";
import { verifyOTP } from "../otpUtills/otpUtils";
import { NextRequest, NextResponse } from "next/server";

const allowedReferers = [
  "http://localhost:3000",
  "https://www.connplexcinemas.com",
  "https://uatconnplex.vercel.app"
];

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer") || "";
  const isAllowedReferer = allowedReferers.some((allowed) =>
    referer.startsWith(allowed)
  );

  if (!isAllowedReferer) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { mobileNumber, otp, identifier } = await req.json();

  if (!mobileNumber || !otp) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  const sessionData = otpStore.get(identifier);

  if (!sessionData) {
    return NextResponse.json(
      { success: false, message: "OTP session expired or invalid" },
      { status: 400 }
    );
  }

  const { fullHash, expires } = sessionData;

  // Optional: Check if expired based on timestamp
  if (Date.now() > expires) {
    otpStore.delete(identifier); // Clean up
    return NextResponse.json(
      { success: false, message: "OTP expired" },
      { status: 400 }
    );
  }

  const isValid = verifyOTP(mobileNumber, otp, fullHash);

  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Invalid OTP" },
      { status: 401 }
    );
  }

  otpStore.delete(identifier);

  return NextResponse.json({ success: true, message: "OTP Verified" });
}
