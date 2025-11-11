"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpSchemaAdmin } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LabelInputWrapper } from "@/components/form";

export default function SignUpPageAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignUpSchemaAdmin>>();

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchemaAdmin>> = async (
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
            <Label>Password</Label>
            <Input {...register("password")} />
          </LabelInputWrapper>
        </form>
      </CardContent>
    </Card>
  );
}
