"use client";

import { Course, Group, Student, User } from "@/app/generated/prisma/client";
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
import { DeleteGroupSchema } from "@/schemas";
import { useActionDialog } from "@/states";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function DeleteGroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const router = useRouter();
  const { openDialog } = useActionDialog();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof DeleteGroupSchema>>();

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

  const onSubmit: SubmitHandler<z.infer<typeof DeleteGroupSchema>> = async (
    data
  ) => {
    try {
      if (!data.id) {
        setError("id", {
          message: "Group is required",
        });
        return;
      }
      await handleDelete(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (groupId: string) => {
    openDialog({
      title: "Delete group?",
      description: "This will permanently remove the group.",
      onConfirm: async () => {
        const response = await fetch(`/api/groups/${groupId}`, {
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
        <CardTitle>Delete a group</CardTitle>
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
