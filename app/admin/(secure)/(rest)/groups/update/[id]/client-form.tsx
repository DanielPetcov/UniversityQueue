"use client";

import { Group } from "@/app/generated/prisma/client";
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

import { UpdateGroupSchema } from "@/schemas";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";

interface ClientFormProps {
  group: Group;
}

export function ClientForm({ group }: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<
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

            <Button disabled={loading} className="w-full" type="submit">
              Update
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
