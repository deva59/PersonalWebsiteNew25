const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
// const overlayMenu = document.querySelector(".overlay");
const navbarCollapse = document.getElementById("navbarNav"); // Get the Bootstrap collapse element

// if (burgerMenu && navbarMenu && overlayMenu) { // Ensure all elements exist
//     burgerMenu.addEventListener("click", () => {
//         burgerMenu.classList.toggle("is-active");
//         // For Bootstrap, toggling 'is-active' on navbarMenu might not be enough
//         // Bootstrap's collapse plugin handles the visibility of #navbarNav
//         // We mainly use it for the overlay and burger icon state
//         // navbarMenu.classList.toggle("is-active"); // Keep if you have custom menu active state
//         overlayMenu.classList.toggle("is-active");

//         // Manually toggle Bootstrap's collapse if it's not handled by data-bs-toggle
//         if (!burgerMenu.classList.contains('collapsed')) { // Check if burger menu is active/open
//             // If it's active, ensure the collapse element is shown
//             navbarCollapse.classList.add('show');
//         } else {
//             // If it's not active, ensure the collapse element is hidden
//             navbarCollapse.classList.remove('show');
//         }
//     });
// }

document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
        burgerMenu.classList.remove("is-active");
        // navbarMenu.classList.remove("is-active"); // Keep if you have custom menu active state
        overlayMenu.classList.remove("is-active");

        // Hide Bootstrap's collapse menu when a link is clicked
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

window.addEventListener("resize", () => {
    // This check is still valid; it handles showing desktop menu on resize
    if (window.innerWidth >= 992) {
        // navbarMenu.classList.remove("is-active"); // Keep if you have custom menu active state
        overlayMenu.classList.remove("is-active");
        // Ensure Bootstrap's collapse is hidden on desktop resize
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
        burgerMenu.classList.remove("is-active"); // Reset burger icon state
        burgerMenu.classList.add("collapsed"); // Add collapsed class back
        burgerMenu.setAttribute('aria-expanded', 'false'); // Reset aria attribute
    }
});

// Typing Effect
const words = ["FULL STACK DEVELOPER", "MERN STACK DEVELOPER"];
let wordIndex = 0;
let charIndex = 0;
const speed = 150;
const eraseSpeed = 100;
const delay = 1000;
let currentWord = "";

function typeWriter() {
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return; // Exit if element not found

    if (charIndex < words[wordIndex].length) {
        currentWord += words[wordIndex][charIndex];
        typewriterElement.innerHTML = `<b>${currentWord}</b>`;
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseWord, delay);
    }
}

function eraseWord() {
    const typewriterElement = document.getElementById("typewriter");
    if (!typewriterElement) return; // Exit if element not found

    if (charIndex > 0) {
        currentWord = currentWord.slice(0, -1);
        typewriterElement.innerHTML = `<b>${currentWord}</b>`;
        charIndex--;
        setTimeout(eraseWord, eraseSpeed);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWriter, 500);
    }
}

window.onload = () => typeWriter();

// Counter Animation
let counted = false;
window.addEventListener("scroll", () => {
    const counters = document.querySelectorAll(".count");
    const counterSection = document.querySelector(".counter"); // Make sure your HTML has a .counter wrapper

    if (!counterSection) return; // Exit if counter section not found

    if (!counted && window.scrollY + window.innerHeight > counterSection.offsetTop) {
        counters.forEach(counter => {
            let countTo = parseInt(counter.getAttribute("data-count"));
            let count = 0;
            let interval = setInterval(() => {
                if (count < countTo) {
                    count++;
                    counter.innerText = count;
                } else {
                    clearInterval(interval);
                }
            }, 10);
        });
        counted = true;
    }
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150; // You might adjust this value for very small screens
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add("active");
        } else {
            // Optional: Remove 'active' if you want elements to hide again on scroll up
            // reveal.classList.remove("active");
        }
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll(".progress-bar");
    skillBars.forEach(bar => {
        const windowHeight = window.innerHeight;
        const elementTop = bar.getBoundingClientRect().top;
        const elementVisible = 150; // Same visibility threshold

        if (elementTop < windowHeight - elementVisible) {
            bar.classList.add("active");
        } else {
             // Optional: remove active if you want skills to reset on scroll up
             // bar.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal); // Run on load in case elements are already in view


// Bottom To Top Button
const scrollTopBtn = document.querySelector(".bottom-top-button");
if (scrollTopBtn) { // Ensure button exists before adding listener
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Navbar Active Link on Scroll (Smooth Scrolling with Intersection Observer)
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".menu-link");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            const navLink = document.querySelector(`.menu-link[href="#${id}"]`);

            if (navLink) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.75) { // Adjust ratio as needed
                    navLinks.forEach(link => link.classList.remove("active"));
                    navLink.classList.add("active");
                } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                    // Optional: If you want to deactivate when scrolling up past a section
                    navLink.classList.remove("active");
                }
            }
        });
    }, {
        rootMargin: "-50% 0px -50% 0px", // Adjust this to make it more sensitive to the middle of the screen
        threshold: [0.25, 0.5, 0.75] // Observe at different visibility thresholds
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Special handling for the first section if it's not intersecting enough on load
    // Or if you want the first link active by default
    if (document.querySelector('.menu-link[href="#home"]') && !document.querySelector('.menu-link.active')) {
        document.querySelector('.menu-link[href="#home"]').classList.add('active');
    }

    // Smooth scroll for internal links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.custom-navbar').offsetHeight + 20), // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});