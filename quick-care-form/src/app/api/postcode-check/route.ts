import { NextRequest, NextResponse } from "next/server";
import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";

interface RequestBody {
  postcode: string;
}

export async function POST(req: NextRequest) {
  try {
    const { postcode } = (await req.json()) as RequestBody;

    const response = await pharmaPalInstance.post(
      "chat/address-lookup",
      {
        postcode,
      },
      {
        headers: {
          "x-api-key": process.env.QUICK_CARE_API_KEY,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
}
