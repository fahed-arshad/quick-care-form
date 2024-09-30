import { NextRequest, NextResponse } from "next/server";
import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";

interface RequestBody {
  postcode: string;
}

export async function POST(req: NextRequest) {
  try {
    const { postcode } = (await req.json()) as RequestBody;
    const response = await pharmaPalInstance(
      "https://api.os.uk/search/places/v1/postcode",
      {
        params: {
          key: process.env.NEXT_PUBLIC_OS_PLACES_API_KEY,
          postcode: postcode.trim(),
        },
      }
    );

    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: error?.status });
  }
}
