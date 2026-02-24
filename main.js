document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect for Hero
    const parallaxBg = document.getElementById('parallax-bg');
    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        if (parallaxBg) {
            // Ajustamos la velocidad (0.5 es un movimiento sutil)
            parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
        }

        // Parallax para flores decorativas
        const flowers = document.querySelectorAll('.flower');
        flowers.forEach((flower, index) => {
            const speed = (index % 3 + 1) * 0.12;
            const rotation = getComputedStyle(flower).getPropertyValue('--rot') || '0deg';
            flower.style.transform = `translateY(${offset * speed}px) rotate(calc(${rotation} + ${offset * 0.02}deg))`;
        });
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.date-row, .section-header, .player-container, .merch-content');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Music Player Logic
    const playBtn = document.getElementById('play-pause');
    const trackTitle = document.getElementById('track-title');
    const playlistItems = document.querySelectorAll('.playlist li');
    const progressBar = document.getElementById('progress-bar');

    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.innerText = isPlaying ? 'PAUSE' : 'PLAY';
        playBtn.style.background = isPlaying ? 'var(--accent-green)' : 'transparent';
        playBtn.style.color = isPlaying ? 'var(--bg-color)' : 'var(--accent-green)';

        if (isPlaying) {
            startProgress();
        } else {
            stopProgress();
        }
    });

    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            playlistItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            trackTitle.innerText = item.getAttribute('data-title');
            resetProgress();
            if (isPlaying) startProgress();
        });
    });

    let progressInterval;
    let progress = 30;

    function startProgress() {
        stopProgress();
        progressInterval = setInterval(() => {
            progress += 0.5;
            if (progress > 100) progress = 0;
            progressBar.style.width = `${progress}%`;
        }, 100);
    }

    function stopProgress() {
        clearInterval(progressInterval);
    }

    function resetProgress() {
        progress = 0;
        progressBar.style.width = '0%';
    }

    // Navbar resize
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.background = 'rgba(18, 20, 15, 0.95)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(18, 20, 15, 0.7)';
        }
    });
});
