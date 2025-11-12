import { randomBytes } from "crypto";

export async function generateAdminKey(): Promise<string> {
  return randomBytes(32).toString("hex");
}
