"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface SubscribeButtonProps {
  studentId: string;
  stackId: string;
}

export function SubscribeButton({ studentId, stackId }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const Subscribe = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stacks/${stackId}/entries`, {
        method: "POST",
        body: JSON.stringify({ studentId }),
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
    <Button onClick={Subscribe} disabled={loading}>
      Subscribe
    </Button>
  );
}
