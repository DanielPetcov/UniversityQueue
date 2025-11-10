import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface StackItemProps {
  id: string;
  name: string;
  date: Date;
  index: number;
}

export function StackItem({ id, name, index }: StackItemProps) {
  return (
    <Popover>
      <PopoverTrigger>open</PopoverTrigger>
      <PopoverContent>
        <div key={id} className="relative">
          <div className="w-10 h-10 bg-red-200 rounded-full">
            <div className="flex h-full items-center justify-center">
              <span className="text-xs opacity-50">{name.slice(0, 2)}</span>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 text-xs">#{index + 1}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
