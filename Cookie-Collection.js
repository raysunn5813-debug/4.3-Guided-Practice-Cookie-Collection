/* Author: Raymond Cantey | Date: August 22, 2026 | Purpose: Dynamic product rendering, array cart manipulation, and document.cookie state persistence */

/* =========================================
     GLOBAL VARIABLES
========================================= */

// STEP 4
const products = [
    {
        name: "Butter Croissant",
        description: "Flaky layers baked with rich European butter.",
        price: 4.50,
        image: "images/croissant.png",
        alt: "Fresh buttery croissant"
    },
    {
        name: "Vanilla Cupcake",
        description: "Classic vanilla cake topped with creamy frosting.",
        price: 3.75,
        image: "images/cupcake.png",
        alt: "Vanilla cupcake with frosting"
    },
    {
        name: "Artisan Bread",
        description: "Handcrafted sourdough with a crispy crust.",
        price: 6.25,
        image: "images/bread.png",
        alt: "Fresh artisan bread loaf"
    },
    {
        name: "Chocolate Chip Cookies",
        description: "Soft baked cookies filled with chocolate chunks.",
        price: 5.00,
        image: "images/cookies.png",
        alt: "Chocolate chip cookies"
    },
    {
        name: "Apple Pie Slice",
        description: "Classic cinnamon apple pie with flaky crust.",
        price: 4.95,
        image: "images/pie.png",
        alt: "Apple pie slice"
    },
    {
        name: "Cinnamon Roll",
        description: "Soft cinnamon pastry drizzled with icing.",
        price: 4.25,
        image: "images/cinnamon-roll.png",
        alt: "Warm cinnamon roll"
    },
    {
        name: "Blueberry Scone raycan2849",
        description: "Crumbly sweet scone packed with fresh berries.",
        price: 4.10,
        image: "images/scone.png",
        alt: "Blueberry scone pastry"
    },
    {
        name: "Pecan Sticky Bun",
        description: "Rich sweet roll topped with sticky caramel and pecans.",
        price: 4.80,
        image: "images/sticky-bun.png",
        alt: "Pecan sticky bun"
    },
    {
        name: "Raspberry Danish",
        description: "Buttery puff pastry filled with tart raspberry preserve.",
        price: 4.40,
        image: "images/danish.png",
        alt: "Raspberry danish pastry"
    }
];

// Cart array
let cart = [];

// STEP 5
const productGrid = document.querySelector(".product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const toggleCart = document.getElementById("toggle-cart");
const cartContent = document.getElementById("cart-content");
const cartWindow = document.querySelector(".cart-window");

/* =========================================
     LOAD PAGE CONTENT
========================================= */

// STEP 6
window.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    loadCartFromCookies();
    updateCartDisplay();
});

/* =========================================
     DYNAMICALLY CREATE PRODUCT CARDS
========================================= */

// STEP 7
function displayProducts() {
    products.forEach(product => {
        const article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
            <img src="${product.image}" alt="${product.alt}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>$${product.price.toFixed(2)}</span>
            <button class="add-cart">Add to Cart</button>
        `;

        const button = article.querySelector(".add-cart");
        button.addEventListener("click", () => {
            addToCart(product);
        });

        productGrid.appendChild(article);
    });
}

/* =========================================
     ADD PRODUCT TO CART
========================================= */

// STEP 8
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToCookies();
    bounceCart();
}

/* =========================================
     UPDATE CART DISPLAY
========================================= */

// STEP 9
function updateCartDisplay() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        li.innerHTML = `
            <span>
                ${item.name} x${item.quantity}
                ($${itemTotal.toFixed(2)})
            </span>
            <button class="remove-btn" aria-label="Remove ${item.name}">Remove</button>
        `;

        const removeButton = li.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
            removeItem(index);
        });

        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = count;
}

/* =========================================
     REMOVE ITEMS FROM CART
========================================= */

// STEP 10
function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    saveCartToCookies();
}

/* =========================================
     SAVE CART USING COOKIES
========================================= */

// STEP 11
function saveCartToCookies() {
    const cartString = JSON.stringify(cart);
    document.cookie = `bakeryCart=${cartString}; path=/; max-age=604800`;
}

/* =========================================
     LOAD CART FROM COOKIE
========================================= */

// STEP 12
function loadCartFromCookies() {
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith("bakeryCart=")) {
            const cookieValue = trimmedCookie.substring("bakeryCart=".length);
            cart = JSON.parse(cookieValue);
        }
    });
}

/* =========================================
     COLLAPSIBLE CART WINDOW
========================================= */

let cartOpen = true;

toggleCart.addEventListener("click", () => {
    cartOpen = !cartOpen;

    if (cartOpen) {
        cartContent.style.display = "block";
    } else {
        cartContent.style.display = "none";
    }
});

/* =========================================
     BOUNCE ANIMATION FUNCTION
========================================= */

// STEP 13
function bounceCart() {
    cartWindow.classList.add("bounce");
    setTimeout(() => {
        cartWindow.classList.remove("bounce");
    }, 500);
}