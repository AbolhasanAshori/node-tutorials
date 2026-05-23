const backdrop = document.querySelector(".backdrop");
const sideDrawer = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector("#side-menu-toggle");

function handleBackdropClick() {
  backdrop.style.display = "none";
  sideDrawer.classList.remove("open");
}

function HandleMenuToggleClick() {
  backdrop.style.display = "block";
  sideDrawer.classList.add("open");
}

backdrop.addEventListener("click", handleBackdropClick);
menuToggle.addEventListener("click", HandleMenuToggleClick);
