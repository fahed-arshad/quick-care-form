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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
}
