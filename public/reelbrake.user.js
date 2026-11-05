// ==UserScript==
// @name         Reelbrake — hide Reels & Shorts
// @namespace    https://reelbrake.local/
// @version      1.0.1
// @description  Hides Instagram Reels discovery while keeping followed-account Reels, plus YouTube Shorts and Facebook Reels.
// @author       Reelbrake
// @match        https://www.instagram.com/*
// @match        https://instagram.com/*
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @match        https://music.youtube.com/*
// @match        https://www.facebook.com/*
// @match        https://m.facebook.com/*
// @match        https://web.facebook.com/*
// @match        https://www.tiktok.com/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(function () {
  "use strict";

  var CONFIG = /* @reelbrake-config */ {"instagram":true,"youtube":true,"facebook":true,"tiktok":false,"redirects":true,"hideShelves":true,"showNotice":true};

  var HOST = location.hostname;
  var IS_INSTAGRAM = /(^|\.)instagram\.com$/i.test(HOST);
  var IS_YOUTUBE = /(^|\.)youtube\.com$/i.test(HOST);
  var IS_FACEBOOK = /(^|\.)facebook\.com$/i.test(HOST);
  var IS_TIKTOK = /(^|\.)tiktok\.com$/i.test(HOST);

  if (IS_INSTAGRAM && !CONFIG.instagram) return;
  if (IS_YOUTUBE && !CONFIG.youtube) return;
  if (IS_FACEBOOK && !CONFIG.facebook) return;
  if (IS_TIKTOK && !CONFIG.tiktok) return;
  if (!IS_INSTAGRAM && !IS_YOUTUBE && !IS_FACEBOOK && !IS_TIKTOK) return;

  var HOME = IS_INSTAGRAM
    ? "https://www.instagram.com/"
    : IS_YOUTUBE
      ? "https://www.youtube.com/"
      : IS_FACEBOOK
        ? "https://www.facebook.com/"
        : "https://www.tiktok.com/";

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  function addStyle(css) {
    var style = document.createElement("style");
    style.id = "reelbrake-style";
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function hide(element) {
    if (!element) return;
    if (element.getAttribute("data-reelbrake-hidden") === "1") return;
    element.setAttribute("data-reelbrake-hidden", "1");
    element.style.setProperty("display", "none", "important");
  }

  function textOf(element) {
    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  /**
   * Walk up from a nav link while the ancestor contains only this one link
   * and a label that matches the thing we are hiding. This removes the whole
   * nav item rather than leaving an empty gap, without ever reaching the
   * whole navigation container.
   */
  function hideNavItem(element, labels) {
    if (!element) return;
    var node = element;
    for (var index = 0; index < 5; index += 1) {
      var parent = node.parentElement;
      if (!parent || parent === document.body || parent === document.documentElement) break;
      var links = parent.querySelectorAll('a, button, [role="link"], [role="button"]');
      var text = textOf(parent);
      if (links.length === 1 && (text === "" || labels.indexOf(text) !== -1)) {
        node = parent;
      } else {
        break;
      }
    }
    hide(node);
  }

  function showNotice(message) {
    if (!CONFIG.showNotice) return;
    var existing = document.querySelector("[data-reelbrake-notice]");
    if (existing) existing.remove();

    var notice = document.createElement("div");
    notice.setAttribute("data-reelbrake-notice", "1");
    notice.textContent = message;
    notice.style.cssText =
      "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483647;" +
      "padding:10px 16px;border-radius:999px;background:#0b1511;color:#7ff2c3;" +
      "border:1px solid rgba(127,242,195,.28);box-shadow:0 16px 44px rgba(0,0,0,.55);" +
      "font:600 12px/1.2 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
      "letter-spacing:.01em;pointer-events:none;white-space:nowrap;";
    (document.body || document.documentElement).appendChild(notice);
    setTimeout(function () {
      if (notice.parentElement) notice.parentElement.removeChild(notice);
    }, 3600);
  }

  function sessionGet(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function sessionSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* storage can be disabled */
    }
  }

  function sessionRemove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* storage can be disabled */
    }
  }

  /* ------------------------------------------------------------------ */
  /* URL guard                                                           */
  /* ------------------------------------------------------------------ */

  function isShortFormPath() {
    var path = location.pathname.toLowerCase().replace(/\/+$/, "") + "/";

    if (IS_INSTAGRAM) {
      if (/^\/reels\/$/.test(path)) return true;
      if (/^\/explore\/reels?\//.test(path)) return true;
      return false;
    }

    if (IS_YOUTUBE) {
      if (/^\/shorts\//.test(path)) return true;
      return /^\/(?:@[^/]+|channel\/[^/]+|c\/[^/]+|user\/[^/]+)\/shorts\/$/.test(path);
    }

    if (IS_FACEBOOK) {
      if (/^\/reels\/$/.test(path)) return true;
      if (/^\/share\/r\//.test(path)) return true;
      return false;
    }

    return false;
  }

  function checkPath() {
    if (!CONFIG.redirects || IS_TIKTOK) return;
    if (!isShortFormPath()) return;
    sessionSet("reelbrake:redirect-notice", "1");
    location.replace(HOME);
  }

  function patchHistory() {
    function wrap(original) {
      return function () {
        var result = original.apply(this, arguments);
        setTimeout(checkPath, 60);
        return result;
      };
    }
    try {
      history.pushState = wrap(history.pushState);
      history.replaceState = wrap(history.replaceState);
    } catch {
      /* Some pages freeze the history object; the interval below still works. */
    }
    window.addEventListener("popstate", function () {
      setTimeout(checkPath, 60);
    });
  }

  function showStartupNotice() {
    if (sessionGet("reelbrake:redirect-notice") === "1") {
      sessionRemove("reelbrake:redirect-notice");
      setTimeout(function () {
        showNotice("Explore Reels are off. That is the guard.");
      }, 500);
      return;
    }
    if (sessionGet("reelbrake:on-notice") === "1") return;
    sessionSet("reelbrake:on-notice", "1");
    setTimeout(function () {
      showNotice("Reelbrake is on. Suggested Reels hidden.");
    }, 1200);
  }

  /* ------------------------------------------------------------------ */
  /* CSS                                                                 */
  /* ------------------------------------------------------------------ */

  var css = "";

  if (IS_INSTAGRAM) {
    css +=
      'nav a[href="/reels/"],nav a[href="/reels"],' +
      '[role="navigation"] a[href="/reels/"],[role="navigation"] a[href="/reels"],' +
      'a[href="/explore/reels/"],a[href="/explore/reels"],' +
      '[role="navigation"] [aria-label="Reels"]' +
      "{display:none !important;}";
  }

  if (IS_YOUTUBE) {
    css +=
      "ytd-guide-entry-renderer:has(a[href^='/shorts'])," +
      "ytd-mini-guide-entry-renderer:has(a[href^='/shorts'])," +
      "ytm-pivot-bar-item-renderer:has(a[href^='/shorts'])," +
      "tp-yt-paper-tab:has(a[href^='/shorts'])," +
      "yt-tab-shape[tab-title='Shorts']" +
      "{display:none !important;}";

    if (CONFIG.hideShelves) {
      css +=
        "ytd-reel-shelf-renderer," +
        "ytd-rich-section-renderer:has(ytd-reel-shelf-renderer)," +
        "ytd-rich-shelf-renderer[is-shorts]," +
        "ytd-shorts," +
        "ytm-reel-shelf-renderer," +
        "ytm-shorts-lockup-view-model," +
        "ytm-shorts-lockup-view-model-v2," +
        "ytd-rich-item-renderer:has(a[href^='/shorts/'])," +
        "ytd-video-renderer:has(a[href^='/shorts/'])," +
        "ytd-grid-video-renderer:has(a[href^='/shorts/'])" +
        "{display:none !important;}";
    }
  }

  if (IS_FACEBOOK) {
    css +=
      "[role='navigation'] a[href*='/reel/']," +
      "[role='navigation'] a[href*='/reels/']," +
      "[role='banner'] a[href*='/reel/']," +
      "[role='banner'] a[href*='/reels/']," +
      "[role='navigation'] [aria-label='Reels']," +
      "[role='banner'] [aria-label='Reels']" +
      "{display:none !important;}";
  }

  /* ------------------------------------------------------------------ */
  /* DOM cleanup                                                         */
  /* ------------------------------------------------------------------ */

  function hasFollowAction(card) {
    return Array.from(card.querySelectorAll("button, [role='button']")).some(function (button) {
      var label = button.getAttribute("aria-label") || button.getAttribute("title") || "";
      return /^follow(?:\s|$)/i.test(label.trim()) || /^follow$/i.test(textOf(button));
    });
  }

  function cleanInstagram() {
    var labels = ["Reels", "Reel"];
    document.querySelectorAll('a[href="/reels/"], a[href="/reels"], a[href="/explore/reels/"], a[href="/explore/reels"]').forEach(function (link) {
      hideNavItem(link, labels);
    });

    document.querySelectorAll('[role="navigation"] a, [role="navigation"] button, nav a, nav button').forEach(function (element) {
      var label = element.getAttribute("aria-label") || "";
      if (label === "Reels" || textOf(element) === "Reels") {
        hideNavItem(element, labels);
      }
    });

    document.querySelectorAll('a[href^="/reel/"], a[href^="/reels/"]').forEach(function (link) {
      if (link.closest("nav, [role='navigation']")) hideNavItem(link, labels);
    });

    if (!CONFIG.hideShelves) return;

    document.querySelectorAll("article, div[role='article']").forEach(function (card) {
      var reelLink = card.querySelector("a[href^='/reel/'], a[href^='/reels/']");
      if (reelLink && hasFollowAction(card)) hide(card);
    });
  }

  function cleanYouTube() {
    var labels = ["Shorts"];
    document
      .querySelectorAll(
        "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer, ytm-pivot-bar-item-renderer, yt-tab-shape, tp-yt-paper-tab",
      )
      .forEach(function (element) {
        var label = element.getAttribute("aria-label") || element.getAttribute("tab-title") || "";
        var text = textOf(element);
        if (label === "Shorts" || text === "Shorts") hide(element);
      });

    document.querySelectorAll('a[href="/shorts/"], a[href="/shorts"], a[href^="/shorts/"]').forEach(function (link) {
      if (link.closest("nav, ytd-guide-renderer, ytd-mini-guide-renderer, ytm-pivot-bar-renderer, tp-yt-paper-tab, yt-tab-shape")) {
        hideNavItem(link, labels);
      }
    });
  }

  function cleanFacebook() {
    var labels = ["Reels", "Reel"];
    document
      .querySelectorAll('[role="navigation"] a, [role="navigation"] button, [role="banner"] a, [role="banner"] button, nav a, nav button')
      .forEach(function (element) {
        var label = element.getAttribute("aria-label") || "";
        if (label === "Reels" || textOf(element) === "Reels") {
          hideNavItem(element, labels);
        }
      });

    document.querySelectorAll('a[href*="/reel/"], a[href*="/reels/"]').forEach(function (link) {
      if (link.closest('[role="navigation"], [role="banner"], nav')) hideNavItem(link, labels);
    });

    if (!CONFIG.hideShelves) return;

    document.querySelectorAll("div[role='article']").forEach(function (card) {
      var reelLink = card.querySelector("a[href*='/reel/'], a[href*='/reels/']");
      if (reelLink && hasFollowAction(card)) hide(card);
    });
  }

  function clean() {
    if (IS_INSTAGRAM) cleanInstagram();
    if (IS_YOUTUBE) cleanYouTube();
    if (IS_FACEBOOK) cleanFacebook();
  }

  /* ------------------------------------------------------------------ */
  /* TikTok: short-form only, so the whole feed is blocked if enabled.   */
  /* ------------------------------------------------------------------ */

  function blockTikTok() {
    if (document.getElementById("reelbrake-tiktok-block")) return;
    if (!document.body) {
      setTimeout(blockTikTok, 300);
      return;
    }

    document.documentElement.style.setProperty("overflow", "hidden", "important");

    var overlay = document.createElement("div");
    overlay.id = "reelbrake-tiktok-block";
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;" +
      "justify-content:center;padding:28px;background:#07070a;color:#f4f4f7;" +
      "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;text-align:center;";

    var panel = document.createElement("div");
    panel.style.cssText = "max-width:360px;";

    var mark = document.createElement("div");
    mark.textContent = "reelbrake";
    mark.style.cssText =
      "font-weight:600;font-size:14px;letter-spacing:-.03em;color:#7ff2c3;margin-bottom:26px;";

    var title = document.createElement("h1");
    title.textContent = "TikTok is short-form by design.";
    title.style.cssText =
      "font-size:28px;line-height:1.1;letter-spacing:-.04em;font-weight:600;margin:0;";

    var body = document.createElement("p");
    body.textContent =
      "There is no long-form part to keep. You asked Reelbrake to block this feed, so it did.";
    body.style.cssText =
      "font-size:13px;line-height:1.65;color:rgba(255,255,255,.45);margin:14px 0 24px;";

    var close = document.createElement("button");
    close.type = "button";
    close.textContent = "Close this tab";
    close.style.cssText =
      "appearance:none;border:0;border-radius:14px;background:#7ff2c3;color:#08130f;" +
      "font:600 13px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
      "padding:14px 24px;cursor:pointer;";
    close.addEventListener("click", function () {
      window.close();
      setTimeout(function () {
        body.textContent = "Close the tab when you are ready. It will still be here tomorrow.";
      }, 150);
    });

    var note = document.createElement("p");
    note.textContent = "To allow TikTok again, download Reelbrake without TikTok blocking.";
    note.style.cssText = "font-size:10px;line-height:1.5;color:rgba(255,255,255,.22);margin-top:22px;";

    panel.appendChild(mark);
    panel.appendChild(title);
    panel.appendChild(body);
    panel.appendChild(close);
    panel.appendChild(note);
    overlay.appendChild(panel);
    document.documentElement.appendChild(overlay);
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */

  function start() {
    if (IS_TIKTOK) {
      if (CONFIG.tiktok) blockTikTok();
      return;
    }

    addStyle(css);
    checkPath();
    patchHistory();
    clean();
    showStartupNotice();

    var scheduled = false;
    function scheduleClean() {
      if (scheduled) return;
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        clean();
      }, 180);
    }

    if (document.documentElement) {
      new MutationObserver(scheduleClean).observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }

    setInterval(checkPath, 900);
  }

  if (document.documentElement) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  }
})();
