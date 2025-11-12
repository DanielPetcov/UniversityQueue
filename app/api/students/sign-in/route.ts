import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { SignInSchemaStudent } from "@/schemas";
import { createSession, UpdateSession } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignInSchemaStudent> = await req.json();

    if (data.email.trim() === "") {
      throw new Error("Email is missing");
    }

    if (data.password.trim() === "") {
      throw new Error("Password is missing");
    }

    const student = await prisma.student.findUnique({
      where: {
        email: data.email,
      },
      select: {
        userId: true,
        user: {
          select: {
            name: true,
            password: true,
          },
        },
      },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    const validPassword = await bcrypt.compare(
      data.password,
      student.user.password
    );

    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const session = await prisma.session.findFirst({
      where: { userId: student.userId },
      orderBy: { createdAt: "desc" },
    });

    const cookie = await cookies();
    const now = Date.now();

    if (!session) {
      const token = await createSession(student.userId);
      cookie.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json(
        { userId: student.userId, userName: student.user.name },
        { status: 200 }
      );
    }

    if (now > session.expiresAt.getTime()) {
      await prisma.session.delete({ where: { id: session.id } });
      const token = await createSession(student.userId);
      cookie.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json(
        { userId: student.userId, userName: student.user.name },
        { status: 200 }
      );
    }

    const { token, expirationDate } = await UpdateSession(session.id);

    cookie.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor((expirationDate.getTime() - Date.now()) / 1000),
    });

    return NextResponse.json(
      { userId: student.userId, userName: student.user.name },
      { status: 200 }
    );
  } catch (error) {
    console.log("STUDENT SIGN-IN | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-in" }, { status: 400 });
  }
}
