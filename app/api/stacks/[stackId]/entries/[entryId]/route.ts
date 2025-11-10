import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ stackId: string; entryId: string }> }
) {
  try {
    const { entryId } = await params;

    const entry = await prisma.stackEntry.delete({
      where: {
        id: entryId,
      },
    });

    if (!entry) {
      throw new Error("Failed to delete");
    }

    return NextResponse.json(entry, { status: 200 });
  } catch (error) {
    console.log("STACKS ID ENTRIES ID | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete a stack entry" },
      { status: 400 }
    );
  }
}
