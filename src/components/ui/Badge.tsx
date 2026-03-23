import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "teal" | "muted";
  className?: string;
}

const variants = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  teal: "bg-accent-teal/10 text-accent-teal",
  muted: "bg-surface text-muted",
};

export default function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-semibold rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
