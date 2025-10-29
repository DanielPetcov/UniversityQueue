import prisma from "@/lib/prisma";

export async function GetUserIdToken(token: string): Promise<string> {
  const tokenArray = token.split(".");

  const sessionId = tokenArray[0].trim();
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) return "";
  return session.userId;
}
