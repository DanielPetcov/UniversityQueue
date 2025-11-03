import prisma from "@/lib/prisma";
import { UpdateCourseSchema } from "@/schemas";
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

    const data: z.infer<typeof UpdateCourseSchema> = await req.json();
    if (data.name.trim().length === 0) {
      throw new Error("Name is missing");
    }

    const course = await prisma.course.update({
      where: {
        id: id,
      },
      data: data,
    });

    if (!course) {
      throw new Error("Course not found");
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("COURSES [ID] | PUT error: ", error);
    return NextResponse.json(
      { error: "Could not update course" },
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

    const course = await prisma.course.delete({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new Error("Course not found");
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("COURSES [ID] | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete course" },
      { status: 400 }
    );
  }
}
