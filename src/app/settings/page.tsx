import type { Metadata } from "next";
import { GuardConfigCard } from "@/components/guard-config-card";
import { Card, Pill, SectionHeading } from "@/components/ui";
import {
  AlertIcon,
  CheckCircleIcon,
  DownloadIcon,
  InfoIcon,
  RotateIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  TrashIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Configure which Reels and Shorts surfaces Reelbrake hides, update the guard, install the PWA, or remove it.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <header>
        <Pill tone="mint">
          <ShieldCheckIcon size={10} />
          Your guard
        </Pill>
        <h1 className="mt-3 text-[30px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[36px]">
          Settings
        </h1>
        <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-white/50">
          Everything here is stored in this browser. Change a setting, download the guard again,
          and replace the old script in your userscript manager.
        </p>
      </header>

      <section>
        <GuardConfigCard />
      </section>

      <section>
        <SectionHeading
          eyebrow="Keep it current"
          title="Update or reinstall"
          subtitle="There is no live sync. The script is a file you own, so updating means downloading a fresh copy."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Change your settings",
              body: "Toggle sites or options above. Your choices save instantly in this browser.",
            },
            {
              step: "2",
              title: "Download a fresh guard",
              body: "Press Download guard. The new file contains your current settings.",
            },
            {
              step: "3",
              title: "Replace the old script",
              body: "Remove the previous Reelbrake script in your manager, then install the new file. Keeping both can double the notices.",
            },
          ].map((item) => (
            <Card key={item.step} className="p-4">
              <span className="grid size-7 place-items-center rounded-full border border-mint/20 bg-mint/[0.08] text-[11px] font-semibold text-mint/85">
                {item.step}
              </span>
              <h3 className="mt-2.5 text-[12.5px] font-medium text-white/85">{item.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-white/48">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="App install"
          title="Add Reelbrake to your home screen"
          subtitle="Optional. The control panel works fine in a tab, but installing keeps the guard file one tap away."
        />
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-white/45">
              <DownloadIcon size={14} />
              <p className="text-[11.5px] font-medium text-white/72">Desktop</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/48">
              In Chrome or Edge, use the install icon in the address bar, or the browser menu →{" "}
              <em>Install Reelbrake</em>.
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-white/45">
              <SmartphoneIcon size={14} />
              <p className="text-[11.5px] font-medium text-white/72">iPhone &amp; iPad</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/48">
              In Safari, tap Share → <em>Add to Home Screen</em>. The guard itself still lives in
              the Userscripts Safari extension.
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-white/45">
              <SmartphoneIcon size={14} />
              <p className="text-[11.5px] font-medium text-white/72">Android</p>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/48">
              In Chrome, open the menu → <em>Add to Home screen</em> → Install. Use Firefox with
              Tampermonkey for the actual guard.
            </p>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Troubleshooting"
          title="If something looks off"
          subtitle="Most problems are a manager that is not allowed to run on the site yet."
        />
        <div className="space-y-2">
          {[
            {
              q: "The Reels tab is still there",
              a: "Open your userscript manager and confirm Reelbrake is enabled and allowed on instagram.com. Then refresh the tab. If it still appears, the site changed its markup — download a fresh guard or check for an update.",
            },
            {
              q: "The script will not install from the file",
              a: "Use Copy script instead. In the manager, create a new script, select the template text, paste the copied guard, and save. This works on desktop, Firefox Android and the iOS Userscripts app.",
            },
            {
              q: "It works on desktop but not on my phone",
              a: "The guard follows the browser. If you open the native Instagram or YouTube app, nothing changes. On Android, use Firefox with Tampermonkey. On iOS, use Safari with the Userscripts extension enabled.",
            },
            {
              q: "I still see a Reels or Shorts link somewhere",
              a: "The guard hides the main surfaces and redirects direct short-form URLs. A site can always add a new entry point. Send yourself the link, and it will bounce home as long as redirects are on.",
            },
            {
              q: "I want the feed completely clean",
              a: "Turn on Hide Reels and Shorts shelves. That removes short-form rows from the home feed and search results. The rest of the feed stays, because Reelbrake is not a general content filter.",
            },
            {
              q: "How do I remove it?",
              a: "Delete the Reelbrake script in your userscript manager. Reels and Shorts come back on the next page load. You can also delete this PWA; it holds only your local settings.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 open:bg-white/[0.035]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[12px] font-medium text-white/78 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-white/10 text-[13px] font-normal text-white/45 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2.5 max-w-2xl text-[11.5px] leading-relaxed text-white/48">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-white/45">
            <RotateIcon size={14} />
            <p className="text-[11.5px] font-medium text-white/72">Start over</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-white/48">
            Reset settings restores the recommended defaults: Instagram, YouTube and Facebook on,
            TikTok off, redirects and shelves on. It does not touch an installed script.
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-coral/70">
            <TrashIcon size={14} />
            <p className="text-[11.5px] font-medium text-white/72">Uninstall</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-white/48">
            Delete the script in your manager to remove the guard. Uninstall this PWA from your
            browser or home screen to remove the configurator. Nothing is left on a server.
          </p>
        </Card>
      </section>

      <div className="flex gap-2 rounded-2xl border border-amber/15 bg-amber/[0.04] px-3.5 py-3 text-[10.5px] leading-relaxed text-amber/65">
        <AlertIcon size={14} className="mt-px shrink-0" />
        Changing settings here does not update a guard that is already installed. Download the
        script again and replace the old one.
      </div>

      <div className="flex gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 text-[10.5px] leading-relaxed text-white/42">
        <InfoIcon size={14} className="mt-px shrink-0 text-white/48" />
        Reelbrake is not affiliated with Instagram, Meta, YouTube or Google. It hides parts of
        pages you already have access to.
      </div>

      <div className="flex items-center gap-2 text-[10.5px] text-white/36">
        <CheckCircleIcon size={12} className="text-mint/60" />
        No account. No analytics. No usage limits.
      </div>
    </div>
  );
}
