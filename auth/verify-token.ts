import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function VerifyToken(token: string): Promise<boolean> {
  try {
    const tokenArray = token.split(".");
    if (tokenArray.length <= 1) return false;

    const sessionId = tokenArray[0].trim();
    const sessionSecret = tokenArray[1].trim();

    if (sessionId === "" || sessionSecret === "") return false;

    const session = await prisma.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!session) return false;

    const sessionExpirationTime = session.expiresAt.getTime();
    const currentTime = new Date().getTime();

    if (sessionExpirationTime < currentTime) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });
      return false;
    }

    const validSecret = bcrypt.compare(sessionSecret, session.secretHash);
    if (!validSecret) return false;

    return true;
  } catch (error) {
    return false;
  }
}
