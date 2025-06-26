"use server";

import { createAndSendOTPMessage, verifyOTP } from "@/lib/otpUtils";

export async function serverRequestOTP(countryCode: string, mobileNumber: string) {
  const { fullHash } = await createAndSendOTPMessage(countryCode, mobileNumber);
  return { hash: fullHash };
}

export async function serverVerifyOTP(
  mobileNumber: string,
  otp: string,
  hash: string
) {
  const isValid = verifyOTP(mobileNumber, otp, hash);
  if (!isValid) throw new Error("Invalid or expired OTP");
  return { success: true };
}
