import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { NewCourseSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof NewCourseSchema> = await req.json();

    const course = await prisma.course.create({
      data: {
        name: data.name,
        dayOpen: data.dayOpen,
        hourOpen: new Date(`2025-01-01T${data.hourOpen}:00Z`),
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
