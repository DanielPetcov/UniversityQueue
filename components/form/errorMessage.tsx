export default function ErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  return <span className="text-xs text-red-400">{message}</span>;
}
