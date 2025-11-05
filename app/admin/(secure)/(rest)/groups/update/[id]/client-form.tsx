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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { GroupWithStudents } from "@/interfaces";

import { UpdateGroupSchema } from "@/schemas";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";

interface ClientFormProps {
  group: GroupWithStudents;
  students: Student[];
}

export function ClientForm({ group, students }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const [freeStudents, setFreeStudents] = useState<Student[]>([]);
  const [localStudents, setLocalStudents] = useState<Student[]>([]);

  useEffect(() => {
    setLocalStudents(group.students);
    setValue("students", group.students);
  }, [group]);

  useEffect(() => {
    setFreeStudents(students);
  }, [students]);

  const { register, handleSubmit, setValue, getValues } = useForm<
    z.infer<typeof UpdateGroupSchema>
  >({
    defaultValues: {
      name: group.name,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateGroupSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/groups/${group.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Succesfully updated");
        location.reload();
      } else {
        throw new Error("An error ocurred");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = (student: Student) => {
    setLocalStudents((prev) => prev.filter((s) => s.id !== student.id));
    setFreeStudents((prev) => [...prev, student]);
    setValue(
      "students",
      getValues("students").filter((s) => s.id !== student.id)
    );
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Group details</CardTitle>
        <CardDescription>
          You can modify and save any details to update them.
        </CardDescription>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <LabelInputWrapper>
              <Label>Name</Label>
              <Input {...register("name")} />
            </LabelInputWrapper>

            <LabelInputWrapper>
              <Label>Manage Students</Label>
              <Select
                onValueChange={(v) => {
                  const student = freeStudents.find((s) => s.id === v);
                  if (!student) return;
                  setLocalStudents((prev) => [...prev, student]);
                  setFreeStudents((prev) =>
                    prev.filter((s) => s.id !== student.id)
                  );
                  setValue("students", [...getValues("students"), student]);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Add student" />
                </SelectTrigger>
                <SelectContent>
                  {freeStudents
                    .sort((a, b) =>
                      a.email.toLowerCase().localeCompare(b.email.toLowerCase())
                    )
                    .map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.email}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Separator />
              <div className="space-y-2">
                {localStudents
                  .sort((a, b) =>
                    a.email.toLowerCase().localeCompare(b.email.toLowerCase())
                  )
                  .map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs">{student.email}</span>
                      <Button
                        size={"icon-sm"}
                        onClick={() => removeStudent(student)}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
              </div>
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
