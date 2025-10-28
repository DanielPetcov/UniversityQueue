import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";
import NewStudentSchema from "@/schemas/student";

export async function GET(req: NextRequest) {
  try {
    const students = await prisma.student.findMany();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.log("STUDENTS | GET error: ", error);
    return NextResponse.json(
      { error: "Could not get students" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof NewStudentSchema> = await req.json();

    const user = await prisma.user.create({
      data: {
        name: data.name,
        password: data.password,
      },
    });

    if (!user) {
      throw new Error("Could not create user");
    }

    const student = await prisma.student.create({
      data: {
        email: data.email,
        userId: user.id,
      },
    });

    if (!student) {
      throw new Error("Could not create student");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        student: {
          connect: student,
        },
      },
    });

    return NextResponse.json(student, { status: 200 });
  } catch (error) {
    console.log("STUDENTS | POST error: ", error);
    return NextResponse.json(
      { error: "Could not create student" },
      { status: 400 }
    );
  }
}
