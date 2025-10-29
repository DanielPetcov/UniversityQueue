import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";
import { SignInSchemaAdmin } from "@/schemas";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignInSchemaAdmin> = await req.json();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("SIGN-IN | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-in" }, { status: 400 });
  }
}
