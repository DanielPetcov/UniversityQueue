import { GetUserIdToken } from "@/auth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Stack, SubscribeButton } from "@/components/stack";

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

  const stackData = stack.stackEntries.map((e) => ({
    id: e.id,
    date: e.createdAt,
    name: e.student.user.name,
  }));

  let isSubscribed = false;
  if (stack.stackEntries.some((v) => v.student.user.id === userId)) {
    isSubscribed = true;
  }

  return (
    <div>
      {course.name}
      <Stack data={stackData} />
      {!isSubscribed && (
        <SubscribeButton studentId={student.id} stackId={stack.id} />
      )}
    </div>
  );
}
