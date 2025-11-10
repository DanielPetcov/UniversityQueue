"use client";

import { StackEntry } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";

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
      const entry: StackEntry = await response.json();
      console.log(entry);
    }
  };

  return <Button onClick={Subscribe}>Subscribe</Button>;
}
