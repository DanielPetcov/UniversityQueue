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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ErrorMessage from "@/components/form/error-message";
import LabelInputWrapper from "@/components/form/label-input-wrapper";
import { TimePicker } from "@/components/form/time-picker";

import { DayOfWeek } from "@/app/generated/prisma/enums";

export default function NewCoursePage() {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewCourseSchema>>({
    defaultValues: {
      name: "",
      dayOpen: "MONDAY",
      hourOpen: "00:00",
    },
  });

  useEffect(() => {
    if (!date) return;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    setValue(
      "hourOpen",
      `${hours <= 9 ? "0" : ""}${hours}:${minutes <= 9 ? "0" : ""}${minutes}`
    );
  }, [date]);

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
          <LabelInputWrapper>
            <div>Select when to start the queue</div>
            <div className="flex items-end  gap-2">
              <div className="grid gap-1 text-center">
                <Label htmlFor="day" className="text-xs">
                  Day
                </Label>
                <Select
                  defaultValue={"MONDAY"}
                  onValueChange={(v) => setValue("dayOpen", v as DayOfWeek)}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MONDAY">Monday</SelectItem>
                    <SelectItem value="TUESDAY">Tuesday</SelectItem>
                    <SelectItem value="WEDNESDAY">Wednesday</SelectItem>
                    <SelectItem value="THURSDAY">Thursday</SelectItem>
                    <SelectItem value="FRIDAY">Friday</SelectItem>
                    <SelectItem value="SATURDAY">Saturday</SelectItem>
                    <SelectItem value="SUNDAY">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TimePicker date={date} setDate={setDate} />
            </div>
          </LabelInputWrapper>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
