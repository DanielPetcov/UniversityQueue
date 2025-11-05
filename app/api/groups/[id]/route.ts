import prisma from "@/lib/prisma";
import { UpdateGroupSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (id.trim().length === 0) {
      throw new Error("Id is missing");
    }

    const data: z.infer<typeof UpdateGroupSchema> = await req.json();
    if (data.name.trim().length === 0) {
      throw new Error("Name is missing");
    }

    const group = await prisma.group.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        students: {
          set: data.students,
        },
      },
    });

    if (!group) {
      throw new Error("Group not found");
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.log("GROUPS [ID] | PUT error: ", error);
    return NextResponse.json(
      { error: "Could not update group" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (id.trim().length === 0) {
      throw new Error("Id is missing");
    }

    const group = await prisma.group.delete({
      where: {
        id: id,
      },
    });

    if (!group) {
      throw new Error("Group not found");
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.log("GROUPS [ID] | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete group" },
      { status: 400 }
    );
  }
}
