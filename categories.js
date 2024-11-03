document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.classList.toggle('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const categoryItems = document.querySelectorAll(".dropdown-content a");

    categoryItems.forEach(item => {
        item.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("Category item clicked");

            const gender = item.getAttribute("data-gender");
            const category = item.getAttribute("data-category");
            console.log(`Fetching products for gender: ${gender}, category: ${category}`);

            try {
                const response = await fetch("products.json");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                const products = data.products;
                console.log("Fetched products:", products);

                const filteredProducts = products.filter(product =>
                    product.gender === gender && product.category === category
                );
                console.log("Filtered products:", filteredProducts);

                displayProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        });
    });
});

function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    if (products.length === 0) {
        console.log("No products found for the selected category and gender.");
        productsContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("cat-product-card");

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

        productsContainer.appendChild(productCard);
    });
}