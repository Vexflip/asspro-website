import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  badge?: string;
  href?: string;
  cta?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  description,
  image,
  badge,
  href,
  cta,
  icon,
  className,
  children,
}: CardProps) {
  const content = (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group",
        className
      )}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {badge && (
            <div className="absolute top-3 left-3">
              <Badge>{badge}</Badge>
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && <p className="text-muted text-sm leading-relaxed">{description}</p>}
        {children}
        {cta && (
          <p className="mt-4 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            {cta} →
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
