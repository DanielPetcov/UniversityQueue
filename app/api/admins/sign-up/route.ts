import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  } catch (error) {
    console.log("ADMIN SIGN-UP | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-up" }, { status: 400 });
  }
}
