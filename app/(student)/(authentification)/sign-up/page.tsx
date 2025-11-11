"use client";

import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpSchemaStudent } from "@/schemas";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "@/components/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function SignUpPageStudent() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } =
    useForm<z.infer<typeof SignUpSchemaStudent>>();

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchemaStudent>> = async (
    data
  ) => {
    try {
      setLoading(true);
      console.log(data);
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
        <h1>Sign up</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label>Name</Label>
            <Input {...register("name")} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Email</Label>
            <Input {...register("email")} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Admin key</Label>
            <Input {...register("adminKey")} />
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
