"use client";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className={`${styles.footerContainer} ${styles.eventfooter} !bg-white py-4`}
    >
      <div className="container mx-auto w-full">
        <div className="flex justify-center ">
          <div className="flex flex-col justify-center items-center gap-[10px]">
            <Image
              src="/images/connplex/connplex_logo_black.png"
              className={`!h-[45px] w-auto me-3 ${styles.footerLogo}`}
              alt="Connplex"
              width={100}
              height={45}
            />
            <p className="text-black text-[10px] md:text-xs font-medium text-center">
              Copyright © 2025 Connplex All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
