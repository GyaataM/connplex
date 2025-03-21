"use client";
import Title from "@/components/title/title";
import Image from "next/image";

const ThankYou = () => {
  const icon = "/images/connplex/thankyou.png";

  return (
    <div
      style={{ height: "100vh" }}
      className="!bg-[url(/images/connplex/connplex_banner.png)] bg-cover"
    >
      <div className="w-full pt-[56px] lg:pt-[95px] pb-[129px] lg:pb-[136px] flex justify-center">
        <Image
          className="h-[50px] w-auto"
          width={227}
          height={50}
          alt="logo"
          src="/images/connplex/connplex_logo.png"
        />
      </div>

      <div className="py-16 text-center">
        <div className="w-full flex flex-col items-center">
          <div className="mb-6 md:mb-8">
            <Image
              className="mx-auto w-[80px] h-[80px]"
              src={icon}
              alt={"Thank you"}
              width={80}
              height={80}
            />
          </div>
          <Title title="Thank you for your interest in Connplex Franchise!" />
          <div className="mt-[15px] text-base font-medium text-white">
            A team member will get in touch with you shortly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
