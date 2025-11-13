"use client";

import { useEffect, useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/states";
import { NewCourseSchema } from "@/schemas";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabelInputWrapper, ErrorMessage } from "@/components/form";

export default function NewCoursePage() {
  const { userId } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof NewCourseSchema>>({
    defaultValues: {
      name: "",
      userId: "",
    },
  });

  useEffect(() => {
    if (!userId) return;
    setValue("userId", userId);
  }, [userId]);

  const onSubmit: SubmitHandler<z.infer<typeof NewCourseSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);

      const response = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resetField("name");
        toast.success("Course created");
      } else {
        throw new Error("Response was not ok");
      }
    } catch {
      console.log("An error occured");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name can not be empty" })}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </LabelInputWrapper>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
