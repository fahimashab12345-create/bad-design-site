(() => {
  const clockEl = document.getElementById("clock");
  const timeFormat = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/London"
  });

  const tick = () => {
    if (clockEl) clockEl.textContent = timeFormat.format(new Date());
  };
  tick();
  setInterval(tick, 1000);

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const form = document.getElementById("transmission-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const callsign = form.elements.callsign.value.trim();
      const email = form.elements.email.value.trim();
      const brief = form.elements.brief.value.trim();
      const subject = `Transmission — ${callsign || "unknown callsign"}`;
      const body = [
        `CALLSIGN: ${callsign}`,
        `RETURN SIGNAL: ${email}`,
        "",
        "WHAT IS BROKEN:",
        brief,
        "",
        "— sent from baddesign.pages.dev"
      ].join("\n");
      window.location.href =
        "mailto:fahimashab12345@gmail.com?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    });
  }
})();
