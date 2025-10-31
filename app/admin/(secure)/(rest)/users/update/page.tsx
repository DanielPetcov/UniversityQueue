"use client";

import { User } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UpdateUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/users");
      if (response.ok) {
        const res: User[] = await response.json();
        setUsers(res);
      }
    };

    getUsers();
  }, []);

  const handleClick = () => {
    if (selectedUser === null || selectedUser === "") {
      toast.error("Select a user");
      return;
    }
    router.push(`/admin/users/update/${selectedUser}`);
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Select a user</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={(v) => setSelectedUser(v)}>
            <SelectTrigger>
              <SelectValue placeholder="User" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {users &&
                users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button className="w-full" onClick={handleClick}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
