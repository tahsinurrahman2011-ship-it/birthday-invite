// --- NEW FUN ANIMATIONS: Confetti Cannon --- //

// Fire confetti when the website finishes loading
window.addEventListener('load', () => {
    // A fun, colorful double-burst of confetti!
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4757', '#ffa502', '#2ed573', '#1e90ff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4757', '#ffa502', '#2ed573', '#1e90ff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});

// Also fire a small pop of confetti when they click the "Start" button!
document.querySelector('[data-target="home"]').addEventListener('click', () => {
    confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#ff4757', '#ffa502', '#2ed573', '#1e90ff']
    });
});
