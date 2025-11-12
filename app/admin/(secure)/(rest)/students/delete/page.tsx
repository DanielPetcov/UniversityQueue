"use client";

import { useEffect, useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { deleteAllStudents } from "@/actions";
import { StudentWithUser } from "@/interfaces";
import { useActionDialog, useUser } from "@/states";
import { DeleteStudentSchema } from "@/schemas";

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

export default function DeleteStudentsPage() {
  const { userId } = useUser();
  const { openDialog } = useActionDialog();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<StudentWithUser[]>([]);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof DeleteStudentSchema>>();

  useEffect(() => {
    if (!userId) return;
    const getStudents = async () => {
      const response = await fetch(`/api/admins/${userId}/students`);
      if (response.ok) {
        const res: StudentWithUser[] = await response.json();
        setStudents(res);
      }
    };

    getStudents();
  }, [userId]);

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
        try {
          setLoading(true);
          const response = await fetch(`/api/students/${studentId}`, {
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
      title: "Delete all students?",
      description: "This will permanently remove all students.",
      onConfirm: async () => {
        try {
          setLoading(true);
          await deleteAllStudents(userId);
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
        <CardTitle>Delete a student</CardTitle>
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
          <Button className="w-full" type="submit" disabled={loading}>
            Delete
          </Button>
        </form>
        <div className="text-center">OR</div>
        <Button
          className="w-full"
          variant="destructive"
          onClick={handleDeleteAll}
          disabled={loading}
        >
          Delete All
        </Button>
      </CardContent>
    </Card>
  );
}
