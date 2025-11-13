"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import z from "zod";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpSchemaStudent } from "@/schemas";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "@/components/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SignUpPageStudent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } =
    useForm<z.infer<typeof SignUpSchemaStudent>>();

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchemaStudent>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/students/sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Succesfully created. Now log in.");
        router.push("/sign-in");
      }
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
        <h1 className="font-semibold">Sign up as Student</h1>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <p className="space-x-1 text-xs">
          <span>or</span>
          <Link href="/sign-in" className="hover:underline">
            Sign-in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
