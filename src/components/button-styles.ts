import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "soft" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-mint text-[#08130f] hover:bg-mint-bright shadow-[0_16px_40px_-18px_rgba(127,242,195,0.65)]",
  secondary:
    "bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.095] hover:border-white/15",
  ghost: "text-white/55 hover:text-white hover:bg-white/[0.06]",
  soft: "bg-violet/15 text-violet border border-violet/20 hover:bg-violet/20",
  danger: "bg-coral/12 text-coral border border-coral/25 hover:bg-coral/18",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-9 rounded-xl px-3 text-xs",
  md: "h-11 rounded-2xl px-4 text-sm",
  lg: "h-12 rounded-2xl px-5 text-[15px]",
  icon: "size-10 rounded-full",
};

export function buttonStyles(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "tap inline-flex select-none items-center justify-center gap-2 font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-40",
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className,
  );
}
