import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { NewCourseSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany();

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log("COURSES | GET error: ", error);
    return NextResponse.json(
      { error: "Could not get course" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof NewCourseSchema> = await req.json();

    const course = await prisma.course.create({
      data: {
        name: data.name,
        stack: {
          create: {},
        },
        group: {
          connect: {
            id: data.groupId,
          },
        },
      },
    });

    if (!course) {
      throw new Error("Could not create course");
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("COURSES | POST error: ", error);
    return NextResponse.json(
      { error: "Could not create course" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const courses = await prisma.course.deleteMany();

    if (!courses) {
      throw new Error("Could not delete all courses");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("COURSES | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete courses" },
      { status: 400 }
    );
  }
}
