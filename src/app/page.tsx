"use client";
import Image from "next/image";
import { useState } from "react";
import EventForm from "@/components/connplex/eventForm";
import MainForm from "@/components/connplex/mainForm";
import Footer from "@/components/footer/footer";

function EventLandingPage() {
  const [registering, setRegistering] = useState<boolean>(false);

  return (
    <>
      {registering && (
        <div className="scroll-smooth w-full h-full absolute z-50 flex justify-center items-center bg-[#0400007e]">
          <div
            id="mobileForm"
            className="mx-8 py-[31px] px-[37px] items-center bg-black border border-[#D3B15F] rounded-lg lg:mb-8 shadow-lg lg:shadow-none block lg:hidden"
          >
            <div
              className="pb-3 w-full flex justify-end"
              onClick={() => setRegistering(false)}
            >
              <Image
                width={30}
                height={30}
                src="/images/circled_close.png"
                alt="close"
              />
            </div>
            <MainForm pageFrom="Connplex" />
          </div>
        </div>
      )}
      <BannerSection />

      <div className="relative">
        <div className="pt-[33px] pb-[101px] bg-black flex flex-col gap-[100px]">
          {/* yt section */}
          <section className="px-[24.5px] lg:px-0 w-full flex gap-[30px] md:gap-[70px] flex-col-reverse lg:flex-row items-center justify-center">
            <div className="w-full md:w-[507px] h-[285px] bg-red-400"></div>
            <div className="w-full md:w-[350px] text-[22px] text-center lg:text-start leading-[25px] lg:text-[35px] lg:leading-[45px] text-[#D3B15F] font-semibold">
              Experience the Magic of Connplex - A Glimpse into Our Stunning
              Cinemas
            </div>
          </section>

          {/* cinema models */}
          <section className="hidden md:block text-center text-white">
            <div className="pb-[15px] lg:pb-[8px] font-bold text-[22px] lg:text-[35px] leading-[150%]">
              Our Cinema Models
            </div>
            <div className="font-normal text-[13px] leading-[13px] lg:text-[14px]">
              Owning a Connplex cinema is simpler than ever! Explore our
              profitable cinema models with strong brand support and an easy
              setup.
            </div>
            <div className="mt-[30px] lg:mt-[48px] w-full flex flex-wrap justify-center gap-[18px]">
              {[
                {
                  title: "Express",
                  url: "/images/connplex/icons/model1.png",
                  url2: "/images/connplex/icons/model1_1.png",
                  desc: [
                    { title: "Area Req", desc: "5000-7000 sq.ft*" },
                    { title: "Seats", desc: "150" },
                    { title: "Minimum Screens", desc: "3-4" },
                    { title: "Seat Types", desc: "Sofa Slider, Loungers" },
                  ],
                },
                {
                  title: "Signature",
                  url: "/images/connplex/icons/model2.png",
                  url2: "/images/connplex/icons/model2_1.png",
                  desc: [
                    { title: "Area Req", desc: "6000-8000 sq.ft*" },
                    { title: "Seats", desc: "175" },
                    { title: "Minimum Screens", desc: "3-4" },
                    {
                      title: "Seat Types",
                      desc: "Sofa Siders, Loungers, Duo Loungers",
                    },
                  ],
                },
                {
                  title: "Luxuriance",
                  url: "/images/connplex/icons/model3.png",
                  url2: "/images/connplex/icons/model3_1.png",
                  desc: [
                    { title: "Area Req", desc: "8000-10000 sq.ft*" },
                    { title: "Seats", desc: "200" },
                    { title: "Minimum Screens", desc: "3-6" },
                    {
                      title: "Seat Types",
                      desc: "Recliners, Premium Recliners, Premium Loungers",
                    },
                  ],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-[30px] py-[19px] border border-[#D3B15F] bg-[#1A1A1A] group hover:bg-[#D3B15F] hover:text-black rounded-[7.2px] w-full md:w-[307px]"
                >
                  <div className="h-full flex flex-col gap-2.5 items-center">
                    <Image
                      className="object-contain !w-[60px] !h-[50px] block group-hover:hidden"
                      width={60}
                      height={50}
                      src={item.url}
                      alt={item.title}
                    />
                    <Image
                      className="object-contain !w-[60px] !h-[50px] hidden group-hover:block"
                      width={60}
                      height={50}
                      src={item.url2}
                      alt={item.title}
                    />
                    <h3 className="text-[#D3B15F] group-hover:text-black font-semibold text-[15px]">
                      {item.title}
                    </h3>
                    <ul className="pt-1 pl-3 list-disc ">
                      {item.desc.map((list, index) => (
                        <li
                          key={index}
                          className="py-0.5 text-[14px] font-normal text-start"
                        >
                          <span className="font-semibold">{list.title}</span>
                          :&nbsp;{list.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* usps section */}
          <section className="px-[24.5px] lg:px-0 text-center flex flex-col justify-center items-center text-white">
            <div className="pb-[15px] lg:pb-[8px] font-bold text-[22px] lg:text-[35px] leading-[150%]">
              Connplex Offerings - Our USPs
            </div>
            <div className="font-normal text-[13px] leading-[13px] lg:text-[14px]">
              Find out what makes Connplex unique - cutting-edge technology,
              profitable cinema models, and unmatched movie experiences!
            </div>
            <div className="mt-[30px] lg:mt-[48px] flex flex-wrap justify-center gap-[18px] w-full lg:w-[960px]">
              {[
                {
                  title: "Fastest Setup",
                  url: "/images/connplex/icons/usp1.png",
                  url2: "/images/connplex/icons/usp1_1.png",
                  desc: "We setup theatres with unmatched speed within 90-120 days.",
                },
                {
                  title: "Fastest ROI",
                  url: "/images/connplex/icons/usp2.png",
                  url2: "/images/connplex/icons/usp2_1.png",
                  desc: "Get ROI in 18-24 months* through unique value proposition and operational efficiency.",
                },
                {
                  title: "Latest Technology",
                  url: "/images/connplex/icons/usp3.png",
                  url2: "/images/connplex/icons/usp3_1.png",
                  desc: "State-of-the-art AV tech such as Dolby 7.1, 2K DCI Laser Projectors, Surround sound and lighting automation.",
                },
                {
                  title: "Best Cinema Experience",
                  url: "/images/connplex/icons/usp4.png",
                  url2: "/images/connplex/icons/usp4_1.png",
                  desc: "Luxurious amenities and unparalleled services come together to create an immersive cinema experience.",
                },
                {
                  title: "Luxury Seating",
                  url: "/images/connplex/icons/usp5.png",
                  url2: "/images/connplex/icons/usp5_1.png",
                  desc: "Plush seating options for all preferences such as, intimate love seats and spacious VIP loungers.",
                },
                {
                  title: "Hassle-Free Investment",
                  url: "/images/connplex/icons/usp6.png",
                  url2: "/images/connplex/icons/usp6_1.png",
                  desc: "Connplex team will assist you at every step to cover everything right from domain design to marketing.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-[30px] py-[19px] border group border-[#D3B15F] bg-[#1A1A1A] hover:bg-[#D3B15F] rounded-[7.2px] w-full md:w-[305px]"
                >
                  <div className="h-full flex flex-col gap-2.5 items-center">
                    <Image
                      className="object-contain !w-[42px] !h-[44px] group-hover:hidden block"
                      width={42}
                      height={44}
                      src={item.url}
                      alt={item.title}
                    />
                    <Image
                      className="object-contain !w-[42px] !h-[44px] hidden group-hover:block"
                      width={42}
                      height={44}
                      src={item.url2}
                      alt={item.title}
                    />
                    <h3 className="text-[#D3B15F] group-hover:text-black font-semibold text-[15px]">
                      {item.title}
                    </h3>
                    <p className="text-white group-hover:text-black font-normal text-[12px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* theatre image section  */}
          <section className="px-[24.5px] lg:px-0">
            <div className="hidden lg:flex flex-col justify-center items-center gap-3">
              {[
                [
                  "/images/connplex/theatre1.png",
                  "/images/connplex/theatre2.png",
                  "/images/connplex/theatre3.png",
                ],
                [
                  "/images/connplex/theatre4.png",
                  "/images/connplex/theatre5.png",
                  "/images/connplex/theatre6.png",
                ],
                [
                  "/images/connplex/theatre7.png",
                  "/images/connplex/theatre8.png",
                  "/images/connplex/theatre9.png",
                ],
              ].map((images, index) => (
                <div key={index} className="flex gap-[17px]">
                  {images.map((image, innerIndex) =>
                    index % 2 === 0 ? (
                      <img
                        key={innerIndex}
                        className={`!h-[200px] ${
                          innerIndex === images.length - 1
                            ? "w-[374px]"
                            : "w-[271px]"
                        }`}
                        src={image}
                        alt={`theatreImage${innerIndex + 1}`}
                      />
                    ) : (
                      <img
                        key={innerIndex}
                        className={`!h-[200px] ${
                          innerIndex === 0 ? "w-[374px]" : "w-[271px]"
                        }`}
                        src={image}
                        alt={`theatreImage${innerIndex + 1}`}
                      />
                    )
                  )}
                </div>
              ))}
            </div>
            <div className="flex lg:hidden flex-col justify-center items-center gap-3">
              {[
                [
                  "/images/connplex/theatre1.png",
                  "/images/connplex/theatre2.png",
                ],
                ["/images/connplex/theatre3.png"],
                [
                  "/images/connplex/theatre5.png",
                  "/images/connplex/theatre6.png",
                ],
                ["/images/connplex/theatre4.png"],
                [
                  "/images/connplex/theatre7.png",
                  "/images/connplex/theatre8.png",
                ],
                ["/images/connplex/theatre9.png"],
              ].map((images, index) => (
                <div key={index} className="flex flex-wrap gap-[17px]">
                  {images.map((image, innerIndex) => (
                    <img
                      className={`w-full ${
                        index % 2 === 0 ? "md:w-auto" : "md:w-[560px]"
                      } !h-[200px]`}
                      key={innerIndex}
                      src={image}
                      alt={`theatreImage${innerIndex + 1}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* support section */}
          <section className="px-[24.5px] lg:px-0 flex flex-col justify-center items-center text-center text-white">
            <div className="pb-[15px] lg:pb-[8px] font-bold text-[22px] lg:text-[35px] leading-[150%]">
              Enjoy End-to-End Handholding and Support
            </div>
            <div className="font-normal text-[13px] leading-[13px] lg:text-[14px]">
              Get comprehensive guidance right from setup to operations.
            </div>
            <div className="mt-[30px] lg:mt-[48px] w-full flex flex-wrap justify-center gap-[18px] lg:w-[960px]">
              {[
                {
                  title: "Technology",
                  url: "/images/connplex/icons/icon1.png",
                  url2: "/images/connplex/icons/icon1_1.png",
                  subList: [
                    "All Tech Set-Up",
                    "Licensed Software and Hardware",
                  ],
                },
                {
                  title: "Licensing",
                  url: "/images/connplex/icons/icon2.png",
                  url2: "/images/connplex/icons/icon2_1.png",
                  subList: ["License Consulting", "Documentation and Filing"],
                },
                {
                  title: "Finance and Legal",
                  url: "/images/connplex/icons/icon3.png",
                  url2: "/images/connplex/icons/icon3_1.png",
                  subList: ["Guidelines and Processes"],
                },
                {
                  title: "Design Consultancy",
                  url: "/images/connplex/icons/icon4.png",
                  url2: "/images/connplex/icons/icon4_1.png",
                  subList: [
                    "Interior and Exterior Design",
                    "Project Management",
                  ],
                },
                {
                  title: "HR & Marketing Support",
                  url: "/images/connplex/icons/icon5.png",
                  url2: "/images/connplex/icons/icon5_1.png",
                  subList: [
                    "Staff Hiring & Training",
                    "Comprehensive Marketing Support",
                  ],
                },
                {
                  title: "Food & Beverage",
                  url: "/images/connplex/icons/icon6.png",
                  url2: "/images/connplex/icons/icon6_1.png",
                  subList: [
                    "Complete F&B Set-up",
                    "Efficient Inventory Management",
                  ],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-[30px] py-[19px] border group border-[#D3B15F] bg-[#1A1A1A] hover:bg-[#D3B15F] rounded-[7.2px] w-[307px]"
                >
                  <div className="flex items-center">
                    <Image
                      className="object-contain !w-[40px] !h-[40px] block group-hover:hidden"
                      width={40}
                      height={40}
                      src={item.url}
                      alt={item.title}
                    />
                    <Image
                      className="object-contain !w-[40px] !h-[40px] hidden group-hover:block"
                      width={40}
                      height={40}
                      src={item.url2}
                      alt={item.title}
                    />
                    <h3 className="pl-2 text-[#D3B15F] group-hover:text-black font-bold text-[15px]">
                      {item.title}
                    </h3>
                  </div>
                  <ul className="pt-1 pl-3 list-disc">
                    {item.subList.map((list, index) => (
                      <li
                        key={index}
                        className="text-white group-hover:text-black text-[14px] font-normal text-start"
                      >
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* why section */}
          <section className="px-[24.5px] lg:px-0 flex flex-col-reverse gap-[30px] lg:gap-[70px] lg:flex-row justify-center items-center">
            <div className="flex flex-col gap-4">
              <div className="font-bold text-[22px] leading-[28px] text-white text-center lg:text-center">
                Why Choose Connplex Franchise?
              </div>
              <div className="font-normal text-[13px] leading-[18px] text-white text-center lg:text-center block lg:hidden">
                We provide comprehensive guidance right from from setup to
                operations, to ensure that Connplex franchises thrive and
                succeed.
              </div>
              <ul className="px-[24.5px] lg:px-0 w-full lg:max-w-[440px] list-disc flex flex-col gap-5">
                {[
                  "Connplex is India’s first and fastest growing chain of smart, mini theatres.",
                  "Winner of Times Business Awards 2024-25 - Innovation in Entertainment and Cinema.",
                  "We are present in 18 states currently with 250+ screens and growing.",
                  "Connplex sets up cinemas at a lightning fast speed within 90-120 days.",
                  "3 cinema models that are offered based on availability of space and budget.",
                  "End-to-end support with licensing paperwork and staff hiring.",
                ].map((item, index) => (
                  <li key={index} className="text-sm font-normal text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-[405px] lg:h-[379px]">
              <Image
                className="object-contain w-full lg:w-[405px] lg:h-[379px]"
                alt="randomImage"
                src="/images/connplex/random1.png"
                height={379}
                width={405}
              />
            </div>
          </section>
        </div>

        <EventForm
          pageForm="Connplex"
          setRegistering={(value) => setRegistering(value)}
        />
      </div>

      <Footer />
    </>
  );
}

export default EventLandingPage;

const BannerSection = () => {
  return (
    <section className="h-full px-[24.5px] lg:px-0 pt-[81px] pb-8 flex justify-center items-center !bg-[url(/images/connplex/connplex_banner.png)] bg-cover">
      <div className="relative container z-[1]  flex justify-center">
        <div className="w-full flex flex-col gap-7 lg:flex-row items-center justify-center">
          <div className="max-w-[500px] lg:max-w-[510px] flex flex-col lg:items-start items-center text-white text-center lg:text-left lg:mb-0">
            <Image
              className="h-[50px] lg:h-[65px] w-[222px] lg:w-[295px]"
              src="/images/connplex/connplex_logo.png"
              height={65}
              width={295}
              alt="logo"
            />
            <h2 className="mt-[30px] lg:mt-[13px] pb-[15px] text-[28px] lg:text-[45px] leading-[30px] lg:leading-[50px] text-white uppercase font-bold lg:font-extrabold ">
              Become a Connplex Franchise Today!!!
            </h2>
            <h2 className="pr-0 lg:pr-28 text-[14px] lg:text-base font-medium text-white pb-4 lg:ml-0">
              Grow with the Times Business Awards 2024-25 Winner - Innovation in
              Entertainment and Cinema
            </h2>
          </div>
          <div className="md:mx-0 py-[31px] px-2 md:px-[37px] items-center bg-black border border-[#D3B15F] rounded-lg lg:mb-8 shadow-lg lg:shadow-none">
            <MainForm pageFrom="Connplex" />
          </div>
        </div>
      </div>
    </section>
  );
};
