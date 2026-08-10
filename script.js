/* ============================================
   Cut Signal Pro - Landing Page JavaScript
   ============================================ */

// --- Countdown Timer ---
function initCountdown() {
    if (!sessionStorage.getItem('countdownEnd')) {
        const endTime = new Date().getTime() + 3 * 60 * 60 * 1000;
        sessionStorage.setItem('countdownEnd', endTime);
    }

    const storedEnd = parseInt(sessionStorage.getItem('countdownEnd'));

    function update() {
        const now = new Date().getTime();
        const distance = storedEnd - now;

        if (distance <= 0) {
            const newEnd = new Date().getTime() + 3 * 60 * 60 * 1000;
            sessionStorage.setItem('countdownEnd', newEnd);
            return;
        }

        const h = Math.floor(distance / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const hEl = document.getElementById('hours');
        const mEl = document.getElementById('minutes');
        const sEl = document.getElementById('seconds');

        if (hEl) hEl.textContent = String(h).padStart(2, '0');
        if (mEl) mEl.textContent = String(m).padStart(2, '0');
        if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// --- Image Gallery ---
const images = [
    'images/product-1.jpg',
    'images/product-2.png',
    'images/product-3.png'
];

function changeImage(index) {
    const mainImage = document.getElementById('mainImage');
    if (!mainImage) return;

    const thumbs = document.querySelectorAll('.hero__thumb');

    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.src = images[index];
        mainImage.style.opacity = '1';
    }, 200);

    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// --- FAQ Accordion ---
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq__item').forEach(item => {
        item.classList.remove('active');
    });

    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// --- Go to Checkout ---
function goToCheckout() {
    window.location.href = 'checkout.html';
}

// --- Smooth scroll ---
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.feature-card, .review-card, .faq__item, .social-proof__item').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        observer.observe(el);
    });
});
