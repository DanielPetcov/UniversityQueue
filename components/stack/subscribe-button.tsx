"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import z from "zod";
import { toast } from "sonner";

import { SubscribeSchema } from "@/schemas";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "../form";

interface SubscribeButtonProps {
  studentId: string;
  stackId: string;
}

export function SubscribeButton({ studentId, stackId }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<z.infer<typeof SubscribeSchema>>();
  const Subscribe: SubmitHandler<z.infer<typeof SubscribeSchema>> = async (
    data
  ) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stacks/${stackId}/entries`, {
        method: "POST",
        body: JSON.stringify({ studentId: studentId, comment: data.comment }),
      });

      if (response.ok) {
        toast.success("Successfully subscribed");
        location.reload();
      } else {
        throw new Error("Could not subscribe");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(Subscribe)} className="space-y-4 w-fit">
      <LabelInputWrapper>
        <Label>Optional Comment</Label>
        <Input {...register("comment")} />
      </LabelInputWrapper>
      <Button type="submit" disabled={loading} className="w-full">
        Subscribe
      </Button>
    </form>
  );
}
