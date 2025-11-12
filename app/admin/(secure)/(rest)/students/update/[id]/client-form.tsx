"use client";

import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { UpdateStudentSchema } from "@/schemas";
import { Student } from "@/app/generated/prisma/client";

import { LabelInputWrapper } from "@/components/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientFormProps {
  student: Student;
}

export function ClientForm({ student }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof UpdateStudentSchema>
  >({
    defaultValues: {
      email: student.email,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateStudentSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/students/${student.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Succesfully updated");
      } else {
        throw new Error("An error ocurred");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Student details</CardTitle>
        <CardDescription>
          You can modify and save any details to update them.
        </CardDescription>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <LabelInputWrapper>
              <Label>Email</Label>
              <Input {...register("email")} />
            </LabelInputWrapper>

            <Button disabled={loading} className="w-full" type="submit">
              Update
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
