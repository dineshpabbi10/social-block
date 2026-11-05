# Reelbrake

**Open Instagram. No Reels tab.**

Reelbrake removes the Reels tab from Instagram, Shorts from YouTube, and Reels from Facebook — while leaving DMs, stories, posts, subscriptions, search, comments, and the rest of each site intact.

It is not a screen-time tracker, a launcher, or a daily open limit. It removes the short-form surfaces and gets out of the way.

---

## How it works (the honest version)

A normal PWA runs in its own origin and **cannot modify another website**. No amount of CSS, iframes, or web APIs can delete an element inside `instagram.com` from `reelbrake.app`.

So Reelbrake is two pieces:

1. **This Next.js PWA** — choose your sites, options, and build a configured userscript.
2. **A userscript manager** — Tampermonkey, Violentmonkey, or Userscripts on iOS. The script runs *inside* Instagram / YouTube / Facebook and hides the short-form surfaces there.

The PWA fetches the canonical script at [`public/reelbrake.user.js`](public/reelbrake.user.js), replaces its config marker with your settings, and downloads a customized `reelbrake.user.js`.

> **Native apps cannot be modified.** The Instagram, YouTube, and Facebook phone apps are closed software. Reelbrake works in the browser versions (desktop, Safari on iOS, Firefox on Android). This is a browser limitation, not a missing feature.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>, choose your sites, and press **Download guard**.

Then:

| Platform | Setup |
| --- | --- |
| **Desktop** | Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/), open the downloaded `.user.js`, and confirm the install. |
| **iPhone / iPad** | Install the [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) Safari extension, enable it for the sites, then paste the script from **Copy script** into a new script. |
| **Android** | Install Firefox for Android and the [Tampermonkey add-on](https://addons.mozilla.org/en-US/android/addon/tampermonkey/), then paste from **Copy script** into a new script. |

If a manager does not intercept the downloaded file, **Copy script** is the reliable fallback everywhere: manager dashboard → new script → paste over the template → save.

### Verify

- `instagram.com` — no Reels tab in the navigation.
- `youtube.com` — no Shorts tab in the sidebar or mobile bar.
- Open `instagram.com/reels/` or a `youtube.com/shorts/…` link — you should land on the site home with a small “Reels are off.” notice.

## Configuration

Settings live in `localStorage` under `reelbrake:guard-config:v1` and are baked into the downloaded script. Changing a setting later means downloading again and replacing the old script.

| Key | Default | What it does |
| --- | --- | --- |
| `instagram` | `true` | Hide Reels surfaces on Instagram. |
| `youtube` | `true` | Hide Shorts surfaces on YouTube. |
| `facebook` | `true` | Hide Reels surfaces on Facebook. |
| `tiktok` | `false` | Block the whole TikTok site. Short-form by design. |
| `redirects` | `true` | Send `/reel/` and `/shorts/` URLs back to the site home. |
| `hideShelves` | `true` | Hide Reels/Shorts rows in feeds and search results. |
| `showNotice` | `true` | Show a brief confirmation toast. No counters or tracking. |

The userscript has no network calls. It only reads the current page and URL.

## Project structure

```
public/
  reelbrake.user.js       canonical userscript + config marker
  sw.js                   app-shell offline cache
  icons/                  PWA icons
src/
  app/
    page.tsx              home: hero, what it hides, installer, guide
    settings/page.tsx     settings, update, install, troubleshooting
    about/page.tsx        rationale, privacy, FAQ, limitations
    manifest.ts           PWA manifest
    layout.tsx            metadata, providers, app shell
    offline/page.tsx      offline fallback
  components/
    app-shell.tsx         navigation, install prompt, SW registration
    guard-config-card.tsx site toggles + script builder/downloader
    guard-preview.tsx     interactive before/after preview
    platform-guide.tsx    desktop / iOS / Android setup
    ui.tsx                buttons, cards, toggles, sheets
    icons.tsx             inline icon set and brand marks
  lib/
    guard-config.tsx      localStorage-backed config store
    userscript.ts         config injection, download, clipboard
```

## Scripts

```bash
npm run dev      # development server
npm run lint     # ESLint
npm run build    # production build
npm run start    # serve the production build
```

## Limitations

- **Native apps are out.** Only browser versions can be guarded.
- **Per browser and per profile.** Install the script in each one you use.
- **Sites redesign.** A selector can stop matching after a large Instagram or YouTube update. Re-download the latest script when a surface reappears.
- **Unofficial.** Reelbrake is not affiliated with Meta, Instagram, YouTube, Google, or Facebook.
- **A guardrail, not a prison.** It removes the automatic tap and redirects obvious short-form URLs. A determined search can still find a video.

## Privacy

No account. No analytics. No server-side storage. The PWA stores only your local configuration; the userscript runs entirely in your browser. Uninstalling the script and clearing site data removes everything.

## License

Personal project. Use at your own discretion.
