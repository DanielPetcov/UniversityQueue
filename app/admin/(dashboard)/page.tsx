import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
    },
  });

  const courses = await prisma.course.findMany();
  const groups = await prisma.group.findMany();

  return (
    <div className="space-y-10">
      <div>
        <div>total users {students.length}</div>
        {students.map((student) => (
          <div key={student.id} className="grid grid-cols-3">
            <div>{student.id}</div>
            <div>{student.email}</div>
            <div>{student.user.name}</div>
          </div>
        ))}
      </div>
      <div>
        <div>total courses {courses.length}</div>
        {courses.map((course) => (
          <div key={course.id} className="grid grid-cols-3">
            <div>{course.id}</div>
            <div>{course.name}</div>
            <div>{course.dayOpen}</div>
            <div>{course.hourOpen.getUTCHours()}</div>
          </div>
        ))}
      </div>
      <div>
        <div>total groups {groups.length}</div>
        {groups.map((group) => (
          <div key={group.id} className="grid grid-cols-3">
            <div>{group.id}</div>
            <div>{group.name}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/admin/students/new">Create student</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/users/new">Create user</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/courses/new">Create course</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/groups/new">Create group</Link>
        </Button>
      </div>
    </div>
  );
}
