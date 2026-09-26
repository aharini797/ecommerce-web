/* =====================================================
   LUXORA E-COMMERCE WEBSITE
   Main JavaScript
===================================================== */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Essential Cotton Tee",
        category: "Fashion",
        price: 799,
        oldPrice: 1199,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 2,
        name: "Luna Shoulder Bag",
        category: "Fashion",
        price: 1499,
        oldPrice: 2199,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 3,
        name: "Aura Sneakers",
        category: "Fashion",
        price: 2299,
        oldPrice: 3299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 4,
        name: "Silk Touch Lip Tint",
        category: "Beauty",
        price: 599,
        oldPrice: 799,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 5,
        name: "Glow Skin Serum",
        category: "Beauty",
        price: 899,
        oldPrice: 1299,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 6,
        name: "Nova Smartwatch",
        category: "Electronics",
        price: 3499,
        oldPrice: 4999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 7,
        name: "Pulse Wireless Buds",
        category: "Electronics",
        price: 1799,
        oldPrice: 2499,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 8,
        name: "Halo Desk Lamp",
        category: "Home",
        price: 1299,
        oldPrice: 1899,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 9,
        name: "Cloud Ceramic Mug",
        category: "Home",
        price: 499,
        oldPrice: 699,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=700&q=80",
        sale: false
    },

    {
        id: 10,
        name: "Urban Overshirt",
        category: "Fashion",
        price: 1899,
        oldPrice: 2699,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 11,
        name: "Travel Mini Speaker",
        category: "Electronics",
        price: 1599,
        oldPrice: 2299,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
        sale: true
    },

    {
        id: 12,
        name: "Soft Glow Candle",
        category: "Home",
        price: 699,
        oldPrice: 999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
        sale: true
    }

];


/* ================= LOCAL STORAGE ================= */

let cart = JSON.parse(localStorage.getItem("luxoraCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("luxoraWishlist")) || [];


/* ================= LOAD PRODUCTS ================= */

document.addEventListener("DOMContentLoaded", function () {

    displayProducts(products);

    updateCartCount();

    updateWishlistCount();

});


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list) {

    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <h2>No products found</h2>
                <p style="margin-top:10px;color:#777;">
                    Try another search or category.
                </p>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const isWishlisted =
            wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                ${
                    product.sale
                    ? `<span class="sale">SALE</span>`
                    : ""
                }

                <button
                    class="wishlist-btn ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="rating">
                    ★★★★★
                    <span style="color:#777;">
                        ${product.rating}
                    </span>
                </div>

                <div class="price">

                    <span class="current-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice.toLocaleString("en-IN")}
                    </span>

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        grid.appendChild(card);

    });

}


/* ================= CATEGORY FILTER ================= */

function filterCategory(category, button) {

    if (category === "All") {

        displayProducts(products);

    } else {

        const filtered =
            products.filter(
                product => product.category === category
            );

        displayProducts(filtered);

    }


    document.querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));


    if (button) {

        button.classList.add("active");

    }

    document
        .getElementById("products")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}

/* ================= SEARCH ================= */

function openSearch() {

    const searchBox = document.getElementById("searchBox");

    if (searchBox) {

        searchBox.classList.add("active");

        const input =
            document.getElementById("searchInput");

        if (input) {
            input.focus();
        }
    }
}


function closeSearch() {

    const searchBox =
        document.getElementById("searchBox");

    if (searchBox) {
        searchBox.classList.remove("active");
    }

}


/* SEARCH BUTTON */

function searchProducts() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }


    const searchText =
        input.value.toLowerCase().trim();


    const filteredProducts =
        products.filter(function(product) {

            const name =
                product.name.toLowerCase();

            const category =
                product.category.toLowerCase();


            return (
                name.includes(searchText) ||
                category.includes(searchText)
            );

        });


    displayProducts(filteredProducts);


    /* Scroll to products */

    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* SEARCH WHILE TYPING */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const searchInput =
            document.getElementById("searchInput");


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchProducts
            );

        }

    }
);


/* ================= CART ================= */

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart();

    updateCartCount();

    showToast(
        product.name + " added to cart"
    );

}


function saveCart() {

    localStorage.setItem(
        "luxoraCart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const element =
        document.getElementById("cartCount");

    if (element) {

        element.textContent = count;

    }

}


/* ================= SHOW CART ================= */

function showCart() {

    renderCart();

    document
        .getElementById("cartPanel")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");

}


function renderCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:60px 20px;
            ">
                <div style="font-size:50px;">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p style="
                    color:#777;
                    margin-top:8px;
                ">
                    Add some products to continue.
                </p>
            </div>
        `;

        document.getElementById("cartTotal")
            .textContent = "₹0";

        return;
    }


    let total = 0;

    container.innerHTML = "";


    cart.forEach(item => {

        const product =
            products.find(p => p.id === item.id);

        if (!product) return;


        total +=
            product.price * item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>${product.name}</h4>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <div style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-top:8px;
                ">

                    <button
                        onclick="changeQuantity(${product.id}, -1)"
                        style="
                            width:25px;
                            height:25px;
                            border:1px solid #ddd;
                            background:white;
                        "
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${product.id}, 1)"
                        style="
                            width:25px;
                            height:25px;
                            border:1px solid #ddd;
                            background:white;
                        "
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${product.id})"
            >
                ✕
            </button>

        `;

        container.appendChild(div);

    });


    document.getElementById("cartTotal")
        .textContent =
        "₹" + total.toLocaleString("en-IN");

}


/* ================= QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    updateCartCount();

    renderCart();

    showToast("Product removed");

}


/* ================= WISHLIST ================= */

function toggleWishlist(id) {

    const index =
        wishlist.indexOf(id);


    if (index === -1) {

        wishlist.push(id);

        showToast("Added to wishlist");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");

    }


    localStorage.setItem(
        "luxoraWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    displayProducts(products);

}


function updateWishlistCount() {

    const element =
        document.getElementById("wishlistCount");

    if (element) {

        element.textContent =
            wishlist.length;

    }

}


/* ================= SHOW WISHLIST ================= */

function showWishlist() {

    renderWishlist();

    document
        .getElementById("wishlistPanel")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");

}


function renderWishlist() {

    const container =
        document.getElementById("wishlistItems");

    if (!container) return;


    const items =
        products.filter(
            product =>
                wishlist.includes(product.id)
        );


    if (items.length === 0) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:60px 20px;
            ">

                <div style="font-size:50px;">
                    ♡
                </div>

                <h3>
                    Your wishlist is empty
                </h3>

                <p style="
                    color:#777;
                    margin-top:8px;
                ">
                    Save products you love here.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = "";


    items.forEach(product => {

        const div =
            document.createElement("div");

        div.className = "wishlist-item";

        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    onclick="addToCart(${product.id})"
                    style="
                        margin-top:8px;
                        border:none;
                        background:#101b2d;
                        color:white;
                        padding:7px 10px;
                        font-size:11px;
                    "
                >
                    Add to Cart
                </button>

            </div>

            <button
                class="remove-item"
                onclick="toggleWishlist(${product.id}); renderWishlist();"
            >
                ✕
            </button>

        `;

        container.appendChild(div);

    });

}


/* ================= CLOSE PANELS ================= */

function closePanels() {

    document
        .querySelectorAll(".side-panel")
        .forEach(panel =>
            panel.classList.remove("active")
        );


    document
        .getElementById("overlay")
        .classList.remove("active");

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty");

        return;

    }


    alert(
        "Checkout demo!\n\n" +
        "Payment gateway and backend can be connected later."
    );

}


/* ================= SUBSCRIBE ================= */

function subscribeUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;


    showToast(
        "Thank you! You are subscribed."
    );


    document.getElementById("email").value = "";

}


/* ================= CONTACT ================= */

function sendMessage(event) {

    event.preventDefault();

    showToast(
        "Message sent successfully!"
    );

    event.target.reset();

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("navbar")
        .classList.toggle("active");

}


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= CLOSE SEARCH WITH ESC ================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeSearch();

        closePanels();

    }

});