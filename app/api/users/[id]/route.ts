import prisma from "@/lib/prisma";
import { UpdateUserSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (id.trim().length === 0) {
      throw new Error("Id was not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        admin: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("User was not found");
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("USERS [ID] | GET error: ", error);
    return NextResponse.json({ error: "Could not get user" }, { status: 400 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (id.trim().length === 0) {
      throw new Error("Id is missing");
    }

    const data: z.infer<typeof UpdateUserSchema> = await req.json();
    if (data.name.trim().length === 0) {
      throw new Error("Name is missing");
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("USERS [ID] | PUT error: ", error);
    return NextResponse.json(
      { error: "Could not update user" },
      { status: 400 }
    );
  }
}
