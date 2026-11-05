import type { GuardConfig } from "./guard-config";

/**
 * The static userscript in /public is the source of truth. The PWA replaces
 * its config line with the current settings before downloading it.
 */
const CONFIG_PATTERN = /var CONFIG = \/\* @reelbrake-config \*\/ \{[^\n]*\};/;

export function applyConfig(source: string, config: GuardConfig): string {
  const payload = {
    instagram: config.instagram,
    youtube: config.youtube,
    facebook: config.facebook,
    tiktok: config.tiktok,
    redirects: config.redirects,
    hideShelves: config.hideShelves,
    showNotice: config.showNotice,
  };

  if (!CONFIG_PATTERN.test(source)) {
    throw new Error("The guard file is missing its config marker.");
  }

  return source.replace(
    CONFIG_PATTERN,
    `var CONFIG = /* @reelbrake-config */ ${JSON.stringify(payload)};`,
  );
}

export async function fetchConfiguredGuard(config: GuardConfig): Promise<string> {
  const response = await fetch("/reelbrake.user.js", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load the guard file.");
  return applyConfig(await response.text(), config);
}

export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API can be unavailable (or require a different gesture).
  }

  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
  } catch {
    return false;
  }
}
