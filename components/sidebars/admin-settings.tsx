"use client";

import { useEffect, useRef, useState } from "react";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminSettingsProps {
  userId: string | null;
}

export function AdminSettings({ userId }: AdminSettingsProps) {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    const getKey = async () => {
      const response = await fetch(`/api/admins/${userId}/key`);
      if (response.ok) {
        const res: string = await response.json();
        setKey(res);
      }
    };
    getKey();
  }, [userId]);

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <div className="flex flex-col gap-2 border-r pr-2">
        <Button
          variant={index === 0 ? "default" : "secondary"}
          onClick={() => setIndex(0)}
        >
          Info
        </Button>
        <Button
          variant={index === 1 ? "default" : "secondary"}
          onClick={() => setIndex(1)}
        >
          Actions
        </Button>
      </div>
      <div className="ml-2">
        {index === 0 && <AdminSettigsInfo adminKey={key} />}
        {index === 1 && <AdminSettigsActions />}
      </div>
    </div>
  );
}

function AdminSettigsInfo({ adminKey }: { adminKey: string | null }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    if (!adminKey) return;
    await navigator.clipboard.writeText(adminKey);
    setCopied(true);
    setOpen(true);

    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setCopied(false);
    }, 2000);
  };

  const handleLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setOpen(false);
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 text-sm">
        <div className="font-semibold">Admin key:</div>
        <div className="flex items-center gap-1">
          <span className="font-mono bg-muted px-2 py-1 rounded">
            {adminKey
              ? `${adminKey.slice(0, 4)}...${adminKey.slice(-4)}`
              : "Loading..."}
          </span>
          <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger asChild>
              <Copy
                onClick={handleCopy}
                onMouseLeave={handleLeave}
                className="w-5 h-5 cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>{copied ? "Copied!" : "Copy"}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function AdminSettigsActions() {
  return (
    <div>
      <Button variant="destructive">Delete account</Button>
    </div>
  );
}
