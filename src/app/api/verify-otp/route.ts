// app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const { mobileNumber, otp, hash } = await req.json();

    if (!mobileNumber || !otp || !hash) {
      return NextResponse.json({
        success: false,
        message: "Missing required values",
        error: null,
      });
    }

    const isValid = verifyOTP(mobileNumber, otp, hash);

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired OTP",
        error: null,
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
      data: null,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: `Unknown error, please try again after sometime, ${error}`,
        error: null,
      },
      { status: 500 }
    );
  }
}
