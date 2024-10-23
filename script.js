// Navbar 
document.addEventListener('DOMContentLoaded', function () {
    // Define the HTML structure of the navbar as a string
    const navbarHTML = `
    <div class="navbar">
        <div class="logo">
            <h1>Michael's Shop</h1>
        </div>
        <div class="navbar menu">
            <ul class="nav">
                <li class="nav-item"><a href="index.html">Shop</a></li>
                <li class="nav-item"><a href="categories.html">Categories</a></li>
                <li class="nav-item"><a href="newArrivals.html">New Arrivals</a></li>
                <li class="nav-item"><a href="contact.html">Contact</a></li>
            </ul>
        </div>
        <div class="nav-icons">
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-bag-shopping"></i>
        </div>
    </div>
    `;

    // Get the container where the navbar will be inserted
    document.getElementById('navbar-container').innerHTML = navbarHTML;
});

// Fetch products from Products.json and initialize the application
let productsData = [];
let productsToShow = 12; // Number of products to show initially
let productsLoaded = 0; // Counter to track how many products are already loaded

// Fetch the products from Products.json
fetch('Products.json')
    .then(response => response.json())
    .then(data => {
        productsData = getRandomizedProducts(data);
        displayProducts(); // Display initial set of products
        setupScrollEvent(); // Set up scroll event for loading more products
    })
    .catch(error => console.error('Error fetching products:', error));

// Function to randomize products
function getRandomizedProducts(data) {
    const allProducts = [];
    // Combine all products from categories
    Object.values(data).forEach(category => {
        Object.values(category).forEach(subcategory => {
            allProducts.push(...subcategory);
        });
    });
    // Shuffle products array
    return allProducts.sort(() => Math.random() - 0.5);
}

// Function to display products
function displayProducts() {
    const productContainer = document.getElementById('product-container');
    
    // Load a batch of products (12 at a time)
    for (let i = productsLoaded; i < productsLoaded + productsToShow && i < productsData.length; i++) {
        const product = productsData[i];
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    }

    productsLoaded += productsToShow; // Increment the number of products loaded
    checkVisibleCards(); // Check if the new cards are visible
}

// Function to create a product card
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    
    // Create the product card structure
    productCard.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <div class="card-icons">
            <i class="fa fa-heart" aria-hidden="true"></i>
            <i class="fa fa-cart-plus" aria-hidden="true"></i>
            <button class="buy-now-btn">Buy Now</button>
        </div>
    `;
    
    return productCard;
}

// Function to check if product cards are in the viewport
function checkVisibleCards() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.classList.add('show'); // Show card when it comes into view
        }
    });
}

// Function to set up scroll event for loading more products
function setupScrollEvent() {
    const productContainer = document.getElementById('product-container');
    productContainer.addEventListener('scroll', function () {
        if (productContainer.scrollTop + productContainer.clientHeight >= productContainer.scrollHeight - 50) {
            // Trigger loading more products when close to the bottom
            displayProducts(); 
        }
    });

    // Also handle window scroll for loading more products
    window.addEventListener('scroll', handleScroll);
}

// Function to detect when the user scrolls near the bottom of the page
function handleScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight - 100) {
        // Load more products when near the bottom
        displayProducts();
    }
}

// Trigger checkVisibleCards when the page is first loaded
window.addEventListener('load', checkVisibleCards);