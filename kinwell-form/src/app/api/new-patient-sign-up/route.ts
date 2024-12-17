import { NextRequest, NextResponse } from "next/server";
import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";
import { AxiosError } from "axios";

interface RequestBody {
  fullName: string;
  dateOfBirth: Date;
  email?: string;
  mobileNumber?: string;
  pharmacyName: string;
  addressLine1: string;
  postcode: string;
  surgeryName: string;
  city: string;
  fullAddress: string;
  uprn: string;
  udprn: string;
  sex: string;
  nominatedPharmacy: boolean;
  receiveHealthcareUpdates: boolean;
  referral: string;
  newSignUp: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;

    const response = await pharmaPalInstance.post("/patient/sign-up", body, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_AUTH_TOKEN,
      },
    });

    return new NextResponse(JSON.stringify(response.data), {
      status: response.status,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error signing up new customer:", error.message);
    }
    return new NextResponse("Error signing up new customer", { status: 500 });
  }
}
