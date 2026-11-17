        // Particle Background System
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 100, 50, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            particles.forEach((a, index) => {
                particles.slice(index + 1).forEach(b => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(255, 100, 50, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        initParticles();
        animateParticles();
        window.addEventListener('resize', resizeCanvas);

        // Navigation scroll effect
        const navbar = document.getElementById('navbar');
        const mobileMenuButton = document.querySelector('.mobile-menu');
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                const isOpen = navbar.classList.toggle('mobile-open');
                mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
                mobileMenuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
                mobileMenuButton.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({behavior: 'smooth', block: 'start'});
                    navbar.classList.remove('mobile-open');
                    if (mobileMenuButton) {
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                        mobileMenuButton.setAttribute('aria-label', 'Open navigation menu');
                        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });

        // Modal functions
        function showModal(title, text, icon) {
            document.getElementById('modalTitle').innerText = title;
            document.getElementById('modalText').innerText = text;
            document.getElementById('modalIcon').innerHTML = icon;
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }

        // Button click handlers
        // function playOnline() {
        //     showModal(
        //         'Launching QuakeEscape...',
        //         'Your 2D earthquake preparedness adventure is loading. Please wait while we initialize the game engine.',
        //         '<i class="fas fa-spinner fa-spin"></i>'
        //     );

            function playOnline() {
    // showModal(
    //     'Launching QuakeEscape...',
    //     'Your 2D earthquake preparedness adventure is loading. Please wait while we initialize the game engine.',
    //     '<i class="fas fa-spinner fa-spin"></i>'
    // );

    // Open the game in a new tab
    window.open(
        'https://gd.games/games/dc48225a-79b4-4219-b47e-657433a46a96'
    );
}
{

            // setTimeout(() => {
            //     closeModal();
            //     showToast('QuakeEscape launched! Starting your adventure in Phase 1.');
            // }, 2000);
        }

     function downloadGame() {
    showModal(
        'Download QuakeEscape',
        "The offline version of QuakeEscape isn't ready just yet, but don't worry we'll have it ready for you soon!",
        '<i class="fas fa-download"></i>'
    );
}

        function downloadResource(type) {
            const loader = document.getElementById('loader');
            loader.classList.add('active');

            setTimeout(() => {
                loader.classList.remove('active');
                const names = {
                    'checklist': 'Emergency Checklist',
                    'plan': 'Family Emergency Plan',
                    'supplies': 'Supply Kit Guide'
                };
                showToast(`${names[type]} downloaded successfully! Check your downloads folder.`);
            }, 1500);
        }

        // Quiz functionality
        function selectAnswer(element, isCorrect) {
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('correct', 'wrong');
                opt.style.pointerEvents = 'none';
            });

            const resultDiv = document.getElementById('quizResult');
            const resultTitle = document.getElementById('resultTitle');
            const resultText = document.getElementById('resultText');

            if (isCorrect) {
                element.classList.add('correct');
                resultDiv.className = 'quiz-result show correct';
                resultTitle.innerText = 'Correct!';
                resultTitle.style.color = '#22c55e';
                resultText.innerText = '"Drop, Cover, and Hold On" is the official safety protocol recommended by Central 911 and emergency professionals worldwide. This position protects you from falling debris while keeping you steady during shaking.';
            } else {
                element.classList.add('wrong');
                document.querySelectorAll('.quiz-option')[1].classList.add('correct');
                resultDiv.className = 'quiz-result show wrong';
                resultTitle.innerText = 'Not quite right';
                resultTitle.style.color = '#dc2626';
                resultText.innerText = 'Running outside or standing in doorways are outdated and dangerous practices. The correct answer is "Drop, Cover, and Hold On" - this protects you from the most common earthquake hazards.';
            }
        }

        // Toast notification
        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').innerText = message;
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Close modal on outside click
        window.onclick = function (event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .step-item, .download-card, .team-member').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
