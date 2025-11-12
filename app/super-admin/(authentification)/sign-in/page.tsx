"use client";

import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/states";
import { SignInSchemaSuperAdmin } from "@/schemas";
import { SuperAdminSingInResponse } from "@/interfaces";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "@/components/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignInPageSuperAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUserId, setUserName } = useUser();
  const { register, handleSubmit } =
    useForm<z.infer<typeof SignInSchemaSuperAdmin>>();

  const onSubmit: SubmitHandler<
    z.infer<typeof SignInSchemaSuperAdmin>
  > = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/super-admin/sign-in`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const res: SuperAdminSingInResponse = await response.json();
        setUserId(res.userId);
        setUserName(res.userName);
        toast.success("Succesfully logged in");
        router.push("/super-admin/");
      } else [toast.error("Something went wrong")];
    } catch (error) {
      console.log(error);
      toast.error("An error occured", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1>Sign in</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label>Name</Label>
            <Input {...register("name")} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Password</Label>
            <Input {...register("password")} />
          </LabelInputWrapper>
          <Button className="w-full" type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
