// index.js

document.addEventListener("DOMContentLoaded", async () => {
    const productContainer = document.getElementById('product-container');

    if (productContainer) {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();

            // Flatten all products into a single array
            const products = Object.values(data).flatMap(category =>
                Object.values(category).flat()
            );

            // Shuffle the products array for random display
            const shuffledProducts = products.sort(() => Math.random() - 0.5);

            // Function to create product cards with sliding animations
            function createProductCard(product, isRight) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card', isRight ? 'slide-right' : 'slide-left');
                productCard.innerHTML = `
                    <img src="${product.img}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <p>${product.description}</p>
                    <div class="card-icons">
                        <i class="fa fa-heart" aria-hidden="true"></i>
                        <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        <button class="buy-now-btn">Buy Now</button>
                    </div>
                `;

                    // Add click event to redirect to product.html
    productCard.addEventListener('click', () => {
        // Pass the product ID to the product.html page
        window.location.href = `product.html?id=${product.id}`; // Assuming product.id is unique
    });
    
                productContainer.appendChild(productCard);
                setTimeout(() => productCard.classList.add('show'), 100);
            }

            // Create and append all product cards
            shuffledProducts.forEach(product => {
                const isRight = Math.random() > 0.5; // Random slide direction
                createProductCard(product, isRight);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    } else {
        console.warn('Product container not found');
    }
});
