"use client";

import { useState } from "react";
import type { SiteId } from "@/lib/types";
import { Card, Pill, Toggle, cn } from "./ui";
import {
  BellIcon,
  BookmarkIcon,
  CommentIcon,
  HeartIcon,
  HomeIcon,
  ListIcon,
  MailIcon,
  MoreIcon,
  PlayIcon,
  SearchIcon,
  ShareIcon,
  ShieldCheckIcon,
  SiteIcon,
  UserIcon,
} from "./icons";

type PreviewSite = "instagram" | "youtube" | "facebook";

const PREVIEW_SITES: Array<{ id: PreviewSite; label: string; site: SiteId }> = [
  { id: "instagram", label: "Instagram", site: "instagram" },
  { id: "youtube", label: "YouTube", site: "youtube" },
  { id: "facebook", label: "Facebook", site: "facebook" },
];

const STORIES = [
  "from-amber to-coral",
  "from-violet to-[#5ed9e8]",
  "from-mint to-violet",
  "from-coral to-violet",
  "from-[#5ed9e8] to-mint",
];

const STORY_NAMES = ["you", "maya", "sam", "leo", "ana"];

const REEL_GRADIENTS = [
  "from-[#3a2a5c] to-[#12101a]",
  "from-[#5c2a3f] to-[#160f14]",
  "from-[#234239] to-[#0c1411]",
];

const VIDEO_THUMBS = [
  "from-[#2b2440] to-[#121019]",
  "from-[#22323c] to-[#0e1215]",
  "from-[#3c2b26] to-[#15100e]",
  "from-[#2a3a2e] to-[#0f1511]",
];

export function GuardPreview() {
  const [site, setSite] = useState<PreviewSite>("instagram");
  const [guardOn, setGuardOn] = useState(true);

  return (
    <Card className="relative overflow-hidden p-3.5 sm:p-4">
      <div
        className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-violet/12 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="eyebrow">Live preview</p>
          <Pill tone={guardOn ? "mint" : "neutral"}>
            {guardOn ? <ShieldCheckIcon size={10} /> : null}
            {guardOn ? "Guard on" : "Guard off"}
          </Pill>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] text-white/32">Guard</span>
          <Toggle
            checked={guardOn}
            onChange={setGuardOn}
            label="Toggle the guard in the preview"
          />
        </div>
      </div>

      <div className="relative mt-3 grid grid-cols-3 gap-1 rounded-xl border border-white/[0.05] bg-black/25 p-1">
        {PREVIEW_SITES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSite(item.id)}
            aria-pressed={site === item.id}
            className={cn(
              "tap flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-[9.5px] font-medium transition",
              site === item.id
                ? "bg-white/[0.09] text-white"
                : "text-white/35 hover:text-white/65",
            )}
          >
            <SiteIcon site={item.site} size={14} />
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-3 w-full max-w-[292px]">
        <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#08080c] shadow-[0_35px_70px_-25px_rgba(0,0,0,0.95)]">
          <div className="flex items-center justify-between px-4 pb-0.5 pt-2 text-[7px] tracking-wide text-white/30">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-3 rounded-[1px] border border-white/25" />
              <span className="size-1 rounded-full bg-white/30" />
              <span className="size-1 rounded-full bg-white/20" />
            </span>
          </div>

          <div className="h-[326px] overflow-hidden">
            <div key={site} className="h-full animate-fade-in">
              {site === "instagram" ? (
                <InstagramMock guardOn={guardOn} />
              ) : site === "youtube" ? (
                <YouTubeMock guardOn={guardOn} />
              ) : (
                <FacebookMock guardOn={guardOn} />
              )}
            </div>
          </div>

          {site === "instagram" ? <InstagramNav guardOn={guardOn} /> : null}
          {site === "youtube" ? <YouTubeNav guardOn={guardOn} /> : null}
        </div>
      </div>

      <p className="mt-2.5 text-center text-[9px] leading-relaxed text-white/25" aria-live="polite">
        {guardOn
          ? `Reels ${site === "youtube" ? "and Shorts are" : "is"} removed from the ${PREVIEW_SITES.find((item) => item.id === site)?.label} preview.`
          : "Guard off. The short-form tab and shelf are back."}
      </p>
      <p className="mt-1 text-center text-[8px] text-white/15">
        Interactive illustration — not a screenshot.
      </p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Instagram                                                           */
/* ------------------------------------------------------------------ */

function InstagramMock({ guardOn }: { guardOn: boolean }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between border-b border-white/[0.055] px-3 py-2">
        <span className="font-display text-[14px] italic tracking-[-0.02em] text-white/90">
          Instagram
        </span>
        <div className="flex items-center gap-2.5 text-white/40">
          <HeartIcon size={11} />
          <MailIcon size={11} />
        </div>
      </div>

      <div className="flex gap-2 px-3 py-2.5">
        {STORIES.map((gradient, index) => (
          <div key={gradient} className="flex flex-col items-center gap-1">
            <div className={cn("size-[30px] rounded-full bg-gradient-to-br p-[1.5px]", gradient)}>
              <div className="size-full rounded-full border border-[#08080c] bg-[#15151c]" />
            </div>
            <span className="text-[5.5px] text-white/28">{STORY_NAMES[index]}</span>
          </div>
        ))}
      </div>

      <div className="mx-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <div className="relative h-[106px] bg-gradient-to-br from-[#3a2a5c] via-[#60284a] to-[#16101d]">
          <div className="absolute left-2 top-2 flex items-center gap-1.5">
            <span className="size-4 rounded-full bg-white/20" />
            <span className="h-1 w-10 rounded bg-white/20" />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid size-7 place-items-center rounded-full bg-black/25 text-white/65 backdrop-blur">
              <PlayIcon size={10} />
            </span>
          </div>
          <span className="absolute bottom-2 right-2 rounded bg-black/45 px-1 py-0.5 text-[5.5px] text-white/60">
            0:12
          </span>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2 text-white/50">
            <HeartIcon size={10} />
            <CommentIcon size={10} />
            <ShareIcon size={10} />
            <BookmarkIcon size={10} className="ml-auto" />
          </div>
          <p className="mt-1.5 text-[7px] leading-relaxed text-white/42">
            <span className="font-medium text-white/75">friend</span> still here. just not the loop.
          </p>
        </div>
      </div>

      {guardOn ? (
        <div className="mx-3 mt-2.5 rounded-xl border border-mint/10 bg-mint/[0.025] px-2.5 py-2">
          <p className="text-[6.5px] leading-relaxed text-mint/45">
            Explore and suggested Reels are hidden. Reels from people you follow stay.
          </p>
        </div>
      ) : (
        <div className="mx-3 mt-2.5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-medium text-white/55">Reels</span>
            <span className="text-[6px] text-white/25">See all</span>
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {REEL_GRADIENTS.map((gradient) => (
              <div
                key={gradient}
                className={cn(
                  "relative grid h-[54px] place-items-center overflow-hidden rounded-md bg-gradient-to-b",
                  gradient,
                )}
              >
                <span className="text-white/45">
                  <PlayIcon size={8} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InstagramNav({ guardOn }: { guardOn: boolean }) {
  return (
    <div className="flex items-center justify-around border-t border-white/[0.055] px-2 py-2.5 text-white/38">
      <HomeIcon size={14} className="text-white" />
      <SearchIcon size={14} />
      {guardOn ? null : <PlayIcon size={14} />}
      <HeartIcon size={14} />
      <UserIcon size={14} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* YouTube                                                             */
/* ------------------------------------------------------------------ */

function YouTubeMock({ guardOn }: { guardOn: boolean }) {
  return (
    <div className="h-full">
      <div className="flex items-center gap-1.5 border-b border-white/[0.055] px-3 py-2">
        <span className="grid size-[15px] place-items-center rounded-[4px] bg-[#ff0033]">
          <PlayIcon size={7} className="text-white" />
        </span>
        <span className="text-[9px] font-semibold tracking-[-0.02em] text-white/85">YouTube</span>
        <div className="ml-auto flex items-center gap-2 text-white/40">
          <SearchIcon size={11} />
          <span className="size-4 rounded-full bg-white/15" />
        </div>
      </div>

      <div className="flex gap-1 px-3 py-2">
        {["All", "Music", "Gaming", "Live"].map((chip, index) => (
          <span
            key={chip}
            className={cn(
              "rounded-full px-2 py-1 text-[5.5px]",
              index === 0 ? "bg-white text-black" : "bg-white/[0.06] text-white/40",
            )}
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-2 px-3">
        {VIDEO_THUMBS.slice(0, guardOn ? 4 : 2).map((gradient, index) => (
          <div key={gradient}>
            <div
              className={cn(
                "relative h-[46px] overflow-hidden rounded-md bg-gradient-to-br",
                gradient,
              )}
            >
              <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 text-[5px] text-white/60">
                {index === 0 ? "12:04" : "8:31"}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded bg-white/15" />
            <div className="mt-1 h-1 w-2/3 rounded bg-white/[0.09]" />
          </div>
        ))}
      </div>

      {guardOn ? (
        <div className="mx-3 mt-2.5 rounded-xl border border-mint/10 bg-mint/[0.025] px-2.5 py-2">
          <p className="text-[6.5px] leading-relaxed text-mint/45">
            Shorts tab and shelf are removed. Regular videos stay.
          </p>
        </div>
      ) : (
        <div className="mx-3 mt-2.5 animate-fade-in">
          <div className="flex items-center gap-1">
            <PlayIcon size={8} className="text-[#ff4d4d]" />
            <span className="text-[7.5px] font-medium text-white/60">Shorts</span>
          </div>
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {REEL_GRADIENTS.map((gradient) => (
              <div
                key={gradient}
                className={cn(
                  "relative h-[60px] overflow-hidden rounded-md bg-gradient-to-b",
                  gradient,
                )}
              >
                <span className="absolute inset-0 grid place-items-center text-white/45">
                  <PlayIcon size={8} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function YouTubeNav({ guardOn }: { guardOn: boolean }) {
  const items = [
    { icon: HomeIcon, label: "Home", active: true },
    ...(guardOn
      ? [{ icon: ListIcon, label: "Subscriptions", active: false }]
      : [
          { icon: PlayIcon, label: "Shorts", active: false },
          { icon: ListIcon, label: "Subscriptions", active: false },
        ]),
    { icon: UserIcon, label: "You", active: false },
  ];

  return (
    <div className="flex items-center justify-around border-t border-white/[0.055] px-2 py-2">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col items-center gap-0.5",
            item.active ? "text-white" : "text-white/35",
          )}
        >
          <item.icon size={12} />
          <span className="text-[5px]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Facebook                                                            */
/* ------------------------------------------------------------------ */

function FacebookMock({ guardOn }: { guardOn: boolean }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between border-b border-white/[0.055] px-3 py-2">
        <span className="text-[14px] font-bold tracking-[-0.04em] text-[#6f9dff]">facebook</span>
        <div className="flex items-center gap-2.5 text-white/40">
          <SearchIcon size={11} />
          <MoreIcon size={11} />
        </div>
      </div>

      <div className="flex items-center border-b border-white/[0.055] text-white/35">
        <TopTab icon={HomeIcon} label="Home" active />
        {guardOn ? null : <TopTab icon={PlayIcon} label="Reels" />}
        <TopTab icon={UserIcon} label="Friends" />
        <TopTab icon={BellIcon} label="Alerts" />
        <TopTab icon={MoreIcon} label="Menu" />
      </div>

      <div className="space-y-2 px-3 py-2.5">
        <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-1.5 p-2">
            <span className="size-4 rounded-full bg-white/15" />
            <span className="h-1 w-12 rounded bg-white/15" />
            <span className="ml-auto text-[5px] text-white/20">2h</span>
          </div>
          <div className="h-[80px] bg-gradient-to-br from-[#24344a] via-[#2b2a4b] to-[#13141b]" />
          <div className="flex items-center gap-3 p-2 text-white/35">
            <HeartIcon size={9} />
            <CommentIcon size={9} />
            <ShareIcon size={9} />
          </div>
        </div>

        {guardOn ? (
          <div className="rounded-xl border border-mint/10 bg-mint/[0.025] px-2.5 py-2">
            <p className="text-[6.5px] leading-relaxed text-mint/45">
              Reels discovery is hidden. Followed creators, friends and groups stay.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-[7.5px] font-medium text-white/60">Reels and short videos</span>
              <span className="text-[5.5px] text-white/20">See all</span>
            </div>
            <div className="grid grid-cols-3 gap-1 px-1.5 pb-1.5">
              {REEL_GRADIENTS.map((gradient) => (
                <div
                  key={gradient}
                  className={cn(
                    "relative h-[62px] overflow-hidden rounded-md bg-gradient-to-b",
                    gradient,
                  )}
                >
                  <span className="absolute inset-0 grid place-items-center text-white/45">
                    <PlayIcon size={8} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TopTab({
  icon: Icon,
  label,
  active,
}: {
  icon: typeof HomeIcon;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-1 flex-col items-center gap-0.5 py-1.5",
        active ? "text-[#6f9dff]" : "text-white/35",
      )}
    >
      <Icon size={11} />
      <span className="text-[5px]">{label}</span>
      {active ? <span className="absolute inset-x-4 -bottom-[1px] h-[1.5px] rounded-full bg-[#6f9dff]" /> : null}
    </div>
  );
}
