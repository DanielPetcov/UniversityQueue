import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";

import { hashPassword } from "@/auth/hash-password";
import { NewStudentSchema } from "@/schemas";

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

    if (data.name.trim() === "") {
      throw new Error("Name is missing");
    }

    if (data.email.trim() === "") {
      throw new Error("Email is missing");
    }

    if (data.password.trim() === "") {
      throw new Error("Password is missing");
    }

    if (data.userId.trim() === "") {
      throw new Error("User ID is missing");
    }

    const admin = await prisma.user.findUnique({
      where: {
        id: data.userId,
        admin: {
          NOT: undefined,
        },
        role: {
          equals: "ADMIN",
        },
      },
      include: {
        admin: {
          select: {
            adminKey: true,
          },
        },
      },
    });

    if (!admin || !admin.admin) {
      throw new Error("Could not find admin");
    }

    const group = await prisma.group.findUnique({
      where: { adminKey: admin.admin.adminKey },
    });

    if (!group) {
      throw new Error("Group not found");
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
        userId: user.id,
        email: data.email,
        groupId: group.id,
      },
    });

    if (!student) {
      throw new Error("Could not create student");
    }

    // await prisma.user.update({
    //   where: {
    //     id: user.id,
    //   },
    //   data: {
    //     student: {
    //       connect: student,
    //     },
    //   },
    // });

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
