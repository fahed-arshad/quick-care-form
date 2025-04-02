import { GpSurgery } from "@/app/contact/page";
import { NextRequest, NextResponse } from "next/server";
import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";

interface RequestBody {
  ADDRESS: string;
  POSTCODE: string;
  UPRN: string;
  UDPRN: string;
  POST_TOWN: string;
  symptoms: string;
  duration: string;
  experiencedSymptomsBefore: string;
  previousSymptomsDetails: string;
  additionalInfo: string;
  mobileNumber: string;
  gpSurgery: GpSurgery;
  email: string;
  fullName: string;
  forenames: string;
  surname: string;
  dateOfBirth: string;
  sex: string;
  channel: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      ADDRESS,
      POSTCODE,
      UPRN,
      UDPRN,
      POST_TOWN,
      symptoms,
      duration,
      experiencedSymptomsBefore,
      previousSymptomsDetails,
      additionalInfo,
      mobileNumber,
      gpSurgery,
      email,
      fullName,
      forenames,
      surname,
      dateOfBirth,
      sex,
      channel,
    } = (await req.json()) as RequestBody;

    const form = new FormData();
    form.append("fullAddress", ADDRESS);
    form.append("postcode", POSTCODE);
    form.append("uprn", UPRN);
    form.append("udprn", UDPRN);
    form.append("city", POST_TOWN);
    form.append("symptoms", symptoms);
    form.append("duration", duration);
    form.append("experiencedSymptomsBefore", experiencedSymptomsBefore);
    form.append("previousSymptomsDetails", previousSymptomsDetails);
    form.append("additionalInfo", additionalInfo);
    form.append("mobileNumber", mobileNumber);
    form.append("surgeryName", gpSurgery.gpPracticeName); // Assuming gpSurgery is an object
    form.append("email", email);
    form.append("fullName", fullName);
    form.append("forenames", forenames);
    form.append("surname", surname);
    form.append("dateOfBirth", dateOfBirth);
    form.append("sex", sex);
    form.append("submittedAt", new Date().toISOString());
    form.append("channel", channel);
    form.append("pharmacyName", "KinWell Pharmacy");

    const response = await pharmaPalInstance.post("/chat/form", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": process.env.QUICK_CARE_API_KEY,
      },
    });

    return new NextResponse(JSON.stringify(response.data), {
      status: response.status,
    });
  } catch (error) {
    console.error("Error sending form data:", error);
    return new NextResponse("Error sending form data", { status: 500 });
  }
}
