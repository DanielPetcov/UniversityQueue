"use client";

import { Prisma } from "@/app/generated/prisma/client";
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
import { UpdateUserSchema } from "@/schemas";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";

interface ClientFormProps {
  user: Prisma.UserGetPayload<{
    omit: {
      password: true;
    };
  }>;
}

export function ClientForm({ user }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof UpdateUserSchema>
  >({
    defaultValues: {
      name: user.name,
      admin: user.admin,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateUserSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${user.id}`, {
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
        <CardTitle>User details</CardTitle>
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
              <Label>Is user admin</Label>
              <Select
                defaultValue={user.admin === true ? "true" : "false"}
                onValueChange={(v) =>
                  v === "true"
                    ? setValue("admin", true)
                    : setValue("admin", false)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">TRUE</SelectItem>
                  <SelectItem value="false">FALSE</SelectItem>
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
