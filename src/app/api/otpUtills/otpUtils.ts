import otpGenerator from "otp-generator";
import crypto from "crypto";
import { sendSMS } from "./sendSMS";

//for hashing the mobile number
const OTP_HASHING_SECRET_KEY = 'c@nnplex-cinema-secret';
const OTP_EXPIRE_TIME = 2 * 60 * 1000; // 2 minutes in ms

export async function createAndSendOTPMessage(
  countryCode: string,
  mobileNumber: string
) {
  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const expires = Date.now() + OTP_EXPIRE_TIME;
  const data = `${mobileNumber}.${otp}.${expires}`;
  const hash = crypto
    .createHmac("sha256", OTP_HASHING_SECRET_KEY)
    .update(data)
    .digest("hex");
  const fullHash = `${hash}.${expires}`;

  // const options: OTPSendOptions = {
  //   unicode: true,
  //   templateId: 1707174903801314747,
  // };

  const textMessage = `Your OTP is ${otp} for Connplex Sign Up/Login. VCS industries limited`;

  await sendSMS(countryCode, mobileNumber, textMessage);
  
  return { otp, fullHash, expires };
}

export function verifyOTP(mobileNumber: string, otp: string, fullHash: string) {
  const [hashValue, expires] = fullHash.split(".");
  const now = Date.now();
  if (now > parseInt(expires)) return false;

  const data = `${mobileNumber}.${otp}.${expires}`;
  const newHash = crypto
    .createHmac("sha256", OTP_HASHING_SECRET_KEY)
    .update(data)
    .digest("hex");
  return newHash === hashValue;
}
