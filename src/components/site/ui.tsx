import { Link, type LinkProps } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Plus } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/site";

export const buttonStyles = cva(
  "label inline-flex min-h-13 w-full items-center justify-center gap-3 px-7 py-4 text-[0.8rem] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-60 sm:w-auto",
  {
    variants: {
      variant: {
        signal: "bg-primary text-primary-foreground hover:bg-signal-deep",
        outline: "border border-foreground text-foreground hover:bg-foreground hover:text-background",
        ink: "bg-ink text-paper hover:bg-signal",
        paper: "bg-paper text-ink hover:bg-ink hover:text-paper",
        ghostPaper: "border border-paper/60 text-paper hover:bg-paper hover:text-ink",
      },
    },
    defaultVariants: { variant: "signal" },
  },
);

type ButtonLinkProps = LinkProps &
  VariantProps<typeof buttonStyles> & { className?: string; children: ReactNode; arrow?: boolean; onClick?: () => void };

export function ButtonLink({ variant, className, children, arrow = true, onClick, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} onClick={onClick} className={cn(buttonStyles({ variant }), className)}>
      <span>{children}</span>
      {arrow ? <ArrowRight className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" /> : null}
    </Link>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("kicker", className)}>{children}</p>;
}

export function CircleArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-full border border-current transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <ArrowRight className="size-4" strokeWidth={1.5} />
    </span>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="border-t border-foreground">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-rule">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.02rem] font-medium leading-snug [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <Plus
              className="mt-0.5 size-5 shrink-0 transition-transform duration-300 group-open:rotate-45 group-open:text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Photo({
  src,
  alt,
  className,
  imgClassName,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden bg-paper-deep", className)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("size-full object-cover", imgClassName)}
      />
    </div>
  );
}
