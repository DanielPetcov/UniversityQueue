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
          create: true,
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
