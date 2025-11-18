"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface StackItemProps {
  id: string;
  userName: string;
  label: string | null;
  createdAt: Date;
  canDelete: boolean;
  index: number;
}

export function StackItem({
  id,
  userName,
  label,
  createdAt,
  canDelete,
  index,
}: StackItemProps) {
  const [loading, setLoading] = useState(false);
  const shortenedName = userName.split(" ");
  const initials =
    shortenedName.length >= 2
      ? shortenedName[0][0] + shortenedName[1][0]
      : userName.slice(0, 2);

  const formattedDate = createdAt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = createdAt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stacks/${id}/entries/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Succesfully deleted");
        location.reload();
      } else {
        throw new Error("An error ocurred");
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="relative group">
        <div
          className={cn(
            "w-10 lg:w-15 h-10 lg:h-15 rounded-full bg-linear-to-br shadow-sm hover:shadow-md transition-all duration-200",
            canDelete
              ? "from-blue-200 to bg-cyan-300"
              : "from-pink-200 to-red-300"
          )}
        >
          <div className="flex h-full items-center justify-center">
            <span
              className={cn(
                "text-sm font-semibold transition-colors",
                canDelete
                  ? "text-blue-700 group-hover:text-cyan-900"
                  : "text-red-700 group-hover:text-red-900"
              )}
            >
              {initials.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 text-[10px] lg:text-sm font-medium bg-white/80 px-1 rounded-md shadow-sm">
          #{index + 1}
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="w-56 rounded-xl border border-neutral-200 shadow-lg bg-white/95 backdrop-blur-md p-3 space-y-3"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm lg:text-sm font-medium text-neutral-800">
            {userName}
          </div>
          <span className="text-sm font-light">{label}</span>
        </div>

        <div className="text-xs lg:text-sm text-neutral-500 border-t border-neutral-100 pt-2 space-y-1">
          <div className="flex justify-between">
            <span className="font-medium text-neutral-600">Date:</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-neutral-600">Time:</span>
            <span>{formattedTime}</span>
          </div>
        </div>

        {canDelete && (
          <div className="pt-1 border-t border-neutral-100">
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
