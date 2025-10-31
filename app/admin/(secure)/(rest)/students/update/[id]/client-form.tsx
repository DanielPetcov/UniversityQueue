"use client";

import { Group, Student } from "@/app/generated/prisma/client";
import LabelInputWrapper from "@/components/form/label-input-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UpdateStudentSchema } from "@/schemas";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";

interface ClientFormProps {
  student: Student;
  groups: Group[];
}

export function ClientForm({ student, groups }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof UpdateStudentSchema>
  >({
    defaultValues: {
      email: student.email,
      groupId: student.groupId || undefined,
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
            <LabelInputWrapper>
              <Label>Group</Label>
              <Select
                defaultValue={student.groupId || ""}
                onValueChange={(v) => setValue("groupId", v)}
              >
                <SelectTrigger>
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
