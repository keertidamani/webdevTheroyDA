// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
});

// Hide cursor when leaving window
document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
});

document.addEventListener('mouseover', () => {
    cursor.style.opacity = '0.7';
    cursorFollower.style.opacity = '0.5';
});

// Header Scroll Effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const menuClose = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.menu-nav a');

menuToggle.addEventListener('click', () => {
    fullscreenMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
    fullscreenMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Product Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Show notification
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        showNotification(`${productName} added to cart!`);
    });
});

// Customize Shoe Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const colorOptions = document.querySelectorAll('.color-option');
const materialOptions = document.querySelectorAll('.material-option');
const soleOptions = document.querySelectorAll('.sole-option');
const lacesOptions = document.querySelectorAll('.laces-option');
const previewBtns = document.querySelectorAll('.preview-btn');
const resetDesignBtn = document.getElementById('reset-design');
const addCustomToCartBtn = document.getElementById('add-custom-to-cart');
const extrasCheckboxes = document.querySelectorAll('input[name="extras"]');
const initialsInput = document.querySelector('.initials-input');
const summaryPrice = document.querySelector('.price-value');

// Base price
let totalPrice = 199.99;
let selectedExtras = [];

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
    });
});

// Color selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options in the same group
        document.querySelectorAll(`.color-option[data-part="${option.dataset.part}"]`)
            .forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update shoe preview
        updateShoePreview(option.dataset.part, 'color', option.dataset.color);
    });
});

// Material selection
materialOptions.forEach(option => {
    option.addEventListener('click', () => {
        materialOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update shoe preview
        updateShoePreview('upper', 'material', option.dataset.material);
    });
});

// Sole selection
soleOptions.forEach(option => {
    option.addEventListener('click', () => {
        soleOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update shoe preview
        updateShoePreview('sole', 'type', option.dataset.sole);
    });
});

// Laces selection
lacesOptions.forEach(option => {
    option.addEventListener('click', () => {
        lacesOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update shoe preview
        updateShoePreview('laces', 'style', option.dataset.laces);
    });
});

// Preview controls
previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        previewBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        // Update shoe preview angle
        updateShoeAngle(btn.dataset.view);
    });
});

// Extras selection
extrasCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            selectedExtras.push(checkbox.value);
            
            // Show initials input if initials option is selected
            if (checkbox.value === 'initials') {
                initialsInput.style.display = 'block';
            }
        } else {
            selectedExtras = selectedExtras.filter(extra => extra !== checkbox.value);
            
            // Hide initials input if initials option is deselected
            if (checkbox.value === 'initials') {
                initialsInput.style.display = 'none';
            }
        }
        
        // Update price
        updateTotalPrice();
    });
});

// Reset design
resetDesignBtn.addEventListener('click', () => {
    // Reset all selections to default
    document.querySelector('.color-option[data-part="upper"][data-color="#212121"]').click();
    document.querySelector('.color-option[data-part="sole"][data-color="#212121"]').click();
    document.querySelector('.color-option[data-part="laces"][data-color="#212121"]').click();
    document.querySelector('.material-option[data-material="leather"]').click();
    document.querySelector('.sole-option[data-sole="flat"]').click();
    document.querySelector('.laces-option[data-laces="standard"]').click();
    
    // Reset extras
    extrasCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    selectedExtras = [];
    initialsInput.style.display = 'none';
    
    // Reset price
    totalPrice = 199.99;
    updateTotalPrice();
    
    // Show notification
    showNotification('Design has been reset!');
});

// Add custom shoe to cart
addCustomToCartBtn.addEventListener('click', () => {
    cartItems++;
    cartCount.textContent = cartItems;
    
    // Show notification
    showNotification('Custom shoe added to cart!');
});

// Helper functions
function updateShoePreview(part, property, value) {
    // This would update the shoe preview in a real implementation
    console.log(`Updating ${part} ${property} to ${value}`);
    
    // For demo purposes, we'll just log the change
    // In a real implementation, this would update the shoe image or 3D model
}

function updateShoeAngle(view) {
    // This would update the shoe preview angle in a real implementation
    console.log(`Changing view to ${view}`);
    
    // For demo purposes, we'll just log the change
    // In a real implementation, this would rotate the shoe image or 3D model
}

function updateTotalPrice() {
    // Reset to base price
    totalPrice = 199.99;
    
    // Add extras costs
    selectedExtras.forEach(extra => {
        switch(extra) {
            case 'logo':
                totalPrice += 5;
                break;
            case 'initials':
                totalPrice += 10;
                break;
            case 'reflective':
                totalPrice += 15;
                break;
            case 'premium':
                totalPrice += 20;
                break;
        }
    });
    
    // Update display
    summaryPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const prevArrow = document.querySelector('.testimonial-arrow.prev-arrow');
const nextArrow = document.querySelector('.testimonial-arrow.next-arrow');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

prevArrow.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextArrow.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value;
        
        if (name && validateEmail(email) && subject && message) {
            showNotification('Your message has been sent. We\'ll get back to you soon!');
            contactForm.reset();
        } else {
            showNotification('Please fill out all fields correctly.', 'error');
        }
    });
}

// Helper Functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    
    if (type === 'success') {
        notification.style.backgroundColor = 'var(--accent-color)';
    } else {
        notification.style.backgroundColor = 'var(--primary-color)';
    }
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize first testimonial
    showTestimonial(0);
});
