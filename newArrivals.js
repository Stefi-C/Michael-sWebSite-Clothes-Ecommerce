document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('newArrivals.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        const categories = ['damen', 'men', 'kids'];

        categories.forEach(category => {
            const container = document.querySelector(`#${category} .newProducts-category`);
            const leftButton = document.querySelector(`#${category} .scroll-left`);
            const rightButton = document.querySelector(`#${category} .scroll-right`);

            let currentStartIndex = 0;
            const products = data.newProducts.filter(product => product.category === category);

            // Populate and display the initial four products
            function updateDisplay() {
                container.innerHTML = '';
                const itemsToShow = products.slice(currentStartIndex, currentStartIndex + 4);

                itemsToShow.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('new-product-card');
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
                    container.appendChild(productCard);
                });

                // Toggle buttons based on the number of items
                leftButton.style.display = currentStartIndex > 0 ? 'inline-block' : 'none';
                rightButton.style.display = currentStartIndex + 4 < products.length ? 'inline-block' : 'none';
            }

            // Event listeners for buttons
            leftButton.addEventListener('click', () => {
                if (currentStartIndex > 0) {
                    currentStartIndex -= 4;
                    updateDisplay();
                }
            });

            rightButton.addEventListener('click', () => {
                if (currentStartIndex + 4 < products.length) {
                    currentStartIndex += 4;
                    updateDisplay();
                }
            });

            // Initial display
            updateDisplay();
        });
    } catch (error) {
        console.error('Error loading new arrivals:', error);
    }
});
