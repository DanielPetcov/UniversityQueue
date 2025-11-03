"use client";

import { User } from "@/app/generated/prisma/client";
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
import { DeleteUserSchema } from "@/schemas";
import { useActionDialog } from "@/states";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function DeleteUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const { openDialog } = useActionDialog();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof DeleteUserSchema>>();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/users");
      if (response.ok) {
        const res: User[] = await response.json();
        setUsers(res);
      }
    };

    getUsers();
  }, []);

  const onSubmit: SubmitHandler<z.infer<typeof DeleteUserSchema>> = async (
    data
  ) => {
    try {
      if (!data.id) {
        setError("id", {
          message: "User is required",
        });
        return;
      }
      await handleDelete(data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId: string) => {
    openDialog({
      title: "Delete user?",
      description: "This will permanently remove the user.",
      onConfirm: async () => {
        const response = await fetch(`/api/users/${userId}`, {
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
        <CardTitle>Delete a user</CardTitle>
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
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
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
