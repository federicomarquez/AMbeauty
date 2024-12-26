//script js
// URL de la API
const apiEndpoint = "http://makeup-api.herokuapp.com/api/v1/products.json";

// Función para obtener los datos de la API
async function fetchProducts() {
    try {
        
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }

        const products = await response.json();

        mostrarProductos(products);
    } catch (error) {
        console.error("Hubo un problema al cargar los productos:", error);
        const productsContainer = document.getElementById("products-container");
        productsContainer.innerHTML = `<p>Error al cargar los productos. Inténtalo más tarde.</p>`;
    }
}

// Función para mostrar los productos en tarjetas
function mostrarProductos(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    // Recorrer los productos y generar tarjetas (robado a prueba)
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
    async function verificarImagen(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(true); // La imagen se cargó correctamente
        img.onerror = () => resolve(false); // La imagen está rota o no existe
    });
}

async function mostrarProductos(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    for (const product of products.slice(0, 20)) { 
        if (product.image_link) { 
            const imagenValida = await verificarImagen(product.image_link);

            if (imagenValida) {
                const productCard = document.createElement("article");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="${product.image_link}" alt="${product.name}" class="product-image" />
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-brand">Marca: ${product.brand || "Desconocida"}</p>
                    <p class="product-price">Precio: ${product.price_sign || "$"}${product.price || "No disponible"}</p>
                    <button class="add-to-cart-button">Añadir al carrito</button>
                `;

                productCard.querySelector(".add-to-cart-button").addEventListener("click", () => {
                    agregarCarta(product);
                });

                productsContainer.appendChild(productCard);
            }
        }
    }
}

}

document.addEventListener("DOMContentLoaded", fetchProducts);
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function agregarCarta(product) {
    const productoExistente = cart.find(item => item.id === product.id);
    if (productoExistente) {
        productoExistente.quantity += 1; 
    } else {
        product.quantity = 1; 
        cart.push(product);
    }
    actualizarContadorCartas();
    guardadoLocalStorage();
    alert(`${product.name} se añadio al carrito`);
}

function actualizarContadorCartas() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

function actualizarModalCarrito() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    //robado de internet y modificado (a prueba)
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Tu carrito está vacío</p>";
        document.getElementById("total-price").textContent = "Total: $0";
    } else {
        let total = 0;
        cart.forEach((product, index) => {
            total += (product.price || 0) * product.quantity;
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                ${product.name} x${product.quantity} - ${product.price_sign || "$"}${(product.price * product.quantity).toFixed(2) || "N/A"}
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
        });
        document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
    }
}

function EliminarProductoCarrito(index) {
    cart.splice(index, 1);
    actualizarContadorCartas();
    guardadoLocalStorage();
    actualizarModalCarrito(); 
}

function BotonSalirCarrito() {
    if (cart.length > 0) {
        showSuccessMessage("¡Compra realizada con éxito!");
        cart = []; 
        actualizarContadorCartas();
        guardadoLocalStorage();
        actualizarModalCarrito();
        document.getElementById("cart-modal").classList.add("hidden");
    } else {
        alert("El carrito está vacío.");
    }
}
//a prueba mejora el el mensaje en vez de un alert
function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.textContent = message;
    successMessage.className = "success-message";
    document.body.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 3000); 
}

document.getElementById("checkout-button").addEventListener("click", BotonSalirCarrito);


function guardadoLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("cart-icon").addEventListener("click", () => {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("hidden");

    if (!cartModal.classList.contains("hidden")) {
        actualizarModalCarrito();
    }
});

document.getElementById("close-cart-modal").addEventListener("click", () => {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.add("hidden");
});


document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCartas(); 
});

function mostrarProductos(products) {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.slice(0, 20).forEach((product) => {
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image_link, product.api_featured_image}" alt="${product.name}" class="product-image" />
            <h3 class="product-name">${product.name}</h3>
            <p class="product-brand">Marca: ${product.brand || "Desconocida"}</p>
            <p class="product-price">Precio: ${product.price_sign || "$"}${product.price || "No disponible"}</p>
            <button class="add-to-cart-button">Añadir al carrito</button>
        `;

        productCard.querySelector(".add-to-cart-button").addEventListener("click", () => {
            agregarCarta(product);
        });

        productsContainer.appendChild(productCard);
    });
}





