import Link from "next/link";
import { FadeIn } from "./fade-in";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  icon = "inbox",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <FadeIn className="w-full flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-24 h-24 bg-card border border-border/50 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <span className="material-symbols-outlined text-4xl text-muted-foreground opacity-50">
          {icon}
        </span>
      </div>
      <h3 className="font-heading text-2xl uppercase font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="font-sans text-muted-foreground max-w-md mb-8">
        {description}
      </p>
      
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="bg-primary text-primary-foreground font-sans uppercase tracking-wider px-6 py-3 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group text-sm font-medium"
        >
          <span>{actionLabel}</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      )}
    </FadeIn>
  );
}
