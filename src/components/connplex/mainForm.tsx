import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Button from "../button/button";
import InputField from "../Fields/InputField";
import Select from "../select/Select";

import NumberField from "../Fields/CustomNumberBox";
import Checkbox from "../Fields/CheckBox";
import States from "@/data/states";
import Cities from "@/data/cities";
import axios from "axios";
import { useRouter } from "next/navigation";
import OTPModal from "../otp/otp";
import { FormData } from "./_form";

interface FormValues {
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  jobTitle: string | null;
  state: number | null;
  city: number | null;
  acceptTerms: boolean;
}

interface EnquireProps {
  varient?: "white" | "dark";
}

const MainForm: React.FC<EnquireProps> = ({ varient = "white" }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [formData, setFormData] = useState<FormData>();

  const initialValues: FormValues = {
    name: "",
    email: "",
    phoneNumber: "",
    jobTitle: "",
    state: 0,
    city: 0,
    acceptTerms: true,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(250, "Name cannot be longer than 250 characters.")
      .matches(/^[a-zA-Z0-9\s]*$/, "Name cannot contain special characters")
      .required("Name is required"),
    jobTitle: Yup.string()
      .trim()
      .max(250, "Job Title cannot be longer than 250 characters."),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact No. must be exactly 10 digits")
      .required("Contact No. is required"),
    email: Yup.string()
      .max(250, "Email Address cannot be longer than 250 characters.")
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setFieldTouched }: FormikHelpers<FormValues>
  ) => {
    try {
      if (showOTPModal === false) {
        Object.keys(values).forEach((fieldName) => {
          setFieldTouched(fieldName, true);
        });

        setErrorMessage(null);
        setShowOTPModal(true);

        setFormData({
          lastName: values.name,
          phoneNumbers: [
            {
              type: "MOBILE",
              code: "IN",
              value: values.phoneNumber,
              dialCode: "+91",
              primary: true,
            },
          ],
          emails: [
            {
              type: "OFFICE",
              value: values.email,
              primary: true,
            },
          ],
          designation: values.jobTitle,
          state: States.find((state) => state.countryId === values.state)?.name,
          city: Cities.find((city) => city.id === values.city)?.name,
          subSource: "Connplex",
        })
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
    }
  };

  const handleCallbackSuccess = async () => {
    try {
      const response = await axios.post(
        `https://api.kylas.io/v1/leads`,
        formData,
        {
          headers: {
            "api-key": "ca5d5c89-28fd-452b-adb8-cb7263cdd8d3:10770",
          },
        }
      );

      if (response.status == 200) {
        router.push("/thankyou");
      }else{
        setShowOTPModal(false);
      }
    } catch (error) {
      console.error("Kylas Contact us Saving Error", error);
      setShowOTPModal(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="w-full md:w-[300px]">
            <div
              className={`flex flex-col gap-2.5 items-center ${varient === "dark" ? "md:flex-col whitespace-normal" : ""
                }`}
            >
              <div className="w-full text-center text-white text-lg font-bold">
                Fill the Form Today
              </div>
              <div className="w-full flex flex-wrap text-center text-[#D3B15F] text-[25px] leading-[26px] font-semibold">
                Grab Our Special Franchise Offer!
              </div>
              <div className="w-full flex gap-[25px] justify-center md:mr-2 mb-2">
                <div>
                  <Field
                    as={InputField}
                    label="Your Name"
                    id="grid-first-name"
                    name="name"
                    type="text"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let value = e.target.value;
                      value = value.replace(/^\s+/, "");
                      value = value.replace(/\s{2,}/g, " ");

                      setFieldValue("name", value);
                    }}
                    className={`bg-white text-black block text-xs md:text-xs w-[138px] lg:w-[150px] h-[26px] md:h-[30px] border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none text-[12px] font-medium ${getIn(errors, "name") && getIn(touched, "name")
                      ? "border-red-500 mb-0.5"
                      : ""
                      }`}
                  />
                  {getIn(errors, "name") && getIn(touched, "name") && (
                    <div className="text-red-500 font-medium w-full  text-[12px]">
                      {getIn(errors, "name")}
                    </div>
                  )}
                </div>
                <div>
                  <Field
                    as={InputField}
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("email", e.target.value.trim());
                    }}
                    className={`bg-white text-black block text-xs md:text-xs w-[138px] lg:w-[150px] h-[26px] md:h-[30px] border border-[#73727366] rounded-lg text-[12px] font-medium py-2 px-4 focus:outline-none ${getIn(errors, "email") && getIn(touched, "email")
                      ? "border-red-500 mb-0.5"
                      : ""
                      }`}
                  />
                  {getIn(errors, "email") && getIn(touched, "email") && (
                    <div className="text-red-500 font-medium w-full  text-[12px]">
                      {getIn(errors, "email")}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex gap-[25px] justify-center md:mr-2 mb-2">
                <div>
                  <Field
                    as={NumberField}
                    id="grid-phoneNumber"
                    name="phoneNumber"
                    fontClasses="text-xs md:text-xs"
                    type="text"
                    label="Contact No."
                    required={true}
                    maxLength={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { value } = e.target;
                      if (/^\d{0,10}$/.test(value)) {
                        setFieldValue("phoneNumber", value);
                      }
                    }}
                    className={`bg-white text-black block !pl-8 w-[138px] lg:w-[150px] h-[26px] md:h-[30px] text-xs md:text-xs border border-[#73727366] text-[12px] font-medium rounded-lg py-2 px-1 focus:outline-none mb-0.5 ${getIn(errors, "phoneNumber") &&
                      getIn(touched, "phoneNumber")
                      ? "border-red-500"
                      : ""
                      }`}
                  />
                  {getIn(errors, "phoneNumber") &&
                    getIn(touched, "phoneNumber") && (
                      <div className="text-red-500 font-medium w-full  text-[12px]">
                        {getIn(errors, "phoneNumber")}
                      </div>
                    )}
                </div>
                <div>
                  <Field
                    as={InputField}
                    id="grid-job-title"
                    name="jobTitle"
                    type="text"
                    label="Job Title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      let value = e.target.value;
                      value = value.replace(/^\s+/, "");
                      value = value.replace(/\s{2,}/g, " ");

                      setFieldValue("jobTitle", value);
                    }}
                    className={`bg-white text-black block text-xs md:text-xs w-[138px] lg:w-[150px] h-[26px] md:h-[30px] border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none text-[12px] font-medium ${getIn(errors, "jobTitle") && getIn(touched, "jobTitle")
                      ? "border-red-500 mb-0.5"
                      : ""
                      }`}
                  />
                  {getIn(errors, "jobTitle") && getIn(touched, "jobTitle") && (
                    <div className="text-red-500 font-medium w-full  text-[12px]">
                      {getIn(errors, "jobTitle")}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex gap-[25px] justify-center md:mr-2 mb-2">
                <div>
                  <Select
                    searchable={true}
                    name="state"
                    label="State"
                    placeholder="Type your state"
                    className={`flex items-center justify-between text-[10px] w-[138px] lg:w-[150px] h-[26px] md:h-[30px] text-black font-medium border border-[rgba(115,114,115,0.4)] rounded-lg py-[7px] px-4 cursor-pointer bg-white focus:outline-none ${getIn(errors, "state") && getIn(touched, "state")
                      ? "border-red-500 mb-0.5"
                      : ""
                      }`}
                    options={States.map((state) => ({
                      label: state.name,
                      value: state.countryId,
                    }))}
                  />
                  {getIn(errors, "state") && getIn(touched, "state") && (
                    <div className="text-red-500 font-medium w-full  text-[12px]">
                      {getIn(errors, "state")}
                    </div>
                  )}
                </div>
                <div>
                  <Select
                    searchable={true}
                    name="city"
                    label="City"
                    placeholder="Type your city"
                    disabled={!values.state}
                    className={`flex items-center justify-between text-[10px] w-[138px] lg:w-[150px] h-[26px] md:h-[30px] text-black font-medium border border-[rgba(115,114,115,0.4)] rounded-lg py-[7px] px-4 cursor-pointer ${!values.state ? "!bg-black" : "!bg-white"
                      } focus:outline-none ${getIn(errors, "city") && getIn(touched, "city")
                        ? "border-red-500 mb-0.5"
                        : ""
                      }`}
                    options={Cities.filter(
                      (city) => city.stateId === values.state
                    ).map((city) => ({
                      label: city.name,
                      value: city.id,
                    }))}
                  />
                  {getIn(errors, "city") && getIn(touched, "city") && (
                    <div className="text-red-500 font-medium w-full  text-[12px]">
                      {getIn(errors, "city")}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <Field
                  as={Checkbox}
                  id="acceptTerms"
                  name="acceptTerms"
                  defaultChecked={true}
                  variant="White"
                />
                <label
                  htmlFor="acceptTerms"
                  className="font-medium text-[8px] pl-[6px] whitespace-nowrap text-white"
                >
                  By clicking here I consent to be contacted by a Connplex
                  representative.
                </label>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  type="submit"
                  className={`group cursor-pointer mt-5 px-10 py-[6.5px] h-[35px] rounded-full font-semibold text-xs bg-[#D3B15F] mb-2 flex items-center justify-center text-[12px] ${varient === "dark" ? "w-full" : ""
                    }`}
                >
                  Get Started
                  <svg
                    className={`block group-hover:hidden ml-2 xl:ml-2`}
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.52068 0.380981C4.60351 0.380981 0.533325 4.38123 0.533325 9.29839C0.533325 14.2156 4.60351 18.2857 9.52068 18.2857C14.4378 18.2857 18.4381 14.2156 18.4381 9.29839C18.4381 4.38123 14.4378 0.380981 9.52068 0.380981ZM12.7352 9.75573L7.96688 14.5241C7.7373 14.7536 7.36511 14.7536 7.13553 14.5241L6.48337 13.8719C6.25379 13.6423 6.25379 13.2701 6.48337 13.0406L9.76715 9.75678C10.0197 9.50426 10.018 9.09427 9.76326 8.84392L6.49044 5.62613C6.25753 5.39715 6.25596 5.02223 6.4869 4.79129L7.13812 4.14007C7.36668 3.91151 7.73688 3.91035 7.96684 4.13748L12.7323 8.84388C12.9861 9.09445 12.9873 9.5036 12.7352 9.75573Z"
                      fill="black"
                    />
                  </svg>
                  <svg
                    className={`hidden group-hover:block ml-2 xl:ml-2`}
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.52068 0.380981C4.60351 0.380981 0.533325 4.38123 0.533325 9.29839C0.533325 14.2156 4.60351 18.2857 9.52068 18.2857C14.4378 18.2857 18.4381 14.2156 18.4381 9.29839C18.4381 4.38123 14.4378 0.380981 9.52068 0.380981ZM12.7352 9.75573L7.96688 14.5241C7.7373 14.7536 7.36511 14.7536 7.13553 14.5241L6.48337 13.8719C6.25379 13.6423 6.25379 13.2701 6.48337 13.0406L9.76715 9.75678C10.0197 9.50426 10.018 9.09427 9.76326 8.84392L6.49044 5.62613C6.25753 5.39715 6.25596 5.02223 6.4869 4.79129L7.13812 4.14007C7.36668 3.91151 7.73688 3.91035 7.96684 4.13748L12.7323 8.84388C12.9861 9.09445 12.9873 9.5036 12.7352 9.75573Z"
                      fill="#D3B15F"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center mt-4">{errorMessage}</div>
            )}
          </Form>
        )}
      </Formik>

      <OTPModal
        submitUrl={"registration"}
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        mobileNumber={formData?.phoneNumbers?.[0]?.value || ""}
        countryCode={formData?.phoneNumbers?.[0]?.dialCode || ""}
        handleCallbackSuccess={handleCallbackSuccess}
      />

    </>
  );
};

export default MainForm;
