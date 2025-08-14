const links = document.querySelectorAll(".nav-items a");

for (const link of links) {
  const activePageHref = location.pathname.split("/").at(-1);
  const linkHref = link.getAttribute("href").split("/").at(-1);
  const isFirstPage = activePageHref === "";
  if (linkHref === activePageHref || isFirstPage) {
    link.classList.add("active");
    break;
  }
}
