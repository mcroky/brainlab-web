// 브레인랩 공통 스크립트 — 모바일 메뉴 토글 + 푸터 연도
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
  }
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // 헤더: 스크롤 시 그림자
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 스크롤 리빌 — 카드·제목이 살짝 떠오르며 나타나는 은은한 효과
  // (움직임 최소화 설정 사용자와 구형 브라우저에서는 자동 비활성)
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".hero h1, .hero .sub, .hero .btn-row, .section-title, .section-lead, .card, .step, .topic, .speech, .cta-band h2, .cta-band p"
    );
    var parentCount = [];
    function staggerIndex(el) {
      var p = el.parentElement;
      for (var i = 0; i < parentCount.length; i++) {
        if (parentCount[i].p === p) { return ++parentCount[i].n; }
      }
      parentCount.push({ p: p, n: 0 });
      return 0;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add("is-visible");
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.05, rootMargin: "0px" });
    for (var t = 0; t < targets.length; t++) {
      var el = targets[t];
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min(staggerIndex(el) * 70, 350) + "ms";
      io.observe(el);
    }
  }
});
