import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";

import { SignUpSchemaStudent } from "@/schemas";
import { hashPassword } from "@/auth/hash-password";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignUpSchemaStudent> = await req.json();

    if (data.name.trim() === "") {
      throw new Error("Name is missing");
    }

    if (data.email.trim() === "") {
      throw new Error("Email is missing");
    }

    if (data.password.trim() === "") {
      throw new Error("Password is missing");
    }

    if (data.adminKey.trim() === "") {
      throw new Error("Admin key is missing");
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

    const group = await prisma.group.findUnique({
      where: { adminKey: data.adminKey },
    });

    if (!group) {
      throw new Error("Group not found");
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
    console.log("STUDENTS SIGN-UP | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-up" }, { status: 400 });
  }
}
