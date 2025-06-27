// app/api/request-otp/route.ts
import otpStore from "@/lib/otpStore";
import { createAndSendOTPMessage } from "../otpUtills/otpUtils";
import { NextRequest, NextResponse } from "next/server";
// import { createAndSendOTPMessage } from "@/lib/otp-service"; // Your actual OTP sending logic

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer") || "";

  // Optional: restrict domains
  const allowedDomains = ["http://localhost:3000", "https://www.connplexcinemas.com", "https://uatconnplex.vercel.app"];
  if (!allowedDomains.some(domain => referer.includes(domain))) {
    return NextResponse.json({ success: false, message: "Unauthorized domain" }, { status: 401 });
  }

  try {
    const { countryCode, mobileNumber, identifier } = await req.json();

    if (!countryCode || !mobileNumber) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const { otp, fullHash, expires } = await createAndSendOTPMessage(countryCode, mobileNumber);

    otpStore.set(identifier, { fullHash, otp, expires });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully!",
      // hash: fullHash,  
    });
  } catch (error: unknown) {
  console.error("OTP send error:", error);

  let message = "Failed to send OTP";

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json(
    { success: false, message },
    { status: 500 }
  );
}
}
