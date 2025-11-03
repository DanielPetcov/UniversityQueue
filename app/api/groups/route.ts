import z from "zod";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { NewGroupSchema } from "@/schemas";

export async function GET(req: NextRequest) {
  try {
    const groups = await prisma.group.findMany();
    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.log("GROUPS | GET error: ", error);
    return NextResponse.json({ error: "Could not get group" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof NewGroupSchema> = await req.json();

    const group = await prisma.group.create({
      data: {
        name: data.name,
      },
    });

    if (!group) {
      throw new Error("Could not create group");
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.log("GROUPS | POST error: ", error);
    return NextResponse.json(
      { error: "Could not create group" },
      { status: 400 }
    );
  }
}
