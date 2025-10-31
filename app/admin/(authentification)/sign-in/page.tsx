"use client";

import z from "zod";

import { SignInSchemaAdmin } from "@/schemas";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import LabelInputWrapper from "@/components/form/label-input-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import ErrorMessage from "@/components/form/error-message";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInPageAdmin() {
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
  } = useForm<z.infer<typeof SignInSchemaAdmin>>();

  const onSubmit: SubmitHandler<z.infer<typeof SignInSchemaAdmin>> = async (
    data
  ) => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.replace("/admin");
      } else {
        throw new Error("Failed to login");
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
        <h1>Sign-in</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label htmlFor="password">Password</Label>
            <InputGroup>
              <InputGroupInput
                {...register("password", {
                  minLength: {
                    value: 5,
                    message: "Password can not be less than 5 characters",
                  },
                  required: "Password can not be null",
                })}
                type={visiblePassword ? "text" : "password"}
              />
              <InputGroupAddon align={"inline-end"}>
                <div onClick={togglePasswordVisibility}>
                  {visiblePassword ? (
                    <EyeClosed className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </div>
              </InputGroupAddon>
            </InputGroup>
            {errors.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </LabelInputWrapper>
          <Button disabled={loading} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
