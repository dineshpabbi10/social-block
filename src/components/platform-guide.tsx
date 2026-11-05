"use client";

import { useState } from "react";
import { Card, Segmented, cn } from "./ui";
import {
  AlertIcon,
  ExternalLinkIcon,
  MonitorIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from "./icons";

type Platform = "desktop" | "ios" | "android";

const STEPS: Record<
  Platform,
  Array<{ title: string; body: React.ReactNode }>
> = {
  desktop: [
    {
      title: "Install a userscript manager",
      body: (
        <>
          Get{" "}
          <Ext href="https://www.tampermonkey.net/">Tampermonkey</Ext> for Chrome, Edge, Firefox,
          or Opera. <Ext href="https://violentmonkey.github.io/">Violentmonkey</Ext> is a good
          open-source alternative.
        </>
      ),
    },
    {
      title: "Download your guard",
      body: (
        <>
          Use <strong className="font-medium text-white/70">Download guard</strong> above, then open
          the downloaded <span className="font-mono text-[11px] text-mint/70">reelbrake.user.js</span>{" "}
          file. Your manager should show an install screen.
        </>
      ),
    },
    {
      title: "If it opens as text instead",
      body: (
        <>
          Use <strong className="font-medium text-white/70">Copy script</strong> instead. In the
          manager, open the dashboard, create a new script, paste over everything, and save. This
          path works everywhere.
        </>
      ),
    },
    {
      title: "Open Instagram and check",
      body: (
        <>
          The Reels tab should be missing from the left rail. Open{" "}
          <span className="font-mono text-[11px] text-white/60">instagram.com/reels/</span> and you
          should be sent home with a small notice.
        </>
      ),
    },
  ],
  ios: [
    {
      title: "Install the Userscripts app",
      body: (
        <>
          Get{" "}
          <Ext href="https://apps.apple.com/app/userscripts/id1463298887">Userscripts</Ext> from
          the App Store. It is a free, open-source Safari extension.
        </>
      ),
    },
    {
      title: "Turn the extension on",
      body: (
        <>
          Open <em>Settings → Safari → Extensions → Userscripts</em>, enable it, and allow it on{" "}
          <span className="text-white/60">instagram.com</span>,{" "}
          <span className="text-white/60">youtube.com</span> and{" "}
          <span className="text-white/60">facebook.com</span>.
        </>
      ),
    },
    {
      title: "Add the script",
      body: (
        <>
          Use <strong className="font-medium text-white/70">Copy script</strong> above, open
          Userscripts, tap <em>+</em>, paste, name it Reelbrake, and save. Then open the script in
          the app and make sure it is enabled for those sites.
        </>
      ),
    },
    {
      title: "Use Safari, not the app",
      body: (
        <>
          Reelbrake works in Safari on Instagram and YouTube. The native apps cannot be modified on
          any platform. Tip: add instagram.com and youtube.com to your Home Screen from Safari, so
          the guarded web version is the icon you actually tap.
        </>
      ),
    },
  ],
  android: [
    {
      title: "Install Firefox for Android",
      body: (
        <>
          Get <Ext href="https://play.google.com/store/apps/details?id=org.mozilla.firefox">Firefox</Ext>{" "}
          from the Play Store. It supports userscript managers; Chrome for Android does not.
        </>
      ),
    },
    {
      title: "Add Tampermonkey",
      body: (
        <>
          Open{" "}
          <Ext href="https://addons.mozilla.org/en-US/android/addon/tampermonkey/">
            Tampermonkey on Firefox
          </Ext>{" "}
          and tap <em>Add to Firefox</em>, then allow it to run on the sites you want guarded.
        </>
      ),
    },
    {
      title: "Add the script",
      body: (
        <>
          Use <strong className="font-medium text-white/70">Copy script</strong> above, then open
          Tampermonkey → Dashboard → <em>+</em>, paste over the template, and save. If your manager
          can import a downloaded file, Download guard works too.
        </>
      ),
    },
    {
      title: "Use Firefox for Instagram and YouTube",
      body: (
        <>
          The guard follows the browser, not your phone. If you open the native apps, Reels and
          Shorts are still there. Tip: add instagram.com and youtube.com to your Firefox home
          screen, and use those shortcuts instead.
        </>
      ),
    },
  ],
};

export function PlatformGuide() {
  const [platform, setPlatform] = useState<Platform>("desktop");
  const steps = STEPS[platform];

  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow mb-2">Install it</p>
            <h2 className="text-[19px] font-semibold tracking-[-0.03em] text-white">
              Pick your browser
            </h2>
            <p className="mt-1 max-w-lg text-[12.5px] leading-relaxed text-white/48">
              A userscript needs a manager. It takes a minute the first time, then the guard is
              part of your browser.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/20 bg-mint/[0.07] px-2.5 py-1 text-[10px] font-medium text-mint/80">
            <ShieldCheckIcon size={11} />
            One-time setup
          </span>
        </div>

        <Segmented<Platform>
          value={platform}
          onChange={setPlatform}
          className="mt-4"
          options={[
            { value: "desktop", label: "Desktop" },
            { value: "ios", label: "iPhone & iPad" },
            { value: "android", label: "Android" },
          ]}
        />

        <div className="mt-5 flex items-center gap-2 text-[11px] text-white/42">
          {platform === "desktop" ? (
            <MonitorIcon size={14} className="text-white/52" />
          ) : (
            <SmartphoneIcon size={14} className="text-white/52" />
          )}
          {platform === "desktop"
            ? "Chrome, Edge, Firefox, Opera, Brave"
            : platform === "ios"
              ? "Safari on iOS 15 or newer"
              : "Firefox for Android"}
        </div>

        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span
                className={cn(
                  "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border text-[10.5px] font-semibold",
                  index === 0
                    ? "border-mint/25 bg-mint/10 text-mint"
                    : "border-white/10 bg-white/[0.04] text-white/52",
                )}
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-medium text-white/82">{step.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/48">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex gap-2 rounded-2xl border border-amber/15 bg-amber/[0.045] px-3.5 py-3">
          <AlertIcon size={14} className="mt-px shrink-0 text-amber/70" />
          <p className="text-[10.5px] leading-relaxed text-amber/65">
            App store versions of Instagram, YouTube and Facebook ignore userscripts. Reelbrake
            works in the browser versions only. The rest of those sites still work normally there.
          </p>
        </div>
      </div>
    </Card>
  );
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-baseline gap-0.5 font-medium text-mint/85 underline decoration-mint/25 underline-offset-2 transition hover:text-mint"
    >
      {children}
      <ExternalLinkIcon size={9} className="translate-y-px" />
    </a>
  );
}
