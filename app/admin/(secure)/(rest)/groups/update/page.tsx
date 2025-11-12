"use client";

import { useEffect, useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/states";
import { UpdateGroupName } from "@/interfaces";
import { UpdateGroupSchema } from "@/schemas";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "@/components/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpdateGroupsPage() {
  const { userId } = useUser();
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } =
    useForm<z.infer<typeof UpdateGroupSchema>>();

  useEffect(() => {
    if (!userId) return;
    const getGroup = async () => {
      const response = await fetch(`/api/admins/${userId}/groupId`);
      if (response.ok) {
        const res: UpdateGroupName = await response.json();
        setGroupId(res.groupId);
        setGroupName(res.groupName);
      }
    };
    getGroup();
  }, [userId]);

  useEffect(() => {
    setValue("name", groupName);
  }, [groupName]);

  const onSubmit: SubmitHandler<z.infer<typeof UpdateGroupSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      if (!groupId) {
        throw new Error("Group ID is missing");
      }
      const response = await fetch(`/api/groups/${groupId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Succesfully updated");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Update group</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label>Name</Label>
            <Input {...register("name")} />
          </LabelInputWrapper>
          <Button className="w-full" type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
