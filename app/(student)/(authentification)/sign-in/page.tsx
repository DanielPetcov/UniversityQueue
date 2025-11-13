"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import z from "zod";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

import { useUser } from "@/states";
import { SignInSchemaStudent } from "@/schemas";
import { StudentSignInResponse } from "@/interfaces";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { LabelInputWrapper, ErrorMessage } from "@/components/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SignInPagePublic() {
  const router = useRouter();
  const { setUserId, setUserName } = useUser();
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchemaStudent>>();

  const onSubmit: SubmitHandler<z.infer<typeof SignInSchemaStudent>> = async (
    data
  ) => {
    try {
      setLoading(true);

      const response = await fetch("/api/students/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const res: StudentSignInResponse = await response.json();
        setUserId(res.userId);
        setUserName(res.userName);
        toast.success("Succesfully logged in");
        router.push("/");
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
        <h1 className="font-semibold">Sign-in as Student</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} type="email" />
            {errors.email && <ErrorMessage message={errors.email.message} />}
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
        <p className="space-x-1 text-xs">
          <span>or</span>
          <Link href="/sign-up" className="hover:underline">
            Sign-up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
