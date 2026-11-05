import Link from "next/link";
import { buttonStyles } from "@/components/button-styles";
import { Logo } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
      <Logo size={44} />
      <p className="eyebrow mt-6">404</p>
      <h1 className="mt-2 text-[24px] font-semibold tracking-[-0.035em] text-white">
        This page is not here
      </h1>
      <p className="mt-2 text-[12.5px] leading-relaxed text-white/40">
        The Reels may be gone, but this route never existed. Head back and build your guard.
      </p>
      <Link href="/" className={buttonStyles("primary", "md", "mt-5")}>
        Back to Reelbrake
      </Link>
    </div>
  );
}
