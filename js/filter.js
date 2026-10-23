(() => {
  "use strict";

  // 每捲動多少 px 旋轉一圈：數值越小越快，必須大於 0。
  const SCROLL_PIXELS_PER_ROTATION = 600;
  const cd = document.getElementById("cd");
  const works = document.getElementById("works");
  if (!cd) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frameId = null;

  function updateRotation() {
    frameId = null;
    // 兼容整頁捲動與目前右側作品區獨立捲動的版面。
    const distance = Math.max(0, window.scrollY) + Math.max(0, works?.scrollTop ?? 0);
    const angle = reducedMotion.matches ? 0 : distance / SCROLL_PIXELS_PER_ROTATION * 360;
    cd.style.transform = `rotate(${angle}deg)`;
  }

  function requestUpdate() {
    if (frameId === null) {
      frameId = window.requestAnimationFrame(updateRotation);
    }
  }

  function onScroll() {
    if (!reducedMotion.matches) requestUpdate();
  }

  // 監聽實際捲動，支援滾輪、觸控板、觸控與鍵盤。
  // 每幀最多更新一次，不啟動持續動畫或慣性插值。
  window.addEventListener("scroll", onScroll, { passive: true });
  works?.addEventListener("scroll", onScroll, { passive: true });
  reducedMotion.addEventListener("change", requestUpdate);
  window.addEventListener("pageshow", requestUpdate);
  requestUpdate();
})();

// 分類頁面：保留網址、重新整理與瀏覽器上一頁／下一頁功能。
(() => {
  const pages = [...document.querySelectorAll("[data-page]")];
  const links = [...document.querySelectorAll('.nav a')];
  const works = document.getElementById("works");
  const dialog = document.querySelector(".poster-dialog");
  const fullImage = dialog.querySelector(".poster-full");

  function showPage() {
    const requestedPage = window.location.hash.slice(1);
    const current = pages.some(page => page.dataset.page === requestedPage)
      ? requestedPage : "web-ui";
    if (dialog.open) dialog.close();
    pages.forEach(page => { page.hidden = page.dataset.page !== current; });
    links.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    works.scrollTop = 0;
    // 更新 CD，包含原本 scrollTop 已為 0 的情況。
    works.dispatchEvent(new Event("scroll"));
  }

  document.querySelectorAll(".poster-preview").forEach(button => {
    button.addEventListener("click", () => {
      const thumbnail = button.querySelector("img");
      fullImage.src = thumbnail.currentSrc || thumbnail.src;
      fullImage.alt = thumbnail.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector(".poster-close").addEventListener("click", () => dialog.close());
  window.addEventListener("hashchange", showPage);
  showPage();
})();
