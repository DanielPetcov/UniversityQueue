import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";

import { SubscribeSchema } from "@/schemas";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ stackId: string }> }
) {
  try {
    const { stackId } = await params;
    const {
      studentId,
      comment,
    }: z.infer<typeof SubscribeSchema> & { studentId: string } =
      await req.json();
    const stackEntry = await prisma.stackEntry.create({
      data: {
        stackId: stackId,
        studentId: studentId,
        label: comment,
      },
    });

    return NextResponse.json(stackEntry, { status: 200 });
  } catch (error) {
    console.log("STACKS ID ENTRIES ID | POST error: ", error);
    return NextResponse.json(
      { error: "Could not register a new stack entry" },
      { status: 400 }
    );
  }
}
