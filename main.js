(function () {
  "use strict";
  var C = window.SITE_CONFIG || { channels: {}, email: "" };
  document.querySelectorAll("[data-channel]").forEach(function (a) {
    var u = C.channels[a.getAttribute("data-channel")];
    if (u) a.href = u;
  });
  document.querySelectorAll("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-email]").forEach(function (e) { e.textContent = C.email; e.href = "mailto:" + C.email; });
  var b = document.querySelector(".burger"), n = document.getElementById("nav");
  function setNav(o) { b.setAttribute("aria-expanded", o); n.classList.toggle("open", o); }
  if (b && n) {
    b.addEventListener("click", function () { setNav(b.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
    n.addEventListener("click", function (e) { if (e.target.tagName === "A") setNav(false); });
  }
  var f = document.getElementById("cf");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    var s = document.getElementById("fs"), d = {};
    ["name", "email", "subject", "message"].forEach(function (k) { d[k] = f.elements[k].value.trim(); });
    if (!d.name || !d.subject || !d.message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) {
      s.textContent = "Please complete every field with a valid email address."; return;
    }
    s.textContent = "Opening your email app...";
    location.href = "mailto:" + encodeURIComponent(C.email) + "?subject=" + encodeURIComponent(d.subject) +
      "&body=" + encodeURIComponent(d.message + "\n\nFrom: " + d.name + " (" + d.email + ")");
  });
})();
