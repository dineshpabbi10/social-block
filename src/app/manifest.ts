import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reelbrake — no Reels, no Shorts",
    short_name: "Reelbrake",
    description:
      "Hide Instagram and Facebook Reels discovery while keeping Reels from people you follow. Also hide Shorts on YouTube. Local-only.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "any",
    lang: "en",
    dir: "ltr",
    background_color: "#07070a",
    theme_color: "#07070a",
    categories: ["productivity", "utilities", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Guard settings",
        short_name: "Settings",
        description: "Choose sites and download a fresh guard",
        url: "/settings",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "How it works",
        short_name: "About",
        description: "Setup, limitations and privacy",
        url: "/about",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
