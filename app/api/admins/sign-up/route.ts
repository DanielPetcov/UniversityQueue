import { NextRequest, NextResponse } from "next/server";

import z from "zod";
import prisma from "@/lib/prisma";

import { generateAdminKey } from "@/actions";
import { SignUpSchemaAdmin } from "@/schemas";
import { hashPassword } from "@/auth/hash-password";

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof SignUpSchemaAdmin> = await req.json();

    if (data.name.trim() === "") {
      throw new Error("Name is missing");
    }

    if (data.password.trim() === "") {
      throw new Error("Password is missing");
    }

    if (data.groupName.trim() === "") {
      throw new Error("Group name is missing");
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    if (!user) {
      throw new Error("Could not create user");
    }

    const admin = await prisma.admin.create({
      data: {
        adminKey: await generateAdminKey(),
        user: {
          connect: user,
        },
      },
    });

    if (!admin) {
      throw new Error("Could not create admin");
    }

    const group = prisma.group.create({
      data: {
        name: data.groupName,
        admin: {
          connect: {
            adminKey: admin.adminKey,
          },
        },
      },
    });

    if (!group) {
      throw new Error("Could not create group");
    }

    return NextResponse.json(
      { userId: user.id, userName: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.log("ADMIN SIGN-UP | POST error: ", error);
    return NextResponse.json({ error: "Could not sign-up" }, { status: 400 });
  }
}
