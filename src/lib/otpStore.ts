const otpStore = new Map<string, { fullHash: string, otp: string, expires: number }>();

export default otpStore;