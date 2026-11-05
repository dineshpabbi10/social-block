"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./ui";
import { DownloadIcon, HomeIcon, InfoIcon, Logo, SettingsIcon, Wordmark } from "./icons";

const NAV = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
  { href: "/about", label: "About", icon: InfoIcon },
] as const;

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    function onPrompt(event: Event) {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    }

    function onInstalled() {
      setInstallEvent(null);
    }

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") return;

    function register() {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline support is a bonus; the app works without it.
      });
    }

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    return () => window.removeEventListener("load", register);
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  }

  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-ink-950/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="tap flex items-center gap-2.5 rounded-xl"
            aria-label="Reelbrake home"
          >
            <Logo size={30} />
            <Wordmark className="text-[16px]" />
          </Link>

          <nav className="ml-auto hidden items-center gap-1 sm:flex" aria-label="Main">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "tap rounded-full px-3.5 py-2 text-[12.5px] font-medium transition",
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-white/42 hover:bg-white/[0.04] hover:text-white/80",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {installEvent ? (
            <button
              type="button"
              onClick={install}
              className="tap ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 text-[11.5px] font-medium text-white/80 transition hover:bg-white/10 hover:text-white sm:ml-3"
            >
              <DownloadIcon size={13} />
              Install
            </button>
          ) : (
            <span className="ml-auto sm:hidden" aria-hidden="true" />
          )}
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pb-14 sm:pt-10">
        {children}
      </main>

      <footer className="hidden border-t border-white/[0.05] sm:block">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-6 text-[11px] text-white/38">
          <p>
            <span className="text-white/45">Reelbrake</span> hides the short-form loop. Everything
            else stays.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/settings" className="transition hover:text-white/60">
              Settings
            </Link>
            <Link href="/about" className="transition hover:text-white/60">
              Limitations
            </Link>
            <span className="text-white/28">Local only · no account</span>
          </div>
        </div>
      </footer>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-ink-950/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl sm:hidden"
        aria-label="Main"
      >
        <div className="mx-auto flex w-full max-w-md items-stretch justify-around px-3">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "tap relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition",
                  active ? "text-mint" : "text-white/35",
                )}
              >
                <item.icon size={19} />
                {item.label}
                {active ? (
                  <span className="absolute inset-x-[30%] top-0 h-[2px] rounded-full bg-mint" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
