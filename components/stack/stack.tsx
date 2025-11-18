import { StackItem } from "./stack-item";

interface StackProps {
  entries: {
    id: string;
    userName: string;
    label: string | null;
    createdAt: Date;
    canDelete: boolean;
  }[];
}

export function Stack({ entries }: StackProps) {
  return (
    <div className="flex items-center gap-5">
      {entries.map((entry, index) => (
        <StackItem index={index} key={entry.id} {...entry} />
      ))}
    </div>
  );
}
