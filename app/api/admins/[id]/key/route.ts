import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (id.trim() === "") {
      throw new Error("ID is missing");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        admin: {
          select: {
            adminKey: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Could not find user");
    }

    if (!user.admin) {
      throw new Error("This user is not admin");
    }

    return NextResponse.json(user.admin.adminKey, { status: 200 });
  } catch (error) {
    console.log("ADMINS [ID] KEY | GET error: ", error);
    return NextResponse.json({ error: "Could not get key" }, { status: 400 });
  }
}
