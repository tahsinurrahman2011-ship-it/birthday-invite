// Function to trigger entrance animations
function animateCards(targetId) {
    // We are creating a MASTER TIMELINE so we can add deliberate delays.
    const tl = gsap.timeline();

    if (targetId === 'home') {
        // Initial delay when the website opens to let the background load.
        tl.to({}, { duration: 0.5 }); 
        
        // 1. Deliberate Squeeze-Top: Photo Banner drops down slowly.
        // We've increased 'duration' to slow it down.
        tl.fromTo(".squeeze-top",
            { y: -150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", clearProps: "transform" }
        );
        
        // Short pause between elements.
        tl.to({}, { duration: 0.3 }); 
        
        // 2. Deliberate Squeeze-Middle: Title card drops down.
        tl.fromTo(".squeeze-middle",
            { y: -150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", clearProps: "transform" }
        );
        
        // Final pause.
        tl.to({}, { duration: 0.3 }); 
        
        // 3. Deliberate Squeeze-Bottom: Note card rises up.
        tl.fromTo(".squeeze-bottom",
            { y: 150, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "back.out(1.2)", clearProps: "transform" }
        );
    } else {
        // Default clean slide-up animation for all other pages
        tl.fromTo(`#${targetId} .animate-card`, 
            { y: 40, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", clearProps: "transform" }
        );
    }
}

// App Navigation Logic
const navButtons = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.app-page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Switch Active States
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active-page'));

        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-page');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Trigger the specific animation for the clicked page
        animateCards(targetId);
    });
});

// Run animation on initial load
window.addEventListener('load', () => {
    // On load, we specifically trigger the 'home' animation logic
    animateCards('home');
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
