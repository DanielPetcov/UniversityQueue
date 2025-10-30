import { hashPassword } from "@/auth/hash-password";
import prisma from "@/lib/prisma";
import { NewUserSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("USERS | GET error: ", error);
    return NextResponse.json({ error: "Could not get users" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof NewUserSchema> = await req.json();

    if (data.name.trim().length === 0) {
      throw new Error("Name is not present");
    }

    if (data.password.trim().length === 0) {
      throw new Error("Password is not present");
    }

    const hashedPassword = await hashPassword(data.name);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
        admin: data.admin,
      },
    });

    if (!user) {
      throw new Error("Could not create user");
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("USERS | POST error: ", error);
    return NextResponse.json(
      { error: "Could not create users" },
      { status: 400 }
    );
  }
}
