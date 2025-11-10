"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SubscribeButtonProps {
  studentId: string;
  stackId: string;
}

export function SubscribeButton({ studentId, stackId }: SubscribeButtonProps) {
  const Subscribe = async () => {
    console.log("data", studentId, stackId);
    const response = await fetch(`/api/stacks/${stackId}/entries`, {
      method: "POST",
      body: JSON.stringify({ studentId }),
    });

    if (response.ok) {
      toast.success("Successfully subscribed");
      location.reload();
    } else {
      toast.error("Could not subscribe");
    }
  };

  return <Button onClick={Subscribe}>Subscribe</Button>;
}
