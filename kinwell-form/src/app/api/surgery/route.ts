import { pharmaPalInstance } from "../lib/pharma-bal-backend.instance";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await pharmaPalInstance.get("/surgery");

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: error?.status });
  }
}
