import type { Metadata } from "next";
import { Card, Pill } from "@/components/ui";
import {
  AlertIcon,
  BanIcon,
  CheckCircleIcon,
  CodeIcon,
  DownloadIcon,
  EyeOffIcon,
  HeartIcon,
  InfoIcon,
  LockIcon,
  ShieldCheckIcon,
  SlidersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Reelbrake exists, how the userscript works, what it can and cannot do, and the privacy model behind it.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <header>
        <Pill tone="violet">
          <HeartIcon size={10} />
          Why this exists
        </Pill>
        <h1 className="mt-3 max-w-2xl text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[42px]">
          The feed is fine.
          <br />
          <span className="font-display font-normal italic tracking-[-0.03em] text-violet">
            The loop is the problem.
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-white/52">
          Reelbrake is not a screen-time dashboard, a launcher, or a guilt machine. It removes the
          short-form surfaces from three sites and leaves the rest alone. You should be able to
          check your messages without falling into a Reels tab that was never part of the plan.
        </p>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        <Card className="border-mint/15 p-5">
          <div className="flex items-center gap-2 text-mint/80">
            <CheckCircleIcon size={15} />
            <p className="eyebrow !text-mint/60">What it is</p>
          </div>
          <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-white/55">
            {[
              "A configurator that builds a userscript for your chosen sites.",
              "A narrow CSS and URL guard: tabs, shelves and short-form links.",
              "Local-only. Your settings never leave this browser.",
              "Free of accounts, streaks, counters and open limits.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircleIcon size={13} className="mt-0.5 shrink-0 text-mint/60" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-coral/15 p-5">
          <div className="flex items-center gap-2 text-coral/80">
            <BanIcon size={15} />
            <p className="eyebrow !text-coral/60">What it is not</p>
          </div>
          <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-white/55">
            {[
              "Not an app that limits how often you can open Instagram.",
              "Not a tracker. It never records what you watch or when.",
              "Not a native app mod. The phone apps cannot be changed.",
              "Not a general content filter. It targets short-form video surfaces.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <BanIcon size={13} className="mt-0.5 shrink-0 text-coral/60" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <p className="eyebrow mb-2">Under the hood</p>
        <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-white">
          A small guard, not a platform
        </h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            {
              icon: DownloadIcon,
              title: "One generated file",
              body: "This PWA fetches a static userscript and swaps its config marker for your settings. Download or copy it; no build server is involved.",
            },
            {
              icon: SlidersIcon,
              title: "CSS for surfaces",
              body: "The script hides Reels and Shorts discovery surfaces. Instagram and Facebook suggested Reel cards are hidden while cards from accounts you follow stay visible.",
            },
            {
              icon: ShieldCheckIcon,
              title: "A guard for links",
              body: "Discovery-feed paths are checked on load and navigation. Instagram and Facebook profile and individual Reel links remain accessible.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-4">
              <span className="grid size-9 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/55">
                <item.icon size={15} />
              </span>
              <h3 className="mt-3 text-[12.5px] font-medium text-white/85">{item.title}</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-white/55">{item.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-3 flex gap-2 rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3">
          <CodeIcon size={14} className="mt-0.5 shrink-0 text-mint/60" />
          <p className="font-mono text-[10.5px] leading-relaxed text-white/52">
            var CONFIG = {"/* @reelbrake-config */"}{" "}
            <span className="text-mint/55">
              {`{"instagram":true,"youtube":true,"facebook":true,"tiktok":false}`}
            </span>
            ;
          </p>
        </div>
      </section>

      <section>
        <p className="eyebrow mb-2">Privacy</p>
        <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-white">
          Nothing to collect, nothing to sell
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: LockIcon,
              title: "Local settings",
              body: "Your selections are stored in localStorage under a Reelbrake key. Clearing site data removes them.",
            },
            {
              icon: EyeOffIcon,
              title: "No analytics",
              body: "There is no tracking script, no account, and no event pipeline. The app has nothing to report.",
            },
            {
              icon: AlertIcon,
              title: "The script runs locally",
              body: "It has no network calls and no remote config. It only reads the current page and the URL.",
            },
            {
              icon: InfoIcon,
              title: "Static hosting",
              body: "The app serves static files. Your guard is built in your browser from a file on this origin.",
            },
          ].map((item) => (
            <Card key={item.title} className="flex gap-3 p-4">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50">
                <item.icon size={14} />
              </span>
              <div>
                <h3 className="text-[12px] font-medium text-white/82">{item.title}</h3>
                <p className="mt-1 text-[11px] leading-relaxed text-white/55">{item.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <p className="eyebrow mb-2">Straight answers</p>
        <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-white">FAQ</h2>
        <div className="mt-3 space-y-2">
          {[
            {
              q: "Why can’t this just be an app I install?",
              a: "Browser security isolates websites from each other. An installed PWA cannot reach into instagram.com or youtube.com. A userscript runs inside those pages, which is why it works and why it needs a manager.",
            },
            {
              q: "Does it work on my phone?",
              a: "In a browser, yes. On Android, use Firefox with Tampermonkey. On iOS, use Safari with the Userscripts extension. The native Instagram and YouTube apps ignore it completely.",
            },
            {
              q: "Will Instagram or YouTube break it?",
              a: "Sometimes. Both sites redesign their markup, and a selector can stop matching. The guard is easy to update: download the latest file and replace the old script. The link redirects are less fragile than the visual hiding.",
            },
            {
              q: "Will I lose messages, stories or subscriptions?",
              a: "No. Reelbrake only hides elements whose purpose is short-form video. Direct messages, stories, the regular feed, search, subscriptions, playlists and comments are left untouched.",
            },
            {
              q: "Does it stop me from using Reels another way?",
              a: "It redirects the obvious short-form URLs and hides the app’s own entry points. It is a guardrail, not a prison. A determined search can still find a video. The point is to remove the automatic tap, not to police you.",
            },
            {
              q: "Is this affiliated with Meta or Google?",
              a: "No. Reelbrake is an independent, unofficial tool. It changes only the page you are already viewing, in your own browser.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 open:bg-white/[0.035]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[12px] font-medium text-white/78 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/10 text-[13px] font-normal text-white/52 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 max-w-2xl text-[11.5px] leading-relaxed text-white/55">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-lg">
            <p className="eyebrow mb-2">One last thing</p>
            <h2 className="text-[17px] font-semibold tracking-[-0.025em] text-white">
              You are not the product here.
            </h2>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/55">
              This is a small tool for a specific annoyance: opening a site for one thing and
              losing twenty minutes to another. Use it, change your mind, delete it. None of that
              is tracked.
            </p>
          </div>
          <Pill tone="mint">
            <ShieldCheckIcon size={10} />
            Local only
          </Pill>
        </div>
      </Card>
    </div>
  );
}
