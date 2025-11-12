import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
        admin: {
          NOT: undefined,
        },
      },
      include: {
        admin: {
          select: {
            group: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.admin || !user.admin.group) {
      throw new Error("Could not find user or user group");
    }

    return NextResponse.json(
      { groupId: user.admin.group.id, groupName: user.admin.group.name },
      { status: 200 }
    );
  } catch (error) {
    console.log("ADMINS [ID] GROUP ID | GET error: ", error);
    return NextResponse.json(
      { error: "Could not get group id" },
      { status: 400 }
    );
  }
}
