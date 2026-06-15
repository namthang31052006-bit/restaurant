const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.querySelector("#searchInput");
const menuCards = document.querySelectorAll(".menu-card");
const themeToggle = document.querySelector("#themeToggle");
const reservationForm = document.querySelector("#reservationForm");
const formMessage = document.querySelector("#formMessage");
const backToTop = document.querySelector("#backToTop");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

function updateMenu() {
  const activeButton = document.querySelector(".filter-btn.active");
  const activeCategory = activeButton.dataset.category;
  const searchText = searchInput.value.toLowerCase().trim();

  menuCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesCategory = activeCategory === "all" || category === activeCategory;
    const matchesSearch = title.includes(searchText);

    card.style.display = matchesCategory && matchesSearch ? "block" : "none";
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    updateMenu();
  });
});

searchInput.addEventListener("input", updateMenu);

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const guests = document.querySelector("#guests").value;

  if (!name || !date || !time || !guests) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  formMessage.textContent = `Thank you, ${name}. Your reservation for ${guests} guest(s) on ${date} at ${time} has been received.`;
  reservationForm.reset();
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
