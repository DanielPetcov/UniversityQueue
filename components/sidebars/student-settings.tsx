"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { LabelInputWrapper } from "../form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { UpdatePasswordStudentSchema } from "@/schemas";
import { toast } from "sonner";

interface StudentSettingsProps {
  userId: string | null;
  userName: string | null;
}

export function StudentSettings({ userId, userName }: StudentSettingsProps) {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-0">
      <div className="flex sm:flex-col gap-2 sm:border-r pr-2">
        <Button
          variant={index === 0 ? "default" : "secondary"}
          onClick={() => setIndex(0)}
          className="grow sm:grow-0"
        >
          Info
        </Button>
        <Button
          variant={index === 1 ? "default" : "secondary"}
          onClick={() => setIndex(1)}
          className="grow sm:grow-0"
        >
          Actions
        </Button>
      </div>
      <div className="sm:ml-2">
        {index === 0 && userId && userName && (
          <AdminSettigsInfo userName={userName} userId={userId} />
        )}
        {index === 1 && <AdminSettigsActions />}
      </div>
    </div>
  );
}

function AdminSettigsInfo({
  userName,
  userId,
}: {
  userName: string;
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, resetField } =
    useForm<z.infer<typeof UpdatePasswordStudentSchema>>();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const getEmail = async () => {
      try {
        console.log("fetching");
        const response = await fetch(`/api/student/${userId}`);
        if (response.ok) {
          const email: string = await response.json();

          setUserEmail(email);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEmail();
    setValue("userId", userId);
  }, []);

  const onSubmit: SubmitHandler<
    z.infer<typeof UpdatePasswordStudentSchema>
  > = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/student/changePassword`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Succesfully changed");
        resetField("currentPassword");
        resetField("newPassword");
        setChangePassword(false);
      } else {
        throw new Error("error on fetching");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setChangePassword(false);
    resetField("currentPassword");
    resetField("newPassword");
  };
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
        <form
          className="space-y-2 border-t pt-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <LabelInputWrapper>
            <Label>Current Password</Label>
            <Input {...register("currentPassword")} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>New Password</Label>
            <Input {...register("newPassword")} />
          </LabelInputWrapper>
          <div>
            <Button
              type="button"
              disabled={loading}
              onClick={handleCancel}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="ml-2">
              Change
            </Button>
          </div>
        </form>
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
