// 1. App Navigation Logic (Switching Pages)
const navButtons = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.app-page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and pages
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active-page'));

        // Add active class to clicked button and corresponding page
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-page');
        
        // Scroll to top of the page when switching
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// 2. Initialize Premium Swiper 3D Cards
const swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

// 3. Countdown Timer Logic
const countdownDate = new Date("May 9, 2026 19:00:00").getTime();
const timerElement = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        timerElement.innerHTML = "🏁 The Race Has Started! 🏁";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    timerElement.innerHTML = `${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
