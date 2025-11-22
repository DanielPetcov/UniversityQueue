"use client";

import { Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HowTo() {
  return (
    <Card className="max-w-xs gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          <span className="text-sm">For new people here</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs space-y-2">
          <p>
            Visit that link in order to learn how this platform works and how to
            start using it.
          </p>
          <Link href="/how-to" className="text-blue-600 hover:underline">
            {process.env.NEXT_PUBLIC_DOMAIN_URL + "/how-to"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
