"use client";

import { Course, Group } from "@/app/generated/prisma/client";
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

export default function UpdateGroupsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    const getGroups = async () => {
      const response = await fetch("/api/groups");
      if (response.ok) {
        const res: Group[] = await response.json();
        setGroups(res);
      }
    };

    getGroups();
  }, []);

  const handleClick = () => {
    if (selectedGroup === null || selectedGroup === "") {
      toast.error("Select a group");
      return;
    }
    router.push(`/admin/groups/update/${selectedGroup}`);
  };

  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Select a group</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={(v) => setSelectedGroup(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Group" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {groups &&
                groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
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
