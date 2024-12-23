//script js
// URL de la API
const apiEndpoint = "http://makeup-api.herokuapp.com/api/v1/products.json";

// Función para obtener los datos de la API
async function fetchProducts() {
    try {
        // Realizar la solicitud a la API
        const response = await fetch(apiEndpoint);

        // Validar que la respuesta sea exitosa
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }

        // Parsear la respuesta a JSON
        const products = await response.json();

        // Llamar a la función para mostrar los productos
        displayProducts(products);
    } catch (error) {
        console.error("Hubo un problema al cargar los productos:", error);
        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = `<p>Error al cargar los productos. Inténtalo más tarde.</p>`;
    }
}

// Función para mostrar los productos en tarjetas
function displayProducts(products) {
    const productsContainer = document.getElementById("products-container");

    // Limpiar cualquier contenido previo
    productsContainer.innerHTML = "";

    // Recorrer los productos y generar tarjetas
    products.slice(0, 20).forEach((product) => {
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}" class="product-image" />
            <h3 class="product-name">${product.name}</h3>
            <p class="product-brand">Marca: ${product.brand || "Desconocida"}</p>
            <p class="product-price">Precio: ${product.price_sign || "$"}${product.price || "No disponible"}</p>
            <a href="${product.product_link}" target="_blank" class="product-link">Ver producto</a>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Ejecutar la función al cargar el DOM
document.addEventListener("DOMContentLoaded", fetchProducts);

// Variables globales
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para añadir producto al carrito
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    saveCartToLocalStorage();
    alert(`${product.name} ha sido añadido al carrito`);
}

// Actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Mostrar los productos en el carrito
function showCart() {
    const cartModal = document.getElementById("cart-modal");
    const cartItems = document.getElementById("cart-items");

    // Limpiar contenido previo
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Tu carrito está vacío</p>";
    } else {
        // Agregar los productos al modal
        cart.forEach((product, index) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                ${product.name} - ${product.price_sign || "$"}${product.price || "N/A"}
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Mostrar el modal
    cartModal.classList.remove("hidden");
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCartToLocalStorage();
    showCart(); // Actualizar el carrito en el modal
}

// Función para realizar la compra
function checkout() {
    if (cart.length > 0) {
        alert("¡Compra realizada con éxito!");
        cart = []; // Limpiar el carrito
        updateCartCount();
        saveCartToLocalStorage();
        document.getElementById("cart-modal").classList.add("hidden");
    } else {
        alert("El carrito está vacío.");
    }
}

// Función para cerrar el modal
function closeCartModal() {
    document.getElementById("cart-modal").classList.add("hidden");
}

// Guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Event Listeners
document.getElementById("cart-icon").addEventListener("click", showCart);
document.getElementById("checkout-button").addEventListener("click", checkout);
document.getElementById("close-cart-modal").addEventListener("click", closeCartModal);

// Función para cargar el carrito desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); // Actualiza el contador de carrito con el valor almacenado
});

// Generar productos con botón para añadir al carrito
function displayProducts(products) {
    const productsContainer = document.getElementById("products-container");

    productsContainer.innerHTML = "";

    products.slice(0, 20).forEach((product) => {
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image_link}" alt="${product.name}" class="product-image" />
            <h3 class="product-name">${product.name}</h3>
            <p class="product-brand">Marca: ${product.brand || "Desconocida"}</p>
            <p class="product-price">Precio: ${product.price_sign || "$"}${product.price || "No disponible"}</p>
            <button class="add-to-cart-button">Añadir al carrito</button>
        `;

        // Botón para añadir al carrito
        productCard.querySelector(".add-to-cart-button").addEventListener("click", () => {
            addToCart(product);
        });

        productsContainer.appendChild(productCard);
    });
}
