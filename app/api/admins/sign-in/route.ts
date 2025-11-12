import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

import { SignInSchemaAdmin } from "@/schemas";
import { createSession, UpdateSession } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignInSchemaAdmin> = await req.json();

    if (data.name.trim() === "") {
      throw new Error("Name is missing");
    }

    if (data.password.trim() === "") {
      throw new Error("Password is missing");
    }

    const user = await prisma.user.findUnique({
      where: {
        name: data.name,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const session = await prisma.session.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const cookie = await cookies();
    const now = Date.now();

    if (!session) {
      const token = await createSession(user.id);
      cookie.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json(user.id, { status: 200 });
    }

    if (now > session.expiresAt.getTime()) {
      await prisma.session.delete({ where: { id: session.id } });
      const token = await createSession(user.id);
      cookie.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return NextResponse.json(user.id, { status: 200 });
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
      { userId: user.id, userName: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.log("ADMIN SIGN-IN | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-in" }, { status: 400 });
  }
}
