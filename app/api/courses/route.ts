import { NextRequest, NextResponse } from "next/server";
import z from "zod";

import { NewCourseSchema } from "@/schemas";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany();

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log("COURSES | GET error: ", error);
    return NextResponse.json(
      { error: "Could not get course" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof NewCourseSchema> = await req.json();

    if (data.name.trim() === "") {
      throw new Error("Name is missing");
    }

    if (data.userId.trim() === "") {
      throw new Error("User ID is missing");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
        admin: {
          NOT: undefined,
        },
        role: {
          equals: "ADMIN",
        },
      },
      include: {
        admin: {
          select: {
            adminKey: true,
          },
        },
      },
    });

    if (!user || !user.admin) {
      throw new Error("Could not find user");
    }

    const course = await prisma.course.create({
      data: {
        name: data.name,
        stack: {
          create: {},
        },
        group: {
          connect: {
            adminKey: user.admin.adminKey,
          },
        },
      },
    });

    if (!course) {
      throw new Error("Could not create course");
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("COURSES | POST error: ", error);
    return NextResponse.json(
      { error: "Could not create course" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const courses = await prisma.course.deleteMany();

    if (!courses) {
      throw new Error("Could not delete all courses");
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("COURSES | DELETE error: ", error);
    return NextResponse.json(
      { error: "Could not delete courses" },
      { status: 400 }
    );
  }
}
