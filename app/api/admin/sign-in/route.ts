import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";
import { SignInSchema } from "@/schemas";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignInSchema> = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        name: data.name,
        password: data.password,
      },
    });

    if (!user) {
      throw new Error("Could not sign-in");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("SIGN-IN | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-in" }, { status: 400 });
  }
}
