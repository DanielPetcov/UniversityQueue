import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { generateSecureRandomString } from "./create-session";

export async function UpdateSession(
  sessionId: string
): Promise<{ token: string; expirationDate: Date }> {
  const newSecret = generateSecureRandomString();
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(newSecret, salt);

  const additionalMs = 1000 * 60 * 60 * 24 * 7; // 7 days
  const newExpiresAt = new Date(Date.now() + additionalMs);

  await prisma.session.update({
    where: { id: sessionId },
    data: {
      secretHash: hashed,
      expiresAt: newExpiresAt,
    },
  });

  const token = `${sessionId}.${newSecret}`;
  return { token: token, expirationDate: newExpiresAt };
}
