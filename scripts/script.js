function toggleDarkMode() {
    const body = document.body;
    const contentSection = document.querySelector('.content-section');

    body.classList.toggle('dark-mode');
    contentSection.classList.toggle('dark-mode');

    const isDarkMode = body.classList.contains('dark-mode');
    gsap.to(".sun-icon", { opacity: isDarkMode ? 0 : 1, duration: 0.3 });
    gsap.to(".moon-icon", { opacity: isDarkMode ? 1 : 0, duration: 0.3 });
}

window.onload = function () {
    gsap.to(".header-small-text, .header-large-text", { opacity: 1, y: 0, duration: 0.5, stagger: 0.3 });
    displayRandomQuote();
};

document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) { /* Adjust 100 based on your header height */
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
const digits = document.querySelectorAll(".digit");
const counterSection = document.getElementById("counterSection");

const startCounterAnimation = () => {
digits.forEach((digit, index) => {
    const target = parseInt(digit.getAttribute("data-target"));
    const delay = index * 200; // Delay each digit start by 200ms

    setTimeout(() => {
        const interval = setInterval(() => {
            const randomNum = Math.floor(Math.random() * 10);
            digit.textContent = randomNum;
        }, 50);

        // Stop random scrolling and set to target after a short period
        setTimeout(() => {
            clearInterval(interval);
            digit.textContent = target;
        }, 2000 + delay); // Adjust timing for each digit to reach target
    }, delay);
});
};

const observer = new IntersectionObserver(
(entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCounterAnimation();
            observer.unobserve(counterSection); // Stop observing after animation starts
        }
    });
},
{ threshold: 0.5 } // Trigger when 50% of the section is in view
);

observer.observe(counterSection);
});



document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        loop: true,
        spaceBetween: 20,
    });
});

// Modern JavaScript for Coders Over Borders website

// Quote system with modern implementation
const quotes = [
    {
        text: "Everybody in this country should learn how to program a computer because it teaches you how to think.",
        author: "Steve Jobs, co-founder of Apple",
        blurb: "Computer science is one of the fastest growing fields in the world right now. Our mission is to make this powerful tool accessible to everyone."
    },
    {
        text: "The computer was born to solve problems that did not exist before.",
        author: "Bill Gates, co-founder of Microsoft", 
        blurb: "Technology creates new opportunities, but also new challenges. We focus on teaching the fundamental skills needed to navigate this digital world."
    },
    {
        text: "The future belongs to those who can program.",
        author: "Mark Zuckerberg, co-founder of Meta",
        blurb: "Programming is becoming a universal language. We're here to ensure no one is left behind in this digital transformation."
    }
];

// Initialize quote display
function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteBlurb = document.getElementById('quote-blurb');
    
    if (quoteText) quoteText.textContent = `"${randomQuote.text}"`;
    if (quoteAuthor) quoteAuthor.textContent = `- ${randomQuote.author}`;
    if (quoteBlurb) quoteBlurb.textContent = randomQuote.blurb;
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.add('bg-white/80');
            navbar.classList.remove('bg-white/95');
        }
    });
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (or after actual form submission)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    displayRandomQuote();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initFormHandling();
    
    // Initialize animations and other interactive elements
    console.log('Coders Over Borders website initialized successfully!');
});

// Export functions for use in other files
window.CodersOverBorders = {
    displayRandomQuote,
    initSmoothScrolling,
    initNavbarScrollEffect,
    initFormHandling
};

    // Initialize the map and set its view
    var map = L.map('map').setView([7.8731, 80.7718], 2); // Central view with zoom level 2

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for locations
    var locations = [
        { coords: [40.5936, -74.6047], name: "Bridgewater, New Jersey" },
        { coords: [9.7396, 80.0255], name: "Uduvil, Sri Lanka" },
        { coords: [9.4926, 80.2432], name: "Pooneryn, Sri Lanka" }
    ];

    locations.forEach(function(location) {
        L.marker(location.coords)
            .addTo(map)
            .bindPopup(`<b>${location.name}</b>`)
            .openPopup();
    });

.lessons-link:hover::after {
    opacity: 1;
    transform: translateX(0);
}

// Click animation: arrows pulse
.lessons-link:active::after {
    animation: pulse 0.4s ease-out;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
}
