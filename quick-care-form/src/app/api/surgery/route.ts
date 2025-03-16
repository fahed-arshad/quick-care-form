import { AxiosError } from "axios";
import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await pharmaPalInstance.get("/surgery");

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({ error }, { status: error?.status });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
