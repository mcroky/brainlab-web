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

  // 떠다니는 가베 조각 — 각 페이지 첫 섹션 배경에 로고 조각 색의 도형이 은은하게 부유
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var firstSection = document.querySelector("main > section:first-of-type") || document.querySelector("main > div:first-of-type");
    if (firstSection) {
      firstSection.classList.add("has-shapes");
      var shapes = [
        { c: "#f6c445", w: 46, l: "6%",  t: "14%", r: "26%", d: "9s" },
        { c: "#2eb5a5", w: 30, l: "13%", t: "68%", r: "50%", d: "12s" },
        { c: "#ef8d3c", w: 38, l: "88%", t: "20%", r: "22%", d: "10s" },
        { c: "#7cc163", w: 26, l: "82%", t: "72%", r: "50%", d: "8s" },
        { c: "#e25b4f", w: 20, l: "44%", t: "8%",  r: "30%", d: "11s" },
        { c: "#b8a4e6", w: 34, l: "63%", t: "82%", r: "24%", d: "13s" }
      ];
      var holder = document.createElement("div");
      holder.className = "float-shapes";
      holder.setAttribute("aria-hidden", "true");
      var sh = "";
      for (var s = 0; s < shapes.length; s++) {
        var o = shapes[s];
        sh += '<span class="float-shape" style="width:' + o.w + "px;height:" + o.w + "px;left:" + o.l +
          ";top:" + o.t + ";background:" + o.c + ";border-radius:" + o.r + ";opacity:.14;--fd:" + o.d + '"></span>';
      }
      holder.innerHTML = sh;
      firstSection.insertBefore(holder, firstSection.firstChild);
    }
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
