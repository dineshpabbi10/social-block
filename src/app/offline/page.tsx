import type { Metadata } from "next";
import Link from "next/link";
import { buttonStyles } from "@/components/button-styles";
import { Logo, OfflineIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Offline",
  description: "Reelbrake could not reach the network.",
};

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
      <Logo size={44} />
      <span className="mt-6 grid size-11 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-white/45">
        <OfflineIcon size={19} />
      </span>
      <h1 className="mt-4 text-[24px] font-semibold tracking-[-0.035em] text-white">
        You are offline
      </h1>
      <p className="mt-2 text-[12.5px] leading-relaxed text-white/40">
        The guard already installed in your browser keeps working. This control panel just needs a
        connection to download a new script.
      </p>
      <Link href="/" className={buttonStyles("secondary", "md", "mt-5")}>
        Try again
      </Link>
    </div>
  );
}
