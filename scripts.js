

$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on("click", function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        } // End if
    });
});

let orders = JSON.parse(localStorage.getItem('orders')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const orderBtns = document.querySelectorAll('.order-btn');

    orderBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const dish = this.dataset.dish;
            const quantity = this.parentNode.querySelector('select[name="quantity"]').value;
            placeOrder(dish, quantity);
        });
    });
});

function placeOrder(dish, quantity) {
    const order = {
        customer: 'John Doe', // Replace with actual customer name
        items: [{ item: dish, quantity: parseInt(quantity) }],
        total: 25.99, // Replace with actual total
    };
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    sendNotificationToStaff(`New order placed for ${dish} (Quantity: ${quantity})`);
    alert('Order placed successfully!');
}

// Function to send notification to staff dashboard
function sendNotificationToStaff(message) {
    // Check if local storage is supported
    if (typeof(Storage) !== "undefined") {
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



let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

function submitReview(dish, rating, comment) {
  const review = {
    customer: 'John Doe', // Replace with actual customer name
    dish: dish,
    rating: parseInt(rating),
    comment,
  };
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  sendNotificationToStaff(`New review submitted for ${dish}: Rating - ${rating}, Comment - ${comment}`);
  alert('Review submitted successfully!');
}

document.getElementById('reviewForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const dish = document.getElementById('reviewDish').value;
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value;
  submitReview(dish, rating, comment);
  document.getElementById('reviewModal').style.display = 'none';
});