// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const scrollTopBtn = document.querySelector('.scroll-top');
const newsletterForm = document.getElementById('newsletterForm');
const postCards = document.querySelectorAll('.post-card');

// Theme Management
const getCurrentTheme = () => localStorage.getItem('theme') || 'light';
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

// Initialize theme
setTheme(getCurrentTheme());

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Mobile Menu
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenu.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Scroll to Top Button
const toggleScrollButton = () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
};

window.addEventListener('scroll', toggleScrollButton);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe all post cards for animation
postCards.forEach(card => {
    observer.observe(card);
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Simulate form submission
    console.log('Newsletter subscription for:', email);
    
    // Show success message
    const successMessage = document.createElement('p');
    successMessage.textContent = 'Thank you for subscribing!';
    successMessage.style.color = 'var(--accent-color)';
    successMessage.style.marginTop = '1rem';
    
    // Replace form with success message
    newsletterForm.innerHTML = '';
    newsletterForm.appendChild(successMessage);
});

// Client-side search functionality
const searchPosts = (query) => {
    const posts = document.querySelectorAll('.post-card');
    query = query.toLowerCase();
    
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(query) || 
                       content.includes(query) ||
                       tags.some(tag => tag.includes(query));
        
        post.style.display = matches ? 'block' : 'none';
    });
};

// Performance optimization
document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
});