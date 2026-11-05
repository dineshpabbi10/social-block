"use client";

import {
  useEffect,
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  AlertIcon,
  CheckCircleIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
  XIcon,
} from "./icons";

import { cn } from "@/lib/cn";
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./button-styles";

export { cn };
export type { ButtonSize, ButtonVariant };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button className={buttonStyles(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Card / pill / headings                                              */
/* ------------------------------------------------------------------ */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("glass rounded-3xl", className)}>{children}</div>;
}

type PillTone = "mint" | "violet" | "coral" | "amber" | "neutral";

const PILL_TONES: Record<PillTone, string> = {
  mint: "bg-mint/12 text-mint border-mint/20",
  violet: "bg-violet/12 text-violet border-violet/20",
  coral: "bg-coral/12 text-coral border-coral/20",
  amber: "bg-amber/12 text-amber border-amber/20",
  neutral: "bg-white/[0.055] text-white/55 border-white/10",
};

export function Pill({
  tone = "neutral",
  className,
  children,
}: {
  tone?: PillTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide",
        PILL_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-[12.5px] leading-relaxed text-white/40">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0 pb-0.5">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ring                                                                */
/* ------------------------------------------------------------------ */

type RingTone = "mint" | "violet" | "coral";

const RING_STOPS: Record<RingTone, [string, string]> = {
  mint: ["#7FF2C3", "#5ED9E8"],
  violet: ["#A28FFF", "#7C5CFF"],
  coral: ["#FF9A9A", "#FF6B6B"],
};

export function Ring({
  value,
  size = 96,
  stroke = 6,
  tone = "mint",
  className,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: RingTone;
  className?: string;
  children?: ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, value));
  const [from, to] = RING_STOPS[tone];

  return (
    <div
      className={cn("relative inline-grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${id}-ring)`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress bar                                                        */
/* ------------------------------------------------------------------ */

export function Progress({
  value,
  tone = "mint",
  className,
}: {
  value: number;
  tone?: "mint" | "violet" | "coral" | "amber";
  className?: string;
}) {
  const colors = {
    mint: "bg-mint",
    violet: "bg-violet",
    coral: "bg-coral",
    amber: "bg-amber",
  } as const;

  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]", className)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", colors[tone])}
        style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Segmented control                                                   */
/* ------------------------------------------------------------------ */

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  className,
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      className={cn("flex gap-1 rounded-2xl border border-white/[0.06] bg-black/20 p-1", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "tap flex-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-all duration-200",
              active
                ? "bg-white text-[#0a0a0f] shadow-[0_6px_18px_-8px_rgba(255,255,255,0.5)]"
                : "text-white/40 hover:text-white/75",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stepper                                                             */
/* ------------------------------------------------------------------ */

export function Stepper({
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const clamp = (next: number) => Math.max(min, Math.min(max, next));
  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="secondary"
        size="icon"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(clamp(value - step))}
        className="size-9"
      >
        <MinusIcon size={15} />
      </Button>
      <span className="numeric w-8 text-center text-sm font-medium text-white">{value}</span>
      <Button
        variant="secondary"
        size="icon"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(clamp(value + step))}
        className="size-9"
      >
        <PlusIcon size={15} />
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toggle                                                              */
/* ------------------------------------------------------------------ */

export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "tap relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-300 disabled:opacity-40",
        checked ? "border-mint/40 bg-mint" : "border-white/10 bg-white/10",
      )}
    >
      <span
        className={cn(
          "absolute top-[3px] size-[20px] rounded-full bg-white shadow-md transition-all duration-300",
          checked ? "left-[23px]" : "left-[3px]",
        )}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Sheet                                                               */
/* ------------------------------------------------------------------ */

export function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const timer = setTimeout(() => panelRef.current?.focus(), 40);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-[6px] animate-fade-in"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="animate-sheet relative flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-t-[32px] border border-white/10 bg-[#0f0f16]/97 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.9)] outline-none backdrop-blur-2xl sm:max-w-[430px] sm:rounded-[32px] sm:px-6 sm:pb-6 sm:pt-6"
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-white/15 sm:hidden" />
        {children}
        {footer ? <div className="mt-5">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

export function SheetClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="tap absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-white/[0.06] text-white/55 transition hover:bg-white/10 hover:text-white"
    >
      <XIcon size={15} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */

export interface ToastView {
  id: string;
  title: string;
  description?: string;
  tone?: "default" | "success" | "warn";
}

export function ToastHost({
  toasts,
  onDismiss,
}: {
  toasts: ToastView[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-[80] flex flex-col items-center gap-2 px-4 lg:bottom-8">
      {toasts.map((toast) => {
        const Icon =
          toast.tone === "success" ? CheckCircleIcon : toast.tone === "warn" ? AlertIcon : InfoIcon;
        const iconTone =
          toast.tone === "success"
            ? "text-mint"
            : toast.tone === "warn"
              ? "text-amber"
              : "text-violet";
        return (
          <div
            key={toast.id}
            role="status"
            className="animate-fade-up pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-[#14141c]/95 px-3.5 py-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <Icon size={17} className={cn("mt-0.5 shrink-0", iconTone)} />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium leading-snug text-white">{toast.title}</p>
              {toast.description ? (
                <p className="mt-0.5 text-[11.5px] leading-snug text-white/55">
                  {toast.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss"
              className="tap -mr-1 grid size-6 shrink-0 place-items-center rounded-full text-white/30 transition hover:text-white"
            >
              <XIcon size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
