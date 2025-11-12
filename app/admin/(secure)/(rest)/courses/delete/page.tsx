"use client";

import { deleteAllCourses } from "@/actions";
import { Course } from "@/app/generated/prisma/client";
import { LabelInputWrapper, ErrorMessage } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteCourseSchema } from "@/schemas";
import { useActionDialog, useUser } from "@/states";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function DeleteCoursesPage() {
  const { userId } = useUser();
  const { openDialog } = useActionDialog();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof DeleteCourseSchema>>();

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
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof DeleteCourseSchema>> = async (
    data
  ) => {
    try {
      if (!data.id) {
        setError("id", {
          message: "Course is required",
        });
        return;
      }
      await handleDelete(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (courseId: string) => {
    openDialog({
      title: "Delete course?",
      description: "This will permanently remove the course.",
      onConfirm: async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/courses/${courseId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            toast.success("Succesfully deleted");
            location.reload();
          } else {
            throw new Error("Something went wrong");
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleDeleteAll = async () => {
    openDialog({
      title: "Delete all courses?",
      description: "This will permanently remove all courses.",
      onConfirm: async () => {
        try {
          setLoading(true);
          await deleteAllCourses(userId);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Delete a course</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputWrapper>
            <Select
              onValueChange={(v) => {
                setValue("id", v);
                clearErrors("id");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id && <ErrorMessage message={errors.id.message} />}
          </LabelInputWrapper>
          <Button className="w-full" type="submit">
            Delete
          </Button>
        </form>
        <div className="text-center">OR</div>
        <Button
          className="w-full"
          variant="destructive"
          onClick={handleDeleteAll}
        >
          Delete ALL
        </Button>
      </CardContent>
    </Card>
  );
}
