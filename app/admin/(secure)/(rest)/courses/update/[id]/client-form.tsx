"use client";

import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { Course } from "@/app/generated/prisma/client";
import { UpdateCourseSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "@/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientFormProps {
  course: Course;
}

export function ClientForm({ course }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<
    z.infer<typeof UpdateCourseSchema>
  >({
    defaultValues: {
      name: course.name,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateCourseSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${course.id}`, {
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
        <CardTitle>Course details</CardTitle>
        <CardDescription>
          You can modify and save any details to update them.
        </CardDescription>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <LabelInputWrapper>
              <Label>Name</Label>
              <Input {...register("name")} />
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
