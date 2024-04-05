window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";

  let cartProducts = [];

  getApi();

  const btnModal = document.querySelector(".btn-modal");
  btnModal.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    const productInfo = {
      image: modal.querySelector("img").src,
      title: modal.querySelector("h2").textContent,
      description: modal.querySelector("p").textContent,
      category: modal
        .querySelector("h3")
        .textContent.replace("Categoría: ", ""),
      price: modal.querySelector("h4").textContent.replace("Precio: $", ""),
      deleted: false,
    };

    if (isProductInCart(productInfo)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya has agregado este producto al carrito de compras",
      });
    } else {
      createCart(productInfo);
      modal.style.display = "none";
      cartProducts.push(productInfo);
    }
  });

  function isProductInCart(product) {
    return cartProducts.some(
      (cartProduct) =>
        cartProduct.title === product.title && !cartProduct.deleted
    );
  }

  const btnMarket = document.querySelector(".btn-market");
btnMarket.addEventListener("click", () => {
  const containerShop = document.querySelector(".containerShop");
  if (cartProducts.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Aún no has añadido productos al carrito de compras",
    });
  } else {
    containerShop.classList.toggle("show");
  }
});

  const closeMarketBtn = document.querySelector(".close-market");
  closeMarketBtn.addEventListener("click", () => {
    const containerShop = document.querySelector(".containerShop");
    containerShop.classList.remove("show");
  });

  function getApi() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        createProducts(data);
        addSearchListener(data);
      });
  }

  function createProducts(products) {
    const sectionCarts = document.querySelector(".sectionCarts");
    sectionCarts.innerHTML = "";

    products.forEach((product) => {
      const cardProduct = document.createElement("button");
      cardProduct.classList.add("cart", "selected-product");
      const imgCard = document.createElement("img");
      imgCard.classList.add("imgStyle");
      imgCard.src = product.image;
      imgCard.alt = product.title;

      const titleCard = document.createElement("h2");
      titleCard.textContent = product.title;

      cardProduct.appendChild(imgCard);
      cardProduct.appendChild(titleCard);

      sectionCarts.appendChild(cardProduct);

      cardProduct.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.querySelector("img").src = product.image;
        modal.querySelector("h2").textContent = product.title;
        modal.querySelector("p").textContent = product.description;
        modal.querySelector(
          "h3"
        ).textContent = `Categoría: ${product.category}`;
        modal.querySelector("h4").textContent = `Precio: $${product.price}`;
        modal.style.display = "block";
      });
    });
  }

  function addSearchListener(products) {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();

      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );

      createProducts(filteredProducts);
    });
  }

  function createCart(productInfo) {
    const containerShop = document.querySelector(".containerCopy");
    const cart = document.createElement("div");
    cart.classList.add("cart");

    const cartContent = document.createElement("div");
    cartContent.classList.add("cart-content");

    const img = document.createElement("img");
    img.src = productInfo.image;
    img.alt = productInfo.title;
    img.classList.add("cart-img");

    const title = document.createElement("h2");
    title.textContent = productInfo.title;
    title.classList.add("cart-title");

    const description = document.createElement("p");
    description.textContent = productInfo.description;
    description.classList.add("cart-description");

    const category = document.createElement("h3");
    category.textContent = `Categoría: ${productInfo.category}`;
    category.classList.add("cart-category");

    const price = document.createElement("h4");
    price.textContent = `Precio: $${productInfo.price}`;
    price.classList.add("cart-price");

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Cantidad:";

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.classList.add("quantity-button");
    decreaseButton.style.marginRight = "0.5rem";

    decreaseButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityDisplay.textContent);
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityDisplay.textContent = currentQuantity;
      }
    });

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = "1";
    quantityDisplay.classList.add("quantity-display");

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.classList.add("quantity-button");
    increaseButton.style.marginLeft = "0.5rem";
    increaseButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityDisplay.textContent);
      currentQuantity++;
      quantityDisplay.textContent = currentQuantity;
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      containerShop.removeChild(cart);
      removeProductFromCart(productInfo.title);
    });

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityDisplay);
    quantityContainer.appendChild(increaseButton);

    cartContent.appendChild(img);
    cartContent.appendChild(title);
    cartContent.appendChild(price);
    cartContent.appendChild(quantityLabel);
    cartContent.appendChild(quantityContainer);
    cartContent.appendChild(deleteButton);

    cart.appendChild(cartContent);

    containerShop.appendChild(cart);
  }
  function removeProductFromCart(productTitle) {
    cartProducts = cartProducts.filter(
      (product) => product.title !== productTitle
    );
  }

  const closeModalButton = document.getElementById("close-modal");
  closeModalButton.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  });
});
