import { redirect } from "next/navigation";
import { VerifyToken } from "./verify-token";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { deleteCookie } from "@/actions";

export async function VerifyValidateToken(
  token: RequestCookie,
  redirectUrl: string
) {
  const validToken = VerifyToken(token.value);
  if (!validToken) {
    try {
      await deleteCookie("token");
    } catch {
      console.log("A network error occured");
    } finally {
      redirect(redirectUrl);
    }
  }
}
