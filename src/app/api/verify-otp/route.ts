import { verifyOTP } from "@/lib/otpUtils";
import { NextRequest, NextResponse } from "next/server";

const allowedReferers = [
  "http://localhost:3000",
  "https://www.connplexcinemas.com"
];

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer") || "";
  const isAllowedReferer = allowedReferers.some((allowed) =>
      referer.startsWith(allowed)
    );
  
    if (!isAllowedReferer) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

  const { countryCode, mobileNumber, otp, hash } = await req.json();

  if (!countryCode || !mobileNumber || !otp || !hash) {
    return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  const isValid = verifyOTP(mobileNumber, otp, hash);

  if (!isValid) {
    return NextResponse.json({ success: false, message: "Invalid or expired OTP" }, { status: 401 });
  }

  return NextResponse.json({ success: true, message: "OTP Verified" });
}
