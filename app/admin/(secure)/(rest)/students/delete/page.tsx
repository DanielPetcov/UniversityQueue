"use client";

import { Student, User } from "@/app/generated/prisma/client";
import ErrorMessage from "@/components/form/error-message";
import LabelInputWrapper from "@/components/form/label-input-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogPortal } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StudentWithUser } from "@/interfaces";
import { DeleteStudentSchema } from "@/schemas";
import { useActionDialog } from "@/states";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function DeleteStudentsPage() {
  const [students, setStudents] = useState<StudentWithUser[]>([]);
  const router = useRouter();
  const { openDialog } = useActionDialog();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof DeleteStudentSchema>>();

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

  const onSubmit: SubmitHandler<z.infer<typeof DeleteStudentSchema>> = async (
    data
  ) => {
    try {
      if (!data.id) {
        setError("id", {
          message: "Student is required",
        });
        return;
      }
      await handleDelete(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (studentId: string) => {
    openDialog({
      title: "Delete student?",
      description: "This will permanently remove the student.",
      onConfirm: async () => {
        const response = await fetch(`/api/students/${studentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Succesfully deleted");
          router.replace("/admin");
        } else {
          toast.error("Something went wrong");
        }
      },
    });
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Delete a student</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <LabelInputWrapper>
            <Select
              onValueChange={(v) => {
                setValue("id", v);
                clearErrors("id");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.user.name}
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
      </CardContent>
    </Card>
  );
}
