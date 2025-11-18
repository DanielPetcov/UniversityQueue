import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

import { GetUserIdToken } from "@/auth";

import { Stack, SubscribeButton } from "@/components/stack";
import { Separator } from "@/components/ui/separator";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!course) {
    redirect("/");
  }

  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token) return;
  const userId = await GetUserIdToken(token.value);
  const student = await prisma.student.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!student) {
    redirect("/");
  }

  if (course.groupId !== student.groupId) {
    redirect("/");
  }

  const stack = await prisma.stack.findUnique({
    where: {
      courseId: course.id,
    },
    include: {
      stackEntries: {
        select: {
          id: true,
          createdAt: true,
          label: true,
          student: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!stack) {
    return <div>no stack were found</div>;
  }

  const stackEntries = stack.stackEntries.map((e) => ({
    id: e.id,
    userName: e.student.user.name,
    label: e.label,
    createdAt: e.createdAt,
    canDelete: student.userId === e.student.user.id,
  }));

  let isSubscribed = false;
  if (stack.stackEntries.some((v) => v.student.user.id === userId)) {
    isSubscribed = true;
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-lg font-semibold">{course.name}</p>
        <p>Total queue: {stackEntries.length}</p>
      </div>
      <Stack entries={stackEntries} />

      {!isSubscribed && (
        <>
          <Separator />
          <SubscribeButton studentId={student.id} stackId={stack.id} />
        </>
      )}
    </div>
  );
}
