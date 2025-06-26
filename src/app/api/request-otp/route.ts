import { NextRequest, NextResponse } from "next/server";

const allowedReferers = [
  "http://localhost:3000",
  "https://www.connplexcinemas.com/"
];

export async function POST(req: NextRequest) {
  const referer = req.headers.get("referer") || "";

  const isAllowedReferer = allowedReferers.some((allowed) =>
    referer.startsWith(allowed)
  );

  if (!isAllowedReferer) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { countryCode, mobileNumber } = await req.json();

  if (!countryCode || !mobileNumber) {
    return NextResponse.json({ success: false, message: "Missing data" }, { status: 400 });
  }

  try {
    // const { fullHash } = await createAndSendOTPMessage(countryCode, mobileNumber);
    return NextResponse.json({ success: true, message: "OTP send successfully!" });
  } catch (err) {
    return NextResponse.json({ success: false, data: {err}, message: "Failed to send OTP" }, { status: 500 });
  }
}
