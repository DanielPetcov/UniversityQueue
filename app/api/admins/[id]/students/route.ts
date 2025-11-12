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

    const students = await prisma.student.findMany({
      where: {
        group: {
          adminKey: user.admin.adminKey,
        },
      },
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
    console.log("ADMINS [ID] STUDENTS | GET error: ", error);
    return NextResponse.json(
      { error: "Could not get students" },
      { status: 400 }
    );
  }
}

export async function DELETE(
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

    const students = await prisma.student.deleteMany({
      where: {
        group: {
          adminKey: user.admin.adminKey,
        },
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.log("ADMINS [ID] STUDENTS | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete students" },
      { status: 400 }
    );
  }
}
