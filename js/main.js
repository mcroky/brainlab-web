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
});
