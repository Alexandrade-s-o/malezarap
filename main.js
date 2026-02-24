document.addEventListener('DOMContentLoaded', () => {
    // --- Particle System (Floating Pollen) ---
    const particleContainer = document.getElementById('particle-container');
    const particleCount = 40;

    if (particleContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random properties
            const size = Math.random() * 4 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 20 + 10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = Math.random() * 0.4 + 0.1;

            // Keyframe animation for organic movement
            particle.animate([
                { transform: 'translate(0, 0)' },
                { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)` },
                { transform: 'translate(0, 0)' }
            ], {
                duration: duration * 1000,
                iterations: Infinity,
                delay: -delay * 1000,
                easing: 'ease-in-out'
            });

            particleContainer.appendChild(particle);
        }
    }

    // --- Parallax Effects ---
    const parallaxBg = document.getElementById('parallax-bg');
    const flowers = document.querySelectorAll('.flower');

    window.addEventListener('scroll', () => {
        const scrollOffset = window.pageYOffset;

        // Restore Hero Background Parallax (Disabled per request)
        if (parallaxBg) {
            parallaxBg.style.transform = `none`;
        }

        // Restore Flower Parallax (Use CSS Variable for organic combo)
        flowers.forEach((flower, index) => {
            const speed = (index % 3 + 1) * 0.12;
            flower.style.setProperty('--p-y', `${scrollOffset * speed}px`);
            flower.style.setProperty('--p-rot', `${scrollOffset * 0.02}deg`);
        });
    });

    // --- Reveal elements on scroll ---
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

    // --- Navbar resize ---
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

    // --- Music Player Logic (Restored) ---
    // Note: The UI for this might be hidden or partial, but preserving logic
    const playBtn = document.getElementById('play-pause');
    const trackTitle = document.getElementById('track-title');
    const playlistItems = document.querySelectorAll('.playlist li');
    const progressBar = document.getElementById('progress-bar');

    if (playBtn) {
        let isPlaying = false;
        let progressInterval;
        let progress = 30;

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

        function startProgress() {
            stopProgress();
            progressInterval = setInterval(() => {
                progress += 0.5;
                if (progress > 100) progress = 0;
                if (progressBar) progressBar.style.width = `${progress}%`;
            }, 100);
        }

        function stopProgress() {
            clearInterval(progressInterval);
        }

        function resetProgress() {
            progress = 0;
            if (progressBar) progressBar.style.width = '0%';
        }

        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                playlistItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                if (trackTitle) trackTitle.innerText = item.getAttribute('data-title');
                resetProgress();
                if (isPlaying) startProgress();
            });
        });
    }
});

