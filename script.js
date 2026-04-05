// Function to trigger entrance animations
function animateCards(targetId) {
    const tl = gsap.timeline();

    if (targetId === 'home') {
        // 1. Deliberate Squeeze-Top
        tl.fromTo(".squeeze-top",
            { y: -150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", clearProps: "transform" }
        );
        
        tl.to({}, { duration: 0.3 }); // Pause
        
        // 2. Deliberate Squeeze-Middle
        tl.fromTo(".squeeze-middle",
            { y: -150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", clearProps: "transform" }
        );
        
        tl.to({}, { duration: 0.3 }); // Pause
        
        // 3. Deliberate Squeeze-Bottom
        tl.fromTo(".squeeze-bottom",
            { y: 150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", clearProps: "transform" }
        );
    } else {
        // Default clean slide-up animation for other pages
        tl.fromTo(`#${targetId} .animate-card`, 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", clearProps: "transform" }
        );
    }
}

// Handle Page Load & RSVP Modal Expiration Logic
window.addEventListener('load', () => {
    const modal = document.getElementById('rsvp-modal');
    const closeBtn = document.getElementById('close-modal');
    
    // Stop displaying modal when it becomes May 10, 2026 (midnight after May 9th)
    const expiryDate = new Date("May 10, 2026 00:00:00").getTime();

    if (new Date().getTime() < expiryDate) {
        // Active Modal - Show it and wait to animate Home Page
        modal.style.display = 'flex';
        gsap.to(modal, { opacity: 1, duration: 0.5 });
        gsap.fromTo(".modal-content", { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "back.out(1.2)" });

        closeBtn.addEventListener('click', () => {
            // Fade out modal and immediately start cinematic squeeze
            gsap.to(modal, { opacity: 0, duration: 0.3, onComplete: () => {
                modal.style.display = 'none';
                animateCards('home'); 
            }});
        });
    } else {
        // Expired Modal - Play cinematic squeeze immediately upon load
        animateCards('home');
    }
});

// App Navigation Logic
const navButtons = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.app-page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active-page'));

        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-page');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Trigger specific animation for clicked page
        animateCards(targetId);
    });
});

// Initialize Premium Swiper 3D Cards
const swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", dynamicBullets: true },
});

// Countdown Timer Logic
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
