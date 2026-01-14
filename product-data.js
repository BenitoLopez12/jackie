// Este script carga la información del producto según el id de la URL y la muestra en la página product.html
fetch("productos.json")
  .then((response) => response.json())
  .then((productos) => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    // Título
    const title = document.querySelector(".product-detail-title");
    if (title) title.textContent = producto.producto;

    // Subtítulo (colección)
    const subtitle = document.querySelector(".product-detail-subtitle");
    if (subtitle)
      subtitle.textContent = producto.coleccion + " | " + producto.bodega;

    // Precio
    const price = document.querySelector(".product-price");
    if (price) price.textContent = "$" + producto.precio;

    // Actualizar tallas disponibles (solo 35 a 42)
    const sizeGrid = document.querySelector(".size-grid");
    if (sizeGrid) {
      sizeGrid.innerHTML = "";
      for (let size = 35; size <= 42; size++) {
        const btn = document.createElement("button");
        btn.className = "size-btn";
        btn.dataset.size = size;
        btn.textContent = size;
        btn.onclick = function () {
          selectSize(size, btn);
        };
        sizeGrid.appendChild(btn);
      }
    }

    // Imagen principal y carrusel
    const mainImg = document.getElementById("mainProductImage");
    const thumbnails = document.querySelector(".thumbnail-images");
    if (mainImg && producto.img) {
      // Obtener nombre base de la imagen principal (sin extensión)
      const imgMatch = producto.img.match(/([^\/]+)\.[a-zA-Z]+$/);
      let baseImg = producto.img;
      if (imgMatch) {
        baseImg = "img/" + imgMatch[1];
      }
      mainImg.src = producto.img;
      // Limpiar thumbnails
      if (thumbnails) {
        thumbnails.innerHTML = "";
        // Imagen principal
        const img1 = document.createElement("img");
        img1.className = "thumbnail active";
        img1.src = producto.img;
        img1.alt = "Vista 1";
        img1.onclick = function () {
          changeMainImage(producto.img, this);
        };
        thumbnails.appendChild(img1);
        // Imagen secundaria 1
        const img2 = document.createElement("img");
        img2.className = "thumbnail";
        img2.src = baseImg + "-1.jpg";
        img2.alt = "Vista 2";
        img2.onclick = function () {
          changeMainImage(img2.src, this);
        };
        thumbnails.appendChild(img2);
        // Imagen secundaria 2
        const img3 = document.createElement("img");
        img3.className = "thumbnail";
        img3.src = baseImg + "-2.jpg";
        img3.alt = "Vista 3";
        img3.onclick = function () {
          changeMainImage(img3.src, this);
        };
        thumbnails.appendChild(img3);
      }
    }

    // Descripción (en el acordeón de detalles)
    const accs = document.querySelectorAll(
      ".accordion-item .accordion-content p"
    );
    if (accs && accs[0])
      accs[0].innerHTML = producto.descripcion.replace(/\n/g, "<br>");

    // Actualiza la imagen principal y el estado activo del thumbnail
    function changeMainImage(src, thumb) {
      const mainImg = document.getElementById("mainProductImage");
      if (mainImg) mainImg.src = src;
      document
        .querySelectorAll(".thumbnail")
        .forEach((t) => t.classList.remove("active"));
      if (thumb) thumb.classList.add("active");
    }

    // Actualizar texto del botón
    const btnAddCart = document.querySelector(".btn-add-cart");
    if (btnAddCart) btnAddCart.textContent = "AÑADIR AL CARRITO";

    // Función para seleccionar la talla
    let selectedSize = null;
    function selectSize(size, btn) {
      // Actualizar tamaño seleccionado
      selectedSize = size;
      // Actualizar clase de los botones
      const sizeBtns = document.querySelectorAll(".size-btn");
      sizeBtns.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    }

    // Evento para el botón de añadir al carrito
    const addToCartBtn = document.querySelector(".btn-add-cart");
    if (addToCartBtn) {
      addToCartBtn.onclick = function () {
        if (!selectedSize) {
          alert("Por favor, selecciona una talla");
          return;
        }
        // Aquí iría la lógica para añadir el producto al carrito
        alert("¡Producto agregado al carrito!\nTalla: " + selectedSize);
      };
    }
  });
