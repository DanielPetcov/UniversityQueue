"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Course } from "@/app/generated/prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/states";

export default function UpdateCoursesPage() {
  const { userId } = useUser();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    const getCourses = async () => {
      const response = await fetch(`/api/admins/${userId}/courses`);
      if (response.ok) {
        const res: Course[] = await response.json();
        setCourses(res);
      }
    };

    getCourses();
  }, [userId]);

  const handleClick = () => {
    if (selectedCourse === null || selectedCourse === "") {
      toast.error("Select a course");
      return;
    }
    router.push(`/admin/courses/update/${selectedCourse}`);
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Select a course</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={(v) => setSelectedCourse(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {courses &&
                courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
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
