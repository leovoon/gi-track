import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariantsObject = {
  default:
    "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
  secondary:
    "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
  destructive:
    "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
  reddish:
    "bg-red-100 dark:bg-red-900 hover:bg-red/80 border-transparent text-red-800 dark:text-slate-300",
  bluish:
    "bg-blue-100 dark:bg-blue-900 hover:bg-blue/80 border-transparent text-blue-800 dark:text-slate-300",
  cyan: "bg-cyan-100 dark:bg-cyan-900 hover:bg-cyan/80 border-transparent text-cyan-800 dark:text-slate-300",
  teal: "bg-teal-100 dark:bg-teal-900 hover:bg-teal/80 border-transparent text-teal-800 dark:text-slate-300",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow/80 border-transparent text-yellow-800 dark:text-slate-300",
  purple:
    "bg-purple-100 dark:bg-purple-900 hover:bg-purple/80 border-transparent text-purple-800 dark:text-slate-300",
  violet:
    "bg-violet-100 dark:bg-violet-900 hover:bg-violet/80 border-transparent text-violet-800 dark:text-slate-300",
  stone:
    "bg-stone-100 dark:bg-stone-800 hover:bg-stone/80 border-transparent text-stone-800 dark:text-slate-300",
  zinc: "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc/80 border-transparent text-zinc-800 dark:text-slate-300",
  outline: "text-foreground",
};

export type BadgeVariants = keyof typeof badgeVariantsObject;

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-thin transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: badgeVariantsObject,
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
