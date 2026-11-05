"use client";

import { useState } from "react";
import { GUARD_SITES, useGuardConfig, type GuardConfig } from "@/lib/guard-config";
import { copyText, downloadText, fetchConfiguredGuard } from "@/lib/userscript";
import { Button, Card, Pill, Toggle, cn } from "./ui";
import {
  AlertIcon,
  CheckCircleIcon,
  CopyIcon,
  DownloadIcon,
  InfoIcon,
  SiteIcon,
  SlidersIcon,
} from "./icons";

type StatusTone = "success" | "error" | "info";

interface Status {
  tone: StatusTone;
  message: string;
}

const OPTIONS: Array<{
  key: "redirects" | "hideShelves" | "showNotice";
  label: string;
  description: string;
}> = [
  {
    key: "redirects",
    label: "Redirect short-form links",
    description: "A /reel/ or /shorts/ link sends you back to the site's home.",
  },
  {
    key: "hideShelves",
    label: "Hide Reels and Shorts shelves",
    description: "Removes short-form rows from the home feed and search results.",
  },
  {
    key: "showNotice",
    label: "Show a small notice",
    description: "A brief toast confirms the guard is on. No counters, no tracking.",
  },
];

function snapshot(config: GuardConfig): string {
  return JSON.stringify(config);
}

export function GuardConfigCard() {
  const { config, hydrated, update, reset, enabledCount } = useGuardConfig();
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState<"download" | "copy" | null>(null);
  const [built, setBuilt] = useState<string | null>(null);

  const dirty = built !== null && built !== snapshot(config);

  async function build(): Promise<string | null> {
    try {
      return await fetchConfiguredGuard(config);
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not build the guard file. Reload and try again.",
      });
      return null;
    }
  }

  async function onDownload() {
    setBusy("download");
    setStatus(null);
    const source = await build();
    if (source) {
      downloadText("reelbrake.user.js", source);
      setBuilt(snapshot(config));
      setStatus({
        tone: "success",
        message:
          "Downloaded reelbrake.user.js. Open it and your userscript manager will offer to install it.",
      });
    }
    setBusy(null);
  }

  async function onCopy() {
    setBusy("copy");
    setStatus(null);
    const source = await build();
    if (source) {
      const copied = await copyText(source);
      setBuilt(snapshot(config));
      setStatus(
        copied
          ? {
              tone: "success",
              message:
                "Script copied. In your manager, create a new script, paste it over the template, and save.",
            }
          : {
              tone: "error",
              message: "The clipboard was blocked. Use Download instead, or copy from Settings.",
            },
      );
    }
    setBusy(null);
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.06] p-4 sm:p-6">
        <div>
          <p className="eyebrow mb-2">Build your guard</p>
          <h2 className="text-[19px] font-semibold tracking-[-0.03em] text-white">
            Choose what disappears
          </h2>
          <p className="mt-1 max-w-md text-[12.5px] leading-relaxed text-white/48">
            These settings are baked into the script you download. Everything else on each site
            stays exactly where it is.
          </p>
        </div>
        <Pill tone={enabledCount > 0 ? "mint" : "neutral"}>
          <SlidersIcon size={10} />
          {enabledCount} of 4 sites
        </Pill>
      </div>

      <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
        <div className="divide-y divide-white/[0.05]">
          {GUARD_SITES.map((site) => {
            const enabled = config[site.key];
            return (
              <div key={site.key} className="flex items-start gap-3 p-4 sm:px-6">
                <SiteIcon site={site.key} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13.5px] font-medium text-white/90">{site.name}</p>
                    <span className="text-[10.5px] text-white/38">{site.shortForm}</span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/45">
                    {site.summary}
                  </p>
                </div>
                <Toggle
                  checked={enabled}
                  onChange={(next) => update({ [site.key]: next } as Partial<GuardConfig>)}
                  label={`${enabled ? "Stop hiding" : "Start hiding"} ${site.shortForm} on ${site.name}`}
                />
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/[0.06] bg-black/15 p-4 sm:p-6 lg:border-l lg:border-t-0">
          <p className="eyebrow mb-3">Options</p>
          <div className="space-y-3.5">
            {OPTIONS.map((option) => (
              <div key={option.key} className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-white/78">{option.label}</p>
                  <p className="mt-0.5 text-[10.5px] leading-relaxed text-white/42">
                    {option.description}
                  </p>
                </div>
                <Toggle
                  checked={config[option.key]}
                  onChange={(next) => update({ [option.key]: next } as Partial<GuardConfig>)}
                  label={option.label}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            <Button
              onClick={onDownload}
              disabled={!hydrated || busy !== null || enabledCount === 0}
              className="w-full"
            >
              <DownloadIcon size={16} />
              {busy === "download" ? "Building…" : "Download guard"}
            </Button>
            <Button
              variant="secondary"
              onClick={onCopy}
              disabled={!hydrated || busy !== null || enabledCount === 0}
              className="w-full"
            >
              <CopyIcon size={15} />
              {busy === "copy" ? "Copying…" : "Copy script instead"}
            </Button>
          </div>

          {enabledCount === 0 ? (
            <p className="mt-3 flex gap-2 text-[10.5px] leading-relaxed text-amber/70">
              <AlertIcon size={13} className="mt-px shrink-0" />
              Turn on at least one site to build a guard.
            </p>
          ) : null}

          {status ? (
            <div
              role="status"
              className={cn(
                "mt-3 flex gap-2 rounded-xl border px-3 py-2.5 text-[10.5px] leading-relaxed",
                status.tone === "success"
                  ? "border-mint/20 bg-mint/[0.06] text-mint/80"
                  : status.tone === "error"
                    ? "border-coral/20 bg-coral/[0.06] text-coral/80"
                    : "border-white/10 bg-white/[0.04] text-white/55",
              )}
            >
              {status.tone === "success" ? (
                <CheckCircleIcon size={13} className="mt-px shrink-0" />
              ) : status.tone === "error" ? (
                <AlertIcon size={13} className="mt-px shrink-0" />
              ) : (
                <InfoIcon size={13} className="mt-px shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          ) : null}

          {dirty ? (
            <p className="mt-3 flex gap-2 text-[10.5px] leading-relaxed text-amber/70">
              <AlertIcon size={13} className="mt-px shrink-0" />
              Settings changed. Download again to update the guard you already installed.
            </p>
          ) : null}

          <p className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] leading-relaxed text-white/36">
            You only have to do this once per browser. To change a setting later, download again
            and replace the script in your manager.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-3 sm:px-6">
        <p className="text-[10.5px] text-white/40">
          Saved in this browser only. Nothing is uploaded.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus({ tone: "info", message: "Settings reset to the recommended defaults." });
          }}
          className="tap rounded-full px-2 py-1 text-[10.5px] font-medium text-white/48 transition hover:bg-white/[0.05] hover:text-white/70"
        >
          Reset settings
        </button>
      </div>
    </Card>
  );
}
