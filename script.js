// Order Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add item to order form
    const addItemBtn = document.getElementById('addItem');
    const orderItems = document.querySelector('.order-items');
    
    if (addItemBtn && orderItems) {
        addItemBtn.addEventListener('click', function() {
            const newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.innerHTML = `
                <select class="item-select">
                    <option value="">Select an item...</option>
                    <option value="Grilled Salmon">Grilled Salmon - $18.99</option>
                    <option value="Beef Tenderloin">Beef Tenderloin - $24.99</option>
                    <option value="Water">Mineral Water - $2.50</option>
                    <option value="Coffee">Coffee - $3.50</option>
                    <option value="Juice">Fresh Juice - $4.50</option>
                    <option value="Wine">House Wine - $7.00</option>
                    <option value="Beer">Imported Beer - $6.00</option>
                </select>
                <input type="number" class="quantity" min="1" value="1">
                <button type="button" class="remove-btn">Remove</button>
            `;
            orderItems.appendChild(newItem);
            
            // Add event listener to new select for alcohol check
            const select = newItem.querySelector('.item-select');
            select.addEventListener('change', checkForAlcohol);
        });
    }
    
    // Remove item from order form
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
        }
    });
    
    // Check for alcohol in order
    const alcoholItems = ['Wine', 'Beer', 'Cocktail'];
    const ageVerify = document.getElementById('ageVerify');
    
    function checkForAlcohol() {
        let hasAlcohol = false;
        const selects = document.querySelectorAll('.item-select');
        
        selects.forEach(select => {
            if (alcoholItems.some(item => select.value.includes(item))) {
                hasAlcohol = true;
            }
        });
        
        if (hasAlcohol) {
            ageVerify.style.display = 'block';
        } else {
            ageVerify.style.display = 'none';
        }
    }
    
    // Add event listeners to existing selects
    const selects = document.querySelectorAll('.item-select');
    selects.forEach(select => {
        select.addEventListener('change', checkForAlcohol);
    });
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check age verification if alcohol is ordered
            const ageCheck = document.getElementById('ageCheck');
            if (ageVerify.style.display === 'block' && !ageCheck.checked) {
                alert('You must confirm you are 18 or older to order alcohol.');
                return;
            }
            
            alert('Order placed successfully!');
            // In a real app, you would send this data to a server
        });
    }
    
    // Payment page functionality
    const paymentMethods = document.querySelectorAll('.method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
