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

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 스크롤 진행 바 — 읽은 만큼 상단에 틸색 줄이 차오름
  if (!reduceMotion) {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    var updateBar = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", updateBar, { passive: true });
    window.addEventListener("resize", updateBar, { passive: true });
    updateBar();
  }

  // 변화기록 타이핑 — 아이의 말이 받아 적히듯 한 글자씩 나타남
  if (!reduceMotion && "IntersectionObserver" in window) {
    var bubbles = document.querySelectorAll(".change-demo .speech p");
    var typeObserver = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        var el = entries[i].target;
        typeObserver.unobserve(el);
        (function (el) {
          var full = el.innerHTML;
          var lines = full.split(/<br\s*\/?>/i).map(function (h) {
            var d = document.createElement("div"); d.innerHTML = h; return d.textContent;
          });
          // 완성 문장을 투명하게 깔아 상자 크기를 고정하고, 그 위에 타이핑을 겹침
          el.style.position = "relative";
          el.innerHTML = '<span class="type-ghost" aria-hidden="true">' + full + '</span><span class="type-live"></span>';
          var live = el.querySelector(".type-live");
          var caret = '<span class="type-caret" aria-hidden="true">|</span>';
          var li = 0, ci = 0, out = "";
          (function tick() {
            if (li >= lines.length) { el.innerHTML = full; el.style.position = ""; return; }
            ci++;
            if (ci > lines[li].length) { out += lines[li] + "<br>"; li++; ci = 0; live.innerHTML = out + caret; setTimeout(tick, 120); return; }
            live.innerHTML = out + lines[li].slice(0, ci) + caret;
            setTimeout(tick, 45);
          })();
        })(el);
      }
    }, { threshold: 0.6 });
    for (var b = 0; b < bubbles.length; b++) typeObserver.observe(bubbles[b]);
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
          var el = entries[i].target;
          el.classList.add("is-visible");
          io.unobserve(el);
          // 등장 완료 후 순차 지연 제거 — 호버 반응이 모든 항목에서 즉각적이도록
          (function (node) {
            setTimeout(function () { node.style.transitionDelay = "0ms"; }, 950);
          })(el);
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
