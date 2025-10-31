"use client";

import z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewUserSchema } from "@/schemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessage from "@/components/form/error-message";
import LabelInputWrapper from "@/components/form/label-input-wrapper";
import { toast } from "sonner";

export default function NewUserPage() {
  const [loading, setLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof NewUserSchema>>({
    defaultValues: {
      name: "",
      password: "",
      admin: false,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof NewUserSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        reset();
        toast.success("User created");
      } else {
        throw new Error("Response was not ok");
      }
    } catch {
      console.log("An error occured");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>New User</CardTitle>
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
            <Label htmlFor="password">Password</Label>
            <InputGroup>
              <InputGroupInput
                id="password"
                {...register("password", {
                  minLength: {
                    value: 5,
                    message: "Password can not be less than 5 characters",
                  },
                  required: "Password can not be null",
                })}
                type={visiblePassword ? "text" : "password"}
              />
              <InputGroupAddon align="inline-end">
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
          <LabelInputWrapper>
            <Label>Is Admin</Label>
            <Select
              defaultValue="false"
              onValueChange={(v) =>
                setValue("admin", v === "true" ? true : false)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">False</SelectItem>
                <SelectItem value="true">True</SelectItem>
              </SelectContent>
            </Select>
            {errors.admin && <ErrorMessage message={errors.admin.message} />}
          </LabelInputWrapper>
          <Button disabled={loading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
