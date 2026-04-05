// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Gentle Parallax for Background Image
gsap.to(".background-art", {
    yPercent: 20, // Moves the background slightly down as you scroll
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// 2. Float-in Animation for all major sections
const sections = gsap.utils.toArray('.drift-in');

sections.forEach(section => {
    gsap.from(section, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 85%", // Triggers when top of section hits 85% down viewport
            toggleActions: "play none none reverse"
        }
    });
});

// 3. Countdown Timer Logic (Target: May 9, 2026, 7:00 PM)
const countdownDate = new Date("May 9, 2026 19:00:00").getTime();
const timerElement = document.getElementById("countdown");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        timerElement.innerHTML = "🏁 The Race Has Started! 🏁";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format output with leading zeros for aesthetic
    timerElement.innerHTML = 
        `${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
}

// Initialize countdown
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);
