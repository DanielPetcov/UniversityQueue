import { hashPassword } from "@/auth/hash-password";
import prisma from "@/lib/prisma";
import { UpdatePasswordStudentSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PUT(req: NextRequest) {
  try {
    const {
      userId,
      currentPassword,
      newPassword,
    }: z.infer<typeof UpdatePasswordStudentSchema> = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const correctPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!correctPassword) {
      throw new Error("Incorect password");
    }

    const hashedNewPassword = await hashPassword(newPassword);
    const changed = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedNewPassword,
      },
    });

    if (!changed) {
      throw new Error("Password could not be changed");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
  }
}
