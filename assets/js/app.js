$(function () {

    const cartIcon = document.getElementById("cart-icon");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const clearAllBtn = document.getElementById("clear-all");
    const cartCount = document.getElementById("cart-count");

    const cartToggleMobile = document.getElementById("cartToggleMobile");
    const cartCountMobile = document.getElementById("cartCountMobile");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Open Cart
    cartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        cartSidebar.classList.add("active");
    });

    // open cart on mobile 
    cartToggleMobile.addEventListener("click", (e) => {
        e.preventDefault();
        cartSidebar.classList.add("active");
    });

    // Close Cart
    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });

    // Add to Cart
    document.querySelectorAll(".add-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseInt(button.getAttribute("data-price"));
            const img = button.getAttribute("data-img");

            // check if already in cart
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1; // শুধু quantity বাড়াবে
            } else {
                const product = { name, price, img, quantity: 1 };
                cart.push(product);
            }

            saveCart();
            renderCart();
        });
    });

    // Remove item
    window.removeItem = function (index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    // Clear all
    clearAllBtn.addEventListener("click", () => {
        cart = [];
        saveCart();
        renderCart();
    });

    // Save to localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Render Cart
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
        <div class="row">
            <div class="col-4 item">
                <img class="img-fluid" src="${item.img}" alt="${item.name}">
            </div>
            <div class="col-6 p-0">
                <div class="item_details">
                    <h4>${item.name}</h4>
                    <p><span>  ${item.quantity}  X </span> Rs. ${item.price} </p>
                </div>
            </div>
            <div class="col-2 item p-0">
                <span class="remove-item" onclick="removeItem(${index})">
                    <iconify-icon icon="pajamas:close-xs" width="18" height="18"></iconify-icon>
                </span>
            </div>
        </div>
        `;
            cartItemsContainer.appendChild(div);
        });

        subtotalElement.textContent = `Rs. ${subtotal}`;

        // cart badge: শুধু unique product সংখ্যা দেখাবে
        cartCount.textContent = cart.length;
        // for mobile view
        cartCountMobile.textContent = cart.length;
    }

    // Initial render on page load
    renderCart();




    // navigation 
    let navBar = document.querySelector("#nav");
    let up = document.querySelector(".up");
    let value = 0;
    window.addEventListener("scroll", function (e) {
        if (window.scrollY > 80) {
            navBar.classList.add("active")
        } else {
            navBar.classList.remove("active")
        }
        value = window.scrollY
        if (window.scrollY > 100) {
            up.classList.add("up_active")
        } else {
            up.classList.remove("up_active")

        }
    })

    // inspiration slider 
    $(document).ready(function () {
        $('.demo').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            dots: true,
            nextArrow: '<button type="button" class="slick-next"><iconify-icon icon="iconamoon:arrow-right-2-light" width="24" height="24"></iconify-icon></button>',
            prevArrow: '<button type="button" class="slick-prev "><iconify-icon icon="iconamoon:arrow-left-2-light" width="24" height="24"></iconify-icon></button>',

        });
    });


});  