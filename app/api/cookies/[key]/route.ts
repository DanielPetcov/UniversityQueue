import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const param = await params;
    if (param.key.trim().length === 0) {
      throw new Error("Missing key");
    }

    const cookie = await cookies();
    cookie.delete(param.key);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("COURSES | POST error: ", error);
    return NextResponse.json(
      { error: "Could not create course" },
      { status: 400 }
    );
  }
}
