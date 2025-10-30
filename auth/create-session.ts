import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export function generateSecureRandomString(): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);

  let id = "";
  for (let i = 0; i < bytes.length; i++) {
    id += alphabet[bytes[i] >> 3];
  }

  return id;
}

export async function createSession(userId: string): Promise<string> {
  const sessionSecret = generateSecureRandomString();
  const salt = await bcrypt.genSalt();
  const sessionSecretHashed = await bcrypt.hash(sessionSecret, salt);

  const currentTime = new Date().getTime();
  const differenceTime = 1000 * 60 * 60 * 24 * 7;
  const expirationDate = new Date(currentTime + differenceTime);

  const session = await prisma.session.create({
    data: {
      userId: userId,
      secretHash: sessionSecretHashed,
      expiresAt: expirationDate,
    },
  });

  const token = session.id + "." + sessionSecret;
  return token;
}
