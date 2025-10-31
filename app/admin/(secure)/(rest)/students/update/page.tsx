"use client";

import { Prisma, Student, User } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentWithUser } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentWithUser[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  useEffect(() => {
    const getStudents = async () => {
      const response = await fetch("/api/students");
      if (response.ok) {
        const res: StudentWithUser[] = await response.json();
        setStudents(res);
      }
    };

    getStudents();
  }, []);

  const handleClick = () => {
    if (selectedStudent === null || selectedStudent === "") {
      toast.error("Select a student");
      return;
    }
    router.push(`/admin/students/update/${selectedStudent}`);
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Select a student</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={(v) => setSelectedStudent(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Student" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {students &&
                students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.user.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleClick}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
