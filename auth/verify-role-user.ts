import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { GetUserIdToken } from "./get-userId-token";
import prisma from "@/lib/prisma";

export async function VerifyRoleUserStudent(
  token: RequestCookie
): Promise<boolean> {
  const userId = await GetUserIdToken(token.value);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "STUDENT") {
    return false;
  }

  return true;
}

export async function VerifyRoleUserAdmin(
  token: RequestCookie
): Promise<boolean> {
  const userId = await GetUserIdToken(token.value);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return false;
  }

  return true;
}
export async function VerifyRoleUserSuperAdmin(
  token: RequestCookie
): Promise<boolean> {
  const userId = await GetUserIdToken(token.value);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== "SUPER_ADMIN") {
    return false;
  }

  return true;
}
