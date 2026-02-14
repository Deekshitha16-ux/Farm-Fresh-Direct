import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-xl font-bold text-foreground",
        className
      )}
    >
      <Leaf className="h-6 w-6 text-primary" />
      <span className="font-headline">Farm Fresh Direct</span>
    </Link>
  );
}
