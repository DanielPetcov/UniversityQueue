"use client";

import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { NewStudentSchema } from "@/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ErrorMessage from "@/components/form/error-message";
import LabelInputWrapper from "@/components/form/label-input-wrapper";

export default function NewStudentPage() {
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewStudentSchema>>();

  const onSubmit: SubmitHandler<z.infer<typeof NewStudentSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch("/api/students", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        toast.success("Student created");
      } else {
        throw new Error("Response was not ok");
      }
    } catch (error) {
      console.log("An error occured: ", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>New Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <LabelInputWrapper>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name can not be empty" })}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              {...register("email", { required: "Email can not be empty" })}
              type="email"
            />
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
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
