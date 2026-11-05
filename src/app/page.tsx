import type { Metadata } from "next";
import { GuardPreview } from "@/components/guard-preview";
import { GuardConfigCard } from "@/components/guard-config-card";
import { PlatformGuide } from "@/components/platform-guide";
import { Card, Pill, SectionHeading } from "@/components/ui";
import { buttonStyles } from "@/components/button-styles";
import {
  AlertIcon,
  BanIcon,
  CheckIcon,
  ChevronRightIcon,
  DownloadIcon,
  InfoIcon,
  LinkIcon,
  ShieldCheckIcon,
  SlidersIcon,
  SmartphoneIcon,
  SparklesIcon,
  SiteIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Reelbrake — open Instagram without the Reels tab",
  description:
    "Remove Reels from Instagram, Shorts from YouTube and Reels from Facebook. Keep DMs, stories, subscriptions and the rest. A local-only PWA that builds the userscript doing the blocking.",
};

const HIDES = [
  {
    key: "instagram" as const,
    name: "Instagram",
    items: [
      "Reels tab in the navigation",
      "Reels on profiles and Explore",
      "Suggested Reels in the feed",
      "/reel/ links in the address bar",
    ],
  },
  {
    key: "youtube" as const,
    name: "YouTube",
    items: [
      "Shorts tab in the sidebar and mobile bar",
      "Shorts shelves on Home and in search",
      "Shorts tabs on channel pages",
      "/shorts/ links in the address bar",
    ],
  },
  {
    key: "facebook" as const,
    name: "Facebook",
    items: [
      "Reels tab in the top bar",
      "Reels cards in the feed",
      "Reels links in the address bar",
      "Reels entries in navigation",
    ],
  },
];

const KEEPS = [
  {
    name: "Instagram",
    items: ["DMs", "Stories", "Feed", "Search", "Profiles", "Comments"],
  },
  {
    name: "YouTube",
    items: ["Subscriptions", "Search", "Playlists", "Channels", "Comments", "History"],
  },
  {
    name: "Facebook",
    items: ["Friends", "Groups", "Feed", "Messenger", "Marketplace", "Notifications"],
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="grid items-center gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10">
        <div className="stagger">
          <Pill tone="mint">
            <ShieldCheckIcon size={10} />
            Instagram · YouTube · Facebook
          </Pill>

          <h1 className="mt-4 text-[40px] font-semibold leading-[0.94] tracking-[-0.045em] text-white sm:text-[54px] lg:text-[60px]">
            Open Instagram.
            <br />
            <span className="font-display font-normal italic tracking-[-0.03em] text-mint">
              No Reels tab.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/48 sm:text-[15px]">
            Reelbrake removes Reels from Instagram, Shorts from YouTube and Reels from Facebook —
            then gives you back the parts you actually opened: DMs, stories, subscriptions and the
            people you follow.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <a href="#installer" className={buttonStyles("primary", "lg")}>
              Build my guard
              <ChevronRightIcon size={16} />
            </a>
            <a href="#how" className={buttonStyles("secondary", "lg")}>
              How it works
            </a>
          </div>

          <ul className="mt-6 grid gap-2 text-[11.5px] text-white/50 sm:grid-cols-2">
            {[
              "No account, no tracking",
              "Works on web Instagram, YouTube & Facebook",
              "One-time browser setup",
              "Free and local-only",
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon size={12} className="shrink-0 text-mint/80" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-5 flex max-w-md gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-[10.5px] leading-relaxed text-white/42">
            <InfoIcon size={13} className="mt-px shrink-0 text-white/48" />
            The guard lives inside the site, so it needs a userscript manager in the browser. The
            native apps cannot be modified — that is a limit of every web tool, not just this one.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[360px] lg:max-w-none">
          <GuardPreview />
        </div>
      </section>

      <section id="how" className="scroll-mt-24">
        <SectionHeading
          eyebrow="The honest bit"
          title="Why this needs a userscript"
          subtitle="No PWA can reach into another website. Reelbrake uses the one mechanism that can."
        />
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="p-4">
            <span className="grid size-9 place-items-center rounded-xl border border-coral/20 bg-coral/[0.08] text-coral/80">
              <BanIcon size={16} />
            </span>
            <h3 className="mt-3 text-[13.5px] font-medium text-white/88">A PWA cannot do it alone</h3>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/48">
              Your browser isolates every website. Nothing this app does from its own origin can
              delete an element inside instagram.com or youtube.com.
            </p>
          </Card>
          <Card className="p-4">
            <span className="grid size-9 place-items-center rounded-xl border border-mint/20 bg-mint/[0.08] text-mint/85">
              <SlidersIcon size={16} />
            </span>
            <h3 className="mt-3 text-[13.5px] font-medium text-white/88">A userscript can</h3>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/48">
              It runs a few lines of CSS and a URL check inside the page itself. That is enough to
              remove the tab, the shelves and the short-form links.
            </p>
          </Card>
          <Card className="p-4">
            <span className="grid size-9 place-items-center rounded-xl border border-violet/20 bg-violet/[0.08] text-violet/85">
              <DownloadIcon size={16} />
            </span>
            <h3 className="mt-3 text-[13.5px] font-medium text-white/88">This app builds the file</h3>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/48">
              Pick your sites, download one file, install it once. Settings live in this browser.
              There is no server, account or timer involved.
            </p>
          </Card>
        </div>
      </section>

      <section id="what" className="scroll-mt-24">
        <SectionHeading
          eyebrow="What it hides"
          title="Reels and Shorts, not the rest"
          subtitle="The guard is deliberately narrow. It removes the short-form surfaces and leaves the parts you came for."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {HIDES.map((site) => (
            <Card key={site.key} className="p-4">
              <div className="flex items-center gap-2.5">
                <SiteIcon site={site.key} size={32} />
                <div>
                  <p className="text-[13.5px] font-medium text-white/90">{site.name}</p>
                  <p className="text-[10px] text-white/40">
                    {site.key === "youtube" ? "Shorts removed" : "Reels removed"}
                  </p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {site.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[11px] leading-relaxed text-white/48">
                    <span className="mt-[7px] size-1 shrink-0 rounded-full bg-coral/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="mt-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-[13.5px] font-medium text-white/88">Everything else stays</h3>
              <p className="mt-1 text-[11.5px] leading-relaxed text-white/48">
                Reelbrake hides elements. It does not log you out, delay loading, or track what you
                do.
              </p>
            </div>
            <Pill tone="neutral">
              <SparklesIcon size={10} />
              No feed rewrite
            </Pill>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {KEEPS.map((group) => (
              <div key={group.name} className="rounded-2xl border border-white/[0.05] bg-black/15 p-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/36">
                  {group.name}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.06] bg-white/[0.035] px-2 py-1 text-[10px] text-white/45"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="installer" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Your guard"
          title="Build it in one click"
          subtitle="Turn sites on or off, then download the file. Changing a setting later means downloading again — that is the whole update process."
        />
        <GuardConfigCard />
      </section>

      <section id="guide" className="scroll-mt-24">
        <PlatformGuide />
      </section>

      <section id="verify" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Check your work"
          title="Three ways to know it is on"
          subtitle="If one of these fails, refresh the page and confirm your userscript manager is allowed on that site."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Instagram looks shorter",
              body: "Open instagram.com. The Reels tab is gone from the navigation. Your feed, stories and DMs still work.",
            },
            {
              title: "YouTube has no Shorts",
              body: "Open youtube.com. Shorts is gone from the sidebar and the shelves on Home. Subscriptions still load.",
            },
            {
              title: "Short links bounce home",
              body: "Open instagram.com/reels/ or a youtube.com/shorts/ link. You should land on the site home with a small “Reels are off.” notice.",
            },
          ].map((item, index) => (
            <Card key={item.title} className="p-4">
              <div className="flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full border border-mint/20 bg-mint/[0.08] text-[10px] font-semibold text-mint/85">
                  {index + 1}
                </span>
                <h3 className="text-[12.5px] font-medium text-white/85">{item.title}</h3>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-white/48">{item.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-3 flex gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-[11px] leading-relaxed text-white/48">
          <LinkIcon size={14} className="mt-px shrink-0 text-white/48" />
          The link guard is intentionally simple: the short-form URL is replaced with the site
          home. It does not open a warning page, so there is nothing to click through.
        </div>
      </section>

      <section id="limits" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Limits, plainly"
          title="What Reelbrake cannot do"
          subtitle="It is better to know this now than to be surprised later."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: SmartphoneIcon,
              title: "It cannot change the phone apps",
              body: "Native Instagram, YouTube and Facebook apps are closed software. Reelbrake only runs in a browser that has the userscript installed.",
              tone: "coral",
            },
            {
              icon: AlertIcon,
              title: "Sites change their markup",
              body: "When Instagram or YouTube redesigns, a selector can stop matching. Re-download the latest guard if a tab reappears.",
              tone: "amber",
            },
            {
              icon: BanIcon,
              title: "It is per browser and per profile",
              body: "Install it in each browser or profile you use. Private windows may need the extension explicitly allowed.",
              tone: "violet",
            },
            {
              icon: InfoIcon,
              title: "It is unofficial",
              body: "Reelbrake is not affiliated with Meta or Google. It is a personal CSS and URL guard, used at your own discretion.",
              tone: "mint",
            },
          ].map((item) => (
            <Card key={item.title} className="flex gap-3 p-4">
              <span
                className={
                  item.tone === "coral"
                    ? "mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl border border-coral/20 bg-coral/[0.07] text-coral/80"
                    : item.tone === "amber"
                      ? "mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl border border-amber/20 bg-amber/[0.07] text-amber/80"
                      : item.tone === "violet"
                        ? "mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl border border-violet/20 bg-violet/[0.07] text-violet/80"
                        : "mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl border border-mint/20 bg-mint/[0.07] text-mint/80"
                }
              >
                <item.icon size={14} />
              </span>
              <div>
                <h3 className="text-[12.5px] font-medium text-white/85">{item.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-white/48">{item.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="relative overflow-hidden p-6 text-center sm:p-9">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-[28rem] -translate-x-1/2 rounded-full bg-mint/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="eyebrow mb-3">Ready when you are</p>
            <h2 className="mx-auto max-w-lg text-[24px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[30px]">
              Keep the feed. Lose the loop.
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-[12px] leading-relaxed text-white/48">
              One file, one install. Then Instagram opens like it did before the algorithm got
              loud.
            </p>
            <a href="#installer" className={buttonStyles("primary", "lg", "mt-5")}>
              Build my guard
              <ChevronRightIcon size={16} />
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}
