// common.js

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
