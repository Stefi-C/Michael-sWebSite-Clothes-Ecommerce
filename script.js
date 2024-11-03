// Navbar
document.addEventListener('DOMContentLoaded', function () {
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
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) navbarContainer.innerHTML = navbarHTML;
});

// Fetch products by category from Products.json
fetch('Products.json')
    .then(response => response.json())
    .then(data => {
        const productsDataByCategory = data;
        const productDisplay = document.getElementById('products');

        if (productDisplay) {
            // Dropdown toggle functionality
            document.querySelectorAll('.dropdown-btn').forEach(button => {
                button.addEventListener('click', () => {
                    button.classList.toggle('active');
                    const dropdownContent = button.nextElementSibling;
                    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
                    button.setAttribute('aria-expanded', dropdownContent.style.display === 'block');
                });
            });

            // Handle category link clicks
            document.querySelectorAll('.dropdown-content ul li a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.getAttribute('data-category');
                    const parentCategory = this.closest('.dropdown').querySelector('.dropdown-btn').textContent.toLowerCase();
                    displayProductsByCategory(parentCategory, category);
                });
            });

            function displayProductsByCategory(parentCategory, category) {
                if (productsDataByCategory[parentCategory] && productsDataByCategory[parentCategory][category]) {
                    productDisplay.innerHTML = ''; // Clear previous products
                    const products = productsDataByCategory[parentCategory][category];

                    products.forEach((product, index) => {
                        const productCard = document.createElement('div');
                        productCard.classList.add('product-card', index % 2 === 0 ? 'show-right' : 'show-left');

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
                        productDisplay.appendChild(productCard);
                        setTimeout(() => productCard.classList.add('show'), 100);
                    });
                } else {
                    console.warn(`Category "${parentCategory}" or subcategory "${category}" not found. Ignoring...`);
                }
            }
        } else {
            console.warn('Product display container not found. Ignoring product display functionality.');
        }
    })
    .catch(error => console.error('Error fetching products by category:', error));

// Fetch and display new products from newArrivals.json
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('newArrivals.json');
        const data = await response.json();

        const categories = ['damen', 'man', 'kids'];

        categories.forEach(category => {
            const container = document.querySelector(`#${category} .newProducts-container`);

            if (container) {
                const categoryProducts = data.newProducts.filter(product => product.category === category);
                container.innerHTML = ''; // Clear any existing content
                categoryProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price">$${product.price}</div>
                    `;
                    container.appendChild(productCard);
                });
            } else {
                console.warn(`Container for category "${category}" not found. Ignoring...`);
            }
        });
    } catch (error) {
        console.error('Error loading new arrivals:', error);
    }
});
