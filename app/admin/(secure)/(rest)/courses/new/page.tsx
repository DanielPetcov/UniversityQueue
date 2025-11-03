"use client";

import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { NewCourseSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ErrorMessage from "@/components/form/error-message";
import LabelInputWrapper from "@/components/form/label-input-wrapper";

export default function NewCoursePage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewCourseSchema>>({
    defaultValues: {
      name: "",
    },
  });

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
        reset();
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
