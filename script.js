document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".top-nav a, .rail-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.split("/").pop() === currentPage) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      document.querySelectorAll("[data-type]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.type !== filter;
      });
    });
  });

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert("Thanks, your message was sent.");
      form.reset();
    });
  }
});
