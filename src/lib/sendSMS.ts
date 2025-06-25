import axios from "axios";

const USERNAME = process.env.OTP_USERNAME;
const PASSWORD = process.env.OTP_PASSWORD;
const SENDERID = process.env.OTP_SENDERID;
const CONTENTID = process.env.OTP_CONTENTID;

export type OTPSendOptions = {
  unicode: boolean;
  templateId?: number;
};

export const sendSMS = async (
  countryCode: string,
  mobileNumber: string,
  textMessage: string
) => {
  try {
    if (!USERNAME || !PASSWORD || !SENDERID || !CONTENTID) {
      throw new Error("Missing required environment variables");
    }

    // textMessage = encodeURIComponent(textMessage);

    const MOBILE_NUMBER_WITH_COUNTRY_CODE =
      countryCode?.trim().replaceAll("+", "") + mobileNumber?.trim();

    const API_PARAM = {
      username: USERNAME,
      password: PASSWORD,
      mobile: MOBILE_NUMBER_WITH_COUNTRY_CODE,
      message: textMessage,
      senderid: SENDERID,
      contentid: CONTENTID,
    };

    const response = await axios.post(
      "https://gateway.leewaysoftech.com/xml-transconnect-api.php",
      null,
      {
        params: API_PARAM,
      }
    );

    const data = response.data;

    if (response.status === 200) {
      return data;
    } else {
      throw {
        response: {
          data: {
            success: false,
            message:
              data.description ||
              "OTP Send Failed, Please try again after sometime.",
            error: null,
          },
        },
      };
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
