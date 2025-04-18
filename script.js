
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

    // Array of quotes
    const quotes = [
        {
            text: "Everybody in this country should learn how to program a computer because it teaches you how to think.",
            author: "Steve Jobs, co-founder of Apple.",
            blurb: "Computer science is one of the fastest growing fields in the world right now. Many of the major changes and innovations that happen in our world, are because of the power of computers. However, not enough regions are getting the computer science education they need. Low-income regions need the power of computer science to change their lives. Our mission is to fill this gap. Learn more about us in the about section."
        },
        {
            text: "The computer was born to solve problems that did not exist before.",
            author: "Bill Gates, co-founder of Microsoft.",
            blurb: "Computer science is one of the fastest growing fields in the world right now. Many of the major changes and innovations that happen in our world, are because of the power of computers. However, not enough regions are getting the computer science education they need. Low-income regions need the power of computer science to change their lives. Our mission is to fill this gap. Learn more about us in the about section."
        },
        {
            text: "The future belongs to those who can program.",
            author: "Mark Zuckerberg, co-founder of Meta.", 
            blurb: "Computer science is one of the fastest growing fields in the world right now. Many of the major changes and innovations that happen in our world, are because of the power of computers. However, not enough regions are getting the computer science education they need. Low-income regions need the power of computer science to change their lives. Our mission is to fill this gap. Learn more about us in the about section."
        }
        // Add more quotes as needed
    ];

    // Function to select and display a random quote
    function displayRandomQuote() {
        // Select a random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // Update the quote text, author, and blurb in the HTML
        document.querySelector('.quote-text').textContent = `"${randomQuote.text}"`;
        document.querySelector('.quote-author').textContent = `- ${randomQuote.author}`;
        document.querySelector('.quote-blurb').textContent = randomQuote.blurb;
    }

    // Call the function on page load
    window.onload = displayRandomQuote;



    document.addEventListener("DOMContentLoaded", () => {
        // Slow down the timeline progress animation and animate the circles
        gsap.to(".timeline-progress", {
            scrollTrigger: {
                trigger: ".setup-timeline",
                start: "top 80%",
                end: "top 20%",
                scrub: 1
            },
            width: "100%",
            ease: "power1.inOut",
            duration: 4 // Slow down the animation
        });

        // Animate each circle's fill and movement along with the progress bar
        gsap.to(".step-circle", {
            scrollTrigger: {
                trigger: ".setup-timeline",
                start: "top 80%",
                end: "top 20%",
                scrub: 1
            },
            x: (index, target) => {
                return (index * 50) + "%"; // Spread circles across the timeline
            },
            opacity: 1,
            scale: 1.2, // Slightly grow the circle as it fills
            duration: 4, // Slow down the animation to match the timeline
            ease: "power1.inOut",
            stagger: 1
        });
    });


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
