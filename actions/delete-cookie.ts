export async function deleteCookie(key: string) {
  await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/cookies/${key}`, {
    method: "DELETE",
  });
}
