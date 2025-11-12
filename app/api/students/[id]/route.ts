import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";

import { UpdateStudentSchema } from "@/schemas";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (id.trim().length === 0) {
      throw new Error("Id is missing");
    }

    const data: z.infer<typeof UpdateStudentSchema> = await req.json();
    if (data.email.trim().length === 0) {
      throw new Error("Name is missing");
    }

    const student = await prisma.student.update({
      where: {
        id: id,
      },
      data: data,
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.log("STUDENTS [ID] | PUT error: ", error);
    return NextResponse.json(
      { error: "Could not update student" },
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

    const student = await prisma.student.delete({
      where: {
        id: id,
      },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.log("STUDENTS [ID] | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete student" },
      { status: 400 }
    );
  }
}
