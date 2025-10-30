import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";
import { SignInSchemaPublic } from "@/schemas";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { createSession, generateSecureRandomString } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignInSchemaPublic> = await req.json();

    if (data.email.trim().length === 0) {
      throw new Error("Email is missing");
    }

    if (data.password.trim().length === 0) {
      throw new Error("Password is missing");
    }

    const student = await prisma.student.findUnique({
      where: {
        email: data.email,
      },
      include: {
        user: true,
      },
    });

    if (!student) {
      throw new Error("Could not find student");
    }

    const validPassword = await bcrypt.compare(
      data.password,
      student.user.password
    );

    if (!validPassword) {
      throw new Error("Password is not valid");
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
      return NextResponse.json({ status: 200 });
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
      return NextResponse.json({ status: 200 });
    }

    const newSecret = generateSecureRandomString();
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(newSecret, salt);

    const additionalMs = 1000 * 60 * 60 * 24 * 7; // 7 days
    const newExpiresAt = new Date(Date.now() + additionalMs);

    await prisma.session.update({
      where: { id: session.id },
      data: {
        secretHash: hashed,
        expiresAt: newExpiresAt,
      },
    });

    const token = `${session.id}.${newSecret}`;

    cookie.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor((newExpiresAt.getTime() - Date.now()) / 1000),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("SIGN-IN | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-in" }, { status: 400 });
  }
}
