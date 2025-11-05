import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";
import { NewStudentSchema } from "@/schemas";
import { hashPassword } from "@/auth/hash-password";

export async function GET(req: NextRequest) {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: {
          omit: {
            password: true,
          },
        },
      },
    });
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

    if (data.name.trim().length === 0) {
      throw new Error("Name is not present");
    }

    if (data.email.trim().length === 0) {
      throw new Error("Email is not present");
    }

    if (data.password.trim().length === 0) {
      throw new Error("Password is not present");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
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

export async function DELETE(req: NextRequest) {
  try {
    const students = await prisma.student.deleteMany();

    if (!students) {
      throw new Error("Could not delete all students");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("STUDENTS | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete students" },
      { status: 400 }
    );
  }
}
