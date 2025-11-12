"use client";

import Link from "next/link";
import { useState } from "react";

import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignUpSchemaAdmin } from "@/schemas";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LabelInputWrapper } from "@/components/form";

export default function SignUpPageAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } =
    useForm<z.infer<typeof SignUpSchemaAdmin>>();

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchemaAdmin>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admins/sign-up`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Succesfully created. Now log in.");
        router.push("/admin");
      } else {
        throw new Error("Something went wrong");
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
        <h1 className="font-semibold">Sign-up as Admin</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label>Name</Label>
            <Input {...register("name")} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Password</Label>
            <Input {...register("password")} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Group Name</Label>
            <Input {...register("groupName")} />
          </LabelInputWrapper>
          <Button className="w-full" type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
        <p className="space-x-1 text-xs">
          <span>or</span>
          <Link href="/admin/sign-in" className="hover:underline">
            Sign-in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
