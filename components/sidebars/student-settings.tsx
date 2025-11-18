"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

interface StudentSettingsProps {
  userId: string | null;
  userName: string | null;
}

export function StudentSettings({ userId, userName }: StudentSettingsProps) {
  const [index, setIndex] = useState(0);

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
        {index === 0 && <AdminSettigsInfo userName={userName} />}
        {index === 1 && <AdminSettigsActions />}
      </div>
    </div>
  );
}

function AdminSettigsInfo({ userName }: { userName: string | null }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1 text-sm">
        <p>
          <span>Name: </span>
          {userName || "Loading..."}
        </p>
        <p>
          <span>Email: </span>
          {userEmail || "Loading"}
        </p>
      </div>
      {!changePassword && (
        <div>
          <Button onClick={() => setChangePassword(true)}>
            Change password
          </Button>
        </div>
      )}

      {changePassword && (
        <div>
          <Button onClick={() => setChangePassword(false)}>Cancel</Button>
        </div>
      )}
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
