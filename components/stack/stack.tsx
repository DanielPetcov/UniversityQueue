import { StackItem } from "./stack-item";

interface StackProps {
  data: {
    id: string;
    name: string;
    date: Date;
  }[];
}

export function Stack({ data }: StackProps) {
  return (
    <div className="border max-w-[100px]">
      <div className="flex items-center gap-5">
        {data.map((item, index) => (
          <StackItem key={index} index={index} {...item} />
        ))}
      </div>
    </div>
  );
}
