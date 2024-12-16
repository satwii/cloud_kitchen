document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            loginUser('customer');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            registerUser('customer');
        });
    }
});

function toggleModal(type) {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    if (type === 'login') {
        loginModal.style.display = loginModal.style.display === 'block' ? 'none' : 'block';
    } else if (type === 'register') {
        registerModal.style.display = registerModal.style.display === 'block' ? 'none' : 'block';
    }
}

function redirectToLogin(userType) {
    if (userType === 'customer') {
        window.location.href = 'login_customer.html';
    } else if (userType === 'staff') {
        window.location.href = 'login_staff.html';
    }
}

function redirectToRegister(userType) {
    if (userType === 'customer') {
        window.location.href = 'register_customer.html';
    } else if (userType === 'staff') {
        window.location.href = 'register_staff.html';
    }
}

function registerUser(userType) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    console.log('Registering user:', username);

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[userType]) {
        users[userType] = [];
    }

    if (users[userType].some(user => user.username === username)) {
        alert('Username is already taken.');
        return;
    }

    users[userType].push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Users after registration:', JSON.parse(localStorage.getItem('users')));

    alert('Registration successful.');
    window.location.href = 'index.html';
}

function loginUser(userType) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Logging in user:', username);

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userList = users[userType] || [];

    const user = userList.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful.');
        if (userType === 'customer') {
            window.location.href = 'customer-dashboard.html';
        } else {
            window.location.href = 'staff-dashboard.html';
        }
    } else {
        console.log('Invalid credentials for user:', username);
        alert('Invalid credentials.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuLink = document.getElementById('menuLink');
    const popularLink = document.getElementById('popularLink');
    const mainContent = document.getElementById('mainContent');

    // Event listeners for navigation links
    menuLink.addEventListener('click', () => {
        mainContent.innerHTML = getMenuContent();
    });

    popularLink.addEventListener('click', () => {
        mainContent.innerHTML = getPopularContent();
    });

    // Event listeners for modal close buttons
    const closeOrderBtn = document.querySelectorAll('.close-btn')[0];
    const closeReviewBtn = document.querySelectorAll('.close-btn')[1];

    closeOrderBtn.addEventListener('click', () => {
        document.getElementById('orderModal').style.display = 'none';
    });

    closeReviewBtn.addEventListener('click', () => {
        document.getElementById('reviewModal').style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('orderModal')) {
            document.getElementById('orderModal').style.display = 'none';
        }
        if (e.target === document.getElementById('reviewModal')) {
            document.getElementById('reviewModal').style.display = 'none';
        }
    });

    // Event listeners for form submissions
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const dish = document.getElementById('dish').value;
        const quantity = document.getElementById('quantity').value;
        const order = {
            customer: 'John Doe', // Replace with actual customer name
            items: [{ item: dish, quantity: parseInt(quantity) }],
            total: 25.99, // Replace with actual total
        };
        localStorage.setItem('order', JSON.stringify(order));
        sendNotificationToStaff(`New order placed for ${dish}`);
        alert('Order placed successfully!');
        document.getElementById('orderModal').style.display = 'none';
    });

    document.getElementById('reviewForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const reviewDish = document.getElementById('reviewDish').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
        const review = {
            customer: 'John Doe', // Replace with actual customer name
            dish: reviewDish,
            rating: parseInt(rating),
            comment,
        };
        localStorage.setItem('review', JSON.stringify(review));
        sendNotificationToStaff(`New review submitted for ${reviewDish}: Rating - ${rating}, Comment - ${comment}`);
        alert('Review submitted successfully!');
        document.getElementById('reviewModal').style.display = 'none';
    });
});

function getMenuContent() {
    return `
        <h2>Menu</h2>
        <h3>Starters</h3>
        <div class="dish-item">
        <img src="tandoori chicken.jpg" alt="Dish 2">
        <div class="dish-details">
            <h3>Tandoori Chicken</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Tandoori Chicken')">Order</button>
            <button onclick="openReviewModal('Tandoori Chicken')">Review</button>
        </div>
    </div>
        <div class="dish-item">
            <img src="chiken tikka masala.jpg" alt="dish 1">
            <div class="dish-details">
                <h3>Chicken tikka masala</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Chicken tikka masala')">Order</button>
                <button onclick="openReviewModal('Chicken tikka masala')">Review</button>
            </div>
        </div>
        <div class="dish-item">
            <img src="seekh kebab.jpg" alt="Dish 3">
            <div class="dish-details">
                <h3>Seekh Kebab</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Seekh Kebab')">Order</button>
                <button onclick="openReviewModal('Seekh Kebab')">Review</button>
            </div>
        </div>
        <div class="dish-item">
            <img src="veg roll.jpg" alt="Dish 4">
            <div class="dish-details">
                <h3>Veg roll</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Veg roll')">Order</button>
                <button onclick="openReviewModal('Veg roll')">Review</button>
            </div>
        </div>
        <div class="dish-item">
            <img src="gopi manchurian.jpg" alt="Dish 1">
            <div class="dish-details">
                <h3>Gopi Manchurian</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Gopi Manchurian')">Order</button>
                <button onclick="openReviewModal('Gopi Manchurian')">Review</button>
            </div>
        </div>


        <h3>Main Course</h3>
        <div class="dish-item">
            <img src="butter chicken.jpg" alt="Dish 1">
            <div class="dish-details">
                <h3>Butter Chicken</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Butter Chicken')">Order</button>
                <button onclick="openReviewModal('Butter Chicken')">Review</button>
            </div>
        </div>
        <div class="dish-item">
            <img src="chettinad chicken.jpg" alt="Dish 2">
            <div class="dish-details">
                <h3>Chettinad Chicken</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Chettinad Chicken')">Order</button>
                <button onclick="openReviewModal('Chettinad Chicken')">Review</button>
            </div>
        </div>
        <div class="dish-item">
            <img src="palak paneer.jpg" alt="Dish 3">
            <div class="dish-details">
                <h3>Palak Paneer</h3>
                <p>Description of the dish.</p>
                <p>Price: $10.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('Palak Paneer')">Order</button>
                <button onclick="openReviewModal('Palak Paneer')">Review</button>
            </div>
        </div>
        <div class="dish-item">
        <img src="rajma masala.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Rajma masala</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Rajma masala')">Order</button>
            <button onclick="openReviewModal('Rajma masala')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="paneer butter masala.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Paneer butter masala</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Paneer butter masala')">Order</button>
            <button onclick="openReviewModal('Paneer butter masala')">Review</button>
        </div>
    </div>

    <h3>Snacks</h3>
    <div class="dish-item">
        <img src="kachori.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Kachori</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Kachori')">Order</button>
            <button onclick="openReviewModal('Kachori')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="momos.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Momos</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Momos')">Order</button>
            <button onclick="openReviewModal('Momos')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="pav bhaji.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Pav Bhaji</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Pav Bhaji')">Order</button>
            <button onclick="openReviewModal('Pav Bhaji')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="aloo tikki.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Aloo tikki</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Aloo tikki')">Order</button>
            <button onclick="openReviewModal('Aloo tikki')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="samosa.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Samosa</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Samosa')">Order</button>
            <button onclick="openReviewModal('Samosa')">Review</button>
        </div>
    </div>
    
    <h3>Desserts</h3>
    <div class="dish-item">
        <img src="cakes.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Cakes</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Cakes')">Order</button>
            <button onclick="openReviewModal('Cakes')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="gulab jamun.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Gulab Jamun</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Gulab Jamun')">Order</button>
            <button onclick="openReviewModal('Gulab Jamun')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="Icecream.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Icecream</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Icecream')">Order</button>
            <button onclick="openReviewModal('Icecream')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="jalebi.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Jalebi</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Jalebi')">Order</button>
            <button onclick="openReviewModal('Jalebi')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="rasgulla.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Rasgulla</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Rasgulla')">Order</button>
            <button onclick="openReviewModal('Rasgulla')">Review</button>
        </div>
    </div>

    <h3>Beverages</h3>
    <div class="dish-item">
        <img src="Black coffee.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Black coffee</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Black coffee')">Order</button>
            <button onclick="openReviewModal('Black coffee')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="Buttermilk.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Buttermilk</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Buttermilk')">Order</button>
            <button onclick="openReviewModal('Buttermilk')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="Jigarthanda.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Jigarthanda</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Jigarthanda')">Order</button>
            <button onclick="openReviewModal('Jigarthanda')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="Mango Lassi.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Mango Lassi</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Mango Lassi')">Order</button>
            <button onclick="openReviewModal('Mango Lassi')">Review</button>
        </div>
    </div>
    <div class="dish-item">
        <img src="tender coconut water.jpg" alt="Dish 1">
        <div class="dish-details">
            <h3>Tender coconut water</h3>
            <p>Description of the dish.</p>
            <p>Price: $10.00</p>
        </div>
        <div class="dish-actions">
            <button onclick="openOrderModal('Tender coconut water')">Order</button>
            <button onclick="openReviewModal('Tender coconut water')">Review</button>
        </div>
    </div>



        <!-- Repeat similar structure for other dishes -->
    `;
}

function getPopularContent() {
    return `
        <h2>Popular Dishes</h2>
        <div class="dish-item">
            <img src="dish2.jpg" alt="Dish 2">
            <div class="dish-details">
                <h3>North Indian Dish</h3>
                <p>Description of the dish.</p>
                <p>Price: $12.00</p>
            </div>
            <div class="dish-actions">
                <button onclick="openOrderModal('North Indian Dish')">Order</button>
                <button onclick="openReviewModal('North Indian Dish')">Review</button>
            </div>
        </div>
        
        <!-- Repeat similar structure for other popular dishes -->
    `;
}

function openOrderModal(dish) {
    document.getElementById('dish').value = dish;
    document.getElementById('orderModal').style.display = 'block';
}

function openReviewModal(dish) {
    document.getElementById('reviewDish').value = dish;
    document.getElementById('reviewModal').style.display = 'block';
}

// Function to send notification to staff dashboard
function sendNotificationToStaff(message) {
    // Check if local storage is supported
    if (typeof(Storage) !=="undefined") {
    // Retrieve existing notifications or initialize an empty array
    let notifications = JSON.parse(localStorage.getItem('staffNotifications')) || [];
    
    // Add new notification to the array
    notifications.push(message);

    // Store updated notifications in local storage
    localStorage.setItem('staffNotifications', JSON.stringify(notifications));
} else {
    console.log("Local storage is not supported. Notification cannot be sent.");
}
}

// Function to place an order
function placeOrder(dish) {
    const quantity = document.getElementById('quantity').value;
    const order = {
        customer: 'John Doe', // Replace with actual customer name
        items: [{ item: dish, quantity: parseInt(quantity) }],
        total: 25.99, // Replace with actual total
    };
    localStorage.setItem('order', JSON.stringify(order));
    sendNotificationToStaff(`New order placed for ${dish}`);
    alert('Order placed successfully!');
    document.getElementById('orderModal').style.display = 'none';
}

// Function to submit a review
function submitReview(dish, rating, comment) {
    const review = {
        customer: 'John Doe', // Replace with actual customer name
        dish: dish,
        rating: parseInt(rating),
        comment,
    };
    localStorage.setItem('review', JSON.stringify(review));
    sendNotificationToStaff(`New review submitted for ${dish}: Rating - ${rating}, Comment - ${comment}`);
    alert('Review submitted successfully!');
    document.getElementById('reviewModal').style.display = 'none';
}