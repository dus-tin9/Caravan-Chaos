/* eslint-disable react-refresh/only-export-components */

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center g border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Subtle navigation buttons: balanced in light mode, stronger feedback in dark mode.
        default:
          "border-border/75 bg-background/70 text-foreground shadow-sm backdrop-blur hover:bg-card/90 hover:shadow-md hover:shadow-foreground/15 dark:border-border dark:bg-input/30 dark:hover:border-border dark:hover:bg-accent/70 dark:hover:shadow-lg dark:hover:shadow-black/35",
        // Primary call-to-action buttons with stronger elevation and emphasis.
        emphasize:
          "border-primary/55 bg-primary text-primary-foreground shadow-xl shadow-primary/35 backdrop-blur hover:border-white/75 hover:bg-primary/95 hover:brightness-105 hover:shadow-2xl hover:shadow-primary/45 dark:border-primary/65 dark:bg-primary dark:text-primary-foreground dark:shadow-lg dark:shadow-primary/35 dark:hover:border-primary/65 dark:hover:bg-primary dark:hover:shadow-lg dark:hover:shadow-primary/35",
        // Minimal person interaction button: no frame, no card-like chrome.
        person:
          "border-transparent bg-transparent p-0 text-foreground shadow-none hover:opacity-90 hover:scale-[1.01]",
        // Toggle controls (e.g. theme switch) with stable, compact emphasis.
        toggle:
          "border-border/80 bg-card/80 text-foreground shadow-sm backdrop-blur hover:bg-card hover:shadow-md dark:border-border dark:bg-input/40 dark:hover:bg-input/65",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1  px-2 text-xs in-data-[slot=button-group]:g has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1  px-2.5 text-[0.8rem] in-data-[slot=button-group]:g has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6  in-data-[slot=button-group]:g [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7  in-data-[slot=button-group]:g",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
