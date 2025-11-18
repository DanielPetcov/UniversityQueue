import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (id.trim() === "") {
      throw new Error("Id is missing");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        student: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!user || !user.student) {
      throw new Error("User not found");
    }

    return NextResponse.json(user.student.email, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
