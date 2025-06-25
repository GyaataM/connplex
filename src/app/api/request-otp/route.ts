// app/api/request-otp/route.ts
import { NextResponse } from "next/server";
import { createAndSendOTPMessage } from "@/lib/otp";

export type ErrType = {
  response: {
    data: {
      message: string;
    };
  };
};

export async function POST(req: Request) {
  try {
    const { mobileNumber, countryCode } = await req.json();

    if (!mobileNumber || !countryCode) {
      return NextResponse.json({
        success: false,
        message: "Mobile number is required",
        error: null,
      });
    }

    const { fullHash, expires } = await createAndSendOTPMessage(
      countryCode,
      mobileNumber
    );

    return NextResponse.json({
      success: true,
      message: "OTP sent to your phone",
      data: {
        hash: fullHash,
        expires,
      },
    });
  } catch (error: unknown) {
    const err = error as ErrType;

    console.error("Error sending OTP:", err);

    return NextResponse.json(
      {
        success: false,
        message:
          err?.response?.data?.message ||
          "Unknown error, please try again after sometime",
        error: null,
      },
      { status: 500 }
    );
  }
}
