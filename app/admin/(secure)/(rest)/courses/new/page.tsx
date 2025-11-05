"use client";

import z from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { NewCourseSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ErrorMessage from "@/components/form/error-message";
import LabelInputWrapper from "@/components/form/label-input-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Group } from "@/app/generated/prisma/client";

export default function NewCoursePage() {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof NewCourseSchema>>({
    defaultValues: {
      name: "",
      groupId: "",
    },
  });

  useEffect(() => {
    const getGroups = async () => {
      const response = await fetch("/api/groups");
      if (response.ok) {
        const res: Group[] = await response.json();
        setGroups(res);
      }
    };

    getGroups();
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof NewCourseSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      if (data.groupId.trim() === "") {
        setError("groupId", {
          message: "Group ID can not be empty",
        });
        return;
      }

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
          <LabelInputWrapper>
            <Label htmlFor="group">
              Select the group it will be related to
            </Label>
            <Select
              onValueChange={(v) => {
                setValue("groupId", v);
                clearErrors("groupId");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.groupId && (
              <ErrorMessage message={errors.groupId.message} />
            )}
          </LabelInputWrapper>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
