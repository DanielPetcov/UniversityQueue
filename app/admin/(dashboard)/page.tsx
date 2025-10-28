import prisma from "@/lib/prisma";

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
            <div>{course.hourOpen.getDate()}</div>
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
    </div>
  );
}
