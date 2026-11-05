import type { SVGProps } from "react";
import type { SiteId } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 10.4 12 3.5l8.5 6.9" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M9.5 20v-5.5h5V20" />
    </Base>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5.2 5.8v5.7c0 4.3 2.8 7.3 6.8 8.8 4-1.5 6.8-4.5 6.8-8.8V5.8L12 3Z" />
    </Base>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5.2 5.8v5.7c0 4.3 2.8 7.3 6.8 8.8 4-1.5 6.8-4.5 6.8-8.8V5.8L12 3Z" />
      <path d="m9 11.8 2.1 2.1 4-4.2" />
    </Base>
  );
}

export function ShieldAlertIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5.2 5.8v5.7c0 4.3 2.8 7.3 6.8 8.8 4-1.5 6.8-4.5 6.8-8.8V5.8L12 3Z" />
      <path d="M12 8v4.5" />
      <path d="M12 16h.01" />
    </Base>
  );
}

export function BarChartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 20.5h18" />
      <path d="M6.5 20.5v-6" />
      <path d="M12 20.5V7" />
      <path d="M17.5 20.5V3.5" />
    </Base>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h9" />
      <path d="M17 7h3" />
      <path d="M4 17h3" />
      <path d="M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </Base>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </Base>
  );
}

export function TimerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9.5V13l2.2 1.4" />
      <path d="M9 2.5h6" />
      <path d="M12 2.5V5" />
    </Base>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19.2 18.8 21.5 19.5 19.2 20.2 18.5 22.5 17.8 20.2 15.5 19.5 17.8 18.8 18.5 16.5Z" />
    </Base>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21.5c3.8 0 6.2-2.6 6.2-6 0-2.8-1.7-4.9-2.9-6.7-.5 1.9-1.3 2.9-2.3 3.8.1-3.4-1.1-6.4-3.5-8.9.1 3.3-1.5 5.3-3 7.1-1.2 1.5-1.9 2.9-1.9 4.6 0 3.5 2.5 6.1 6.3 6.1Z" />
    </Base>
  );
}

export function WindIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 8.5h10.8a2.7 2.7 0 1 0-2.7-2.7" />
      <path d="M3.5 12.5h15.2a2.7 2.7 0 1 1-2.7 2.7" />
      <path d="M3.5 16.5h7.8" />
    </Base>
  );
}

export function SmartphoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
      <path d="M10.5 18.5h3" />
    </Base>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </Base>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 15V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4.5 19.5h15" />
    </Base>
  );
}

export function RotateIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 11a8.5 8.5 0 1 1 2.5 6" />
      <path d="M3.5 4.5V11H10" />
    </Base>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14 4.5h5.5V10" />
      <path d="m19.5 4.5-7.6 7.6" />
      <path d="M10 5H5.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V14" />
    </Base>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 7.8h.01" />
    </Base>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4.1" />
      <path d="m8.2 13.2 7.6 4.1" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Base>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
    </Base>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 2.5V7" />
      <path d="M16 2.5V7" />
      <path d="M3.5 10h17" />
    </Base>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 4.5h6a3 3 0 0 1 3 3V20a2.5 2.5 0 0 0-2.5-2.5H4V4.5Z" />
      <path d="M20 4.5h-4a3 3 0 0 0-3 3V20a2.5 2.5 0 0 1 2.5-2.5H20V4.5Z" />
    </Base>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.2" />
      <path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </Base>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 6.5h15" />
      <path d="M9 3.5h6" />
      <path d="M6.5 6.5 7.5 21h9l1-14.5" />
      <path d="M10 10.5V17" />
      <path d="M14 10.5V17" />
    </Base>
  );
}

export function BanIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m6.5 17.5 11-11" />
    </Base>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 3.5 21 20.5" />
      <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.5 0 9.5 5 9.5 7 0 .7-.5 1.8-1.4 3" />
      <path d="M6.2 6.8C4 8.4 2.5 10.5 2.5 12c0 2 4 7 9.5 7 1.5 0 2.9-.4 4.2-1" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </Base>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </Base>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Base>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 7.5 12.7 5.8a3.7 3.7 0 0 1 5.2 5.2l-1.7 1.7" />
      <path d="M13 16.5 11.3 18.2a3.7 3.7 0 0 1-5.2-5.2L7.8 11.3" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.3 2.6 2.6 5.4-5.8" />
    </Base>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5 21.5 20.5h-19L12 3.5Z" />
      <path d="M12 9.5v4.5" />
      <path d="M12 17.5h.01" />
    </Base>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </Base>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Base>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
    </Base>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="7" y="5" width="3.5" height="14" rx="1.2" fill="currentColor" stroke="none" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1.2" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V7.7a3.5 3.5 0 0 1 7 0v2.8" />
      <path d="M12 14.8v1.8" />
    </Base>
  );
}

export function UnlockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V7.7a3.5 3.5 0 0 1 6.6-1.6" />
      <path d="M12 14.8v1.8" />
    </Base>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.5 3.5C11 3.5 5 7 5 13a5.5 5.5 0 0 0 5.5 5.5c6 0 10-5 10-15Z" />
      <path d="M3.5 21c1.5-5.5 5.5-9.5 11-12" />
    </Base>
  );
}

export function MusicIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 18.5V6l10-2v12.5" />
      <circle cx="6.5" cy="18.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </Base>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.5 3.5h11V21L12 17.5 6.5 21V3.5Z" />
    </Base>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M18 9.5a6 6 0 0 0-12 0c0 7-2.5 7-2.5 8.5h17C20.5 16.5 18 16.5 18 9.5Z" />
      <path d="M9.5 21a2.5 2.5 0 0 0 5 0" />
    </Base>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </Base>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4.5 4.5" />
    </Base>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 20.4S3.5 15.2 3.5 8.9A4.9 4.9 0 0 1 12 5.4a4.9 4.9 0 0 1 8.5 3.5c0 6.3-8.5 11.5-8.5 11.5Z" />
    </Base>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c.8-4 3.6-6 7.5-6s6.7 2 7.5 6" />
    </Base>
  );
}

export function CommentIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.5 11.6a7.8 7.8 0 0 1-7.8 7.8H8.4L4 22.2V11.6a8.3 8.3 0 1 1 16.5 0Z" />
    </Base>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M8.5 6h12" />
      <path d="M8.5 12h12" />
      <path d="M8.5 18h12" />
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </Base>
  );
}

export function OfflineIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 8.5a15.5 15.5 0 0 1 5-2.7" />
      <path d="M10.5 5.2a15.5 15.5 0 0 1 11 3.3" />
      <path d="M5.5 12.3a10.5 10.5 0 0 1 3.4-1.6" />
      <path d="M14 10.6a10.5 10.5 0 0 1 4.5 1.7" />
      <path d="M8.7 16a5.4 5.4 0 0 1 6.6 0" />
      <path d="M12 20h.01" />
      <path d="m3 3 18 18" />
    </Base>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m8.5 8.5-4 3.5 4 3.5" />
      <path d="m15.5 8.5 4 3.5-4 3.5" />
      <path d="m13.5 5-3 14" />
    </Base>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="2.2" />
      <path d="M8.5 21h7" />
      <path d="M12 17v4" />
    </Base>
  );
}

/* ------------------------------------------------------------------ */
/* Brand                                                                 */
/* ------------------------------------------------------------------ */

export function Logo({ size = 36, className }: { size?: number; className?: string }) {
  const id = "reelbrake-logo";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-ring`} x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A28FFF" />
          <stop offset="0.55" stopColor="#7FF2C3" />
          <stop offset="1" stopColor="#5ED9E8" />
        </linearGradient>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#17161F" />
          <stop offset="1" stopColor="#0B0B10" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill={`url(#${id}-bg)`} />
      <rect x="0.6" y="0.6" width="38.8" height="38.8" rx="11.4" stroke="white" strokeOpacity="0.08" />
      <circle cx="20" cy="20" r="11.2" stroke={`url(#${id}-ring)`} strokeWidth="2.4" />
      <path d="M17.2 14.8v10.4l8.2-5.2-8.2-5.2Z" fill="white" fillOpacity="0.92" />
      <path d="M9.2 30.8 30.8 9.2" stroke="#0B0B10" strokeWidth="6.4" strokeLinecap="round" />
      <path d="M9.6 30.4 30.4 9.6" stroke="#FF8080" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[1px] text-[17px] font-semibold tracking-[-0.04em] ${className ?? ""}`}>
      <span className="text-white">reel</span>
      <span className="text-mint">brake</span>
    </span>
  );
}

const GRADIENTS: Record<string, [string, string, string]> = {
  instagram: ["#F9CE34", "#EE2A7B", "#6228D7"],
  youtube: ["#FF5A4E", "#FF0033", "#C40024"],
  facebook: ["#6FA8FF", "#1877F2", "#0B4FB3"],
  tiktok: ["#FF4D6D", "#111114", "#25F4EE"],
};

export function SiteIcon({ site, size = 24 }: { site: SiteId; size?: number }) {
  const id = `reelbrake-site-${site}`;
  const [from, mid, to] = GRADIENTS[site];

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          {site === "tiktok" ? (
            <>
              <stop stopColor="#1A1A20" />
              <stop offset="1" stopColor="#08080B" />
            </>
          ) : (
            <>
              <stop stopColor={from} />
              <stop offset="0.52" stopColor={mid} />
              <stop offset="1" stopColor={to} />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${id}-bg)`} />
      <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" stroke="white" strokeOpacity="0.12" />

      {site === "instagram" && (
        <g stroke="white" strokeWidth="2.1" strokeLinecap="round">
          <rect x="10.5" y="10.5" width="19" height="19" rx="5.6" />
          <circle cx="20" cy="20" r="4.4" />
          <circle cx="26.2" cy="13.8" r="1.15" fill="white" stroke="none" />
        </g>
      )}

      {site === "youtube" && (
        <path d="M17 14.5 26 20l-9 5.5v-11Z" fill="white" />
      )}

      {site === "facebook" && (
        <path
          d="M22.6 34V21.4h3.8l.6-4.4h-4.4v-2.8c0-1.2.4-2.1 2.2-2.1H27V8.2c-.7-.1-1.8-.2-3-.2-3 0-5 1.8-5 5.1v3.9h-4v4.4h4V34h3.6Z"
          fill="white"
        />
      )}

      {site === "tiktok" && (
        <g strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(-1.1 -0.9)" stroke="#25F4EE" strokeWidth="2.6">
            <path d="M23 10.5v13.2a4.6 4.6 0 1 1-3.6-4.5" />
            <path d="M23 10.5c.4 2.8 2.1 4.6 5 5" />
          </g>
          <g transform="translate(1.1 0.9)" stroke="#FF4D6D" strokeWidth="2.6">
            <path d="M23 10.5v13.2a4.6 4.6 0 1 1-3.6-4.5" />
            <path d="M23 10.5c.4 2.8 2.1 4.6 5 5" />
          </g>
          <g stroke="white" strokeWidth="2.4">
            <path d="M23 10.5v13.2a4.6 4.6 0 1 1-3.6-4.5" />
            <path d="M23 10.5c.4 2.8 2.1 4.6 5 5" />
          </g>
        </g>
      )}
    </svg>
  );
}
