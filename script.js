// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  console.log(e);
});

// Cambia el tamaño del header al hacer scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Filtros tipo acordeón en shop.html
document.addEventListener("DOMContentLoaded", function () {
  const btnFiltros = document.getElementById("btn-filtros");
  const filtrosAcordeon = document.getElementById("filtros-acordeon");
  const cerrarFiltros = document.getElementById("cerrar-filtros");
  if (btnFiltros && filtrosAcordeon) {
    btnFiltros.addEventListener("click", function () {
      filtrosAcordeon.style.display =
        filtrosAcordeon.style.display === "none" ||
        filtrosAcordeon.style.display === ""
          ? "block"
          : "none";
    });
  }
  if (cerrarFiltros && filtrosAcordeon) {
    cerrarFiltros.addEventListener("click", function () {
      filtrosAcordeon.style.display = "none";
    });
  }
});
