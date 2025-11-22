"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, User, Shield } from "lucide-react";

export default function HowToPage() {
  return (
    <div className="min-h-screen bg-muted/20 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            How to Use the Platform
          </h1>
          <p className="text-muted-foreground">
            A simple guide to help students and administrators get started.
          </p>
        </header>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <CardTitle>For Students</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              To create an account, you will need an <strong>Admin Key</strong>.
              This key must be provided by your group leader (the administrator
              of your study group).
            </p>

            <p>
              If you are the first person in your class to discover this
              platform, you should contact your group leader and ask them to
              create an admin account at:
            </p>

            <div className="bg-muted p-3 rounded-md font-mono text-xs">
              {process.env.NEXT_PUBLIC_DOMAIN_URL}/admin/sign-up
            </div>

            <p>
              If your group leader is unavailable, you may become the admin
              yourself — but
              <strong> keep in mind:</strong>
            </p>

            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                Each group can have <strong>only one admin</strong>.
              </li>
              <li>
                Admin ownership <strong>cannot be transferred</strong>.
              </li>
            </ul>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-yellow-600">
              <AlertTriangle className="w-4 h-4" />
              <span>
                Make sure you trust the admin — they control the entire group.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <CardTitle>For Admins</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>To become an admin, create an account at:</p>

            <div className="bg-muted p-3 rounded-md font-mono text-xs">
              {process.env.NEXT_PUBLIC_DOMAIN_URL}/admin/sign-up
            </div>

            <p>
              Once your account is created, open the <strong>Settings</strong>{" "}
              page and copy your
              <Badge variant="outline" className="mx-1">
                Admin Key
              </Badge>
              . Share this key with students who want to join your group.
            </p>

            <p>
              After students join, you can start creating{" "}
              <strong>Course</strong> entities. Students will be able to
              subscribe to these courses and join queues.
            </p>

            <Separator />

            <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-800 text-sm space-y-2">
              <strong>Important Warning</strong>
              <p>
                If you delete your admin account from the Settings page, the
                system will also delete:
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>Your entire group</li>
                <li>All associated students</li>
                <li>All courses and queue data</li>
              </ul>

              <p className="font-medium">This action is permanent.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
