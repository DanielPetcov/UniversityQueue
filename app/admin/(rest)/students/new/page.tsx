"use client";

import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import NewStudentSchema from "@/schemas/student";
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

export default function NewStudentPage() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    register,
    handleSubmit,
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
        toast.success("Student created");
      }
    } catch {
      console.log("An error occured");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-2">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name can not be empty" })}
              />
              {errors.name && (
                <span className="text-xs text-red-400">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email", { required: "Email can not be empty" })}
                type="email"
              />
              {errors.email && (
                <span className="text-xs text-red-400">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
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
                <span className="text-xs text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button disabled={loading} className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
