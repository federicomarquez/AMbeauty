const apiEndpoint = "http://makeup-api.herokuapp.com/api/v1/products.json";


async function fetchProducts() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Hubo un problema al cargar los productos:", error);
    }
}


function displayProducts(products) {
    const productsContainer = document.getElementById("products-container");

    
    productsContainer.innerHTML = "";

    
    products.forEach((product) => {
        const productCard = document.createElement("div");
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


document.addEventListener("DOMContentLoaded", fetchProducts);
