"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface OTPContextType {
  otpHash: string | null;
  setOtpHash: (value: string | null) => void;
}

const OTPContext = createContext<OTPContextType | undefined>(undefined);

export const OTPProvider = ({ children }: { children: ReactNode }) => {
  const [otpHash, setOtpHash] = useState<string | null>(null);

  return (
    <OTPContext.Provider value={{ otpHash, setOtpHash }}>
      {children}
    </OTPContext.Provider>
  );
};

export const useOTPContext = () => {
  const context = useContext(OTPContext);
  if (!context) {
    throw new Error("useOTPContext must be used within an OTPProvider");
  }
  return context;
};
