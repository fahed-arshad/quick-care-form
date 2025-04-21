import { NextRequest, NextResponse } from "next/server";
import axios, { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const { email, pin } = await req.json();

    const response = await axios.post(
      `${process.env.QUICK_CARE_API_URL}/pharmacy/login`,
      { email, pin },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.BACKEND_API_KEY,
        },
      }
    );

    return new NextResponse(JSON.stringify(response.data), {
      status: response.status,
    });
  } catch (error: any) {
    if (isAxiosError(error)) {
      return new NextResponse(error.response?.data.message, {
        status: error.response?.status || 500,
      });
    }
    return new NextResponse(
      JSON.stringify({ error: "Failed to login to pharmacy" }),
      { status: error.response?.status || 500 }
    );
  }
}
