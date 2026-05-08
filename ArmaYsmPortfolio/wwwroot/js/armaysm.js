(function () {
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+1234567890<>?/[]{}';
    let initialized = false;

    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = glyphs;
            this.update = this.update.bind(this);
            this.frame = 0;
            this.queue = [];
            this.frameRequest = null;
            this.resolve = null;
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => (this.resolve = resolve));
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end, char: null });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-blue-400">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                if (this.resolve) this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    function initScramble() {
        document.querySelectorAll('.scramble-on-hover').forEach((el) => {
            if (el.dataset.scrambleBound === '1') return;
            el.dataset.scrambleBound = '1';
            const fx = new TextScramble(el);
            const originalText = el.innerText;
            let isScrambling = false;
            el.addEventListener('mouseenter', () => {
                if (isScrambling) return;
                isScrambling = true;
                fx.setText(originalText).then(() => (isScrambling = false));
            });
        });
    }

    function initTerminalTyping() {
        const terminal = document.getElementById('hero-terminal-body');
        if (!terminal) return;
        const lines = terminal.querySelectorAll('.terminal-line');
        lines.forEach((line, i) => {
            line.style.animationDelay = `${0.5 + i * 0.4}s`;
        });
    }

    function initAmbientGlitch() {
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top < window.innerHeight &&
                rect.bottom > 0 &&
                rect.left < window.innerWidth &&
                rect.right > 0
            );
        }

        function hasOnlyTextContent(element) {
            return element.children.length === 0;
        }

        function ambientGlitch() {
            const allNodes = document.querySelectorAll('h1, h2, h3, p, a');
            if (!allNodes || allNodes.length === 0) {
                setTimeout(ambientGlitch, 3000);
                return;
            }
            const visibleNodes = Array.from(allNodes).filter((node) => {
                const isInFooter = node.closest('#contact') !== null;
                return !isInFooter && isInViewport(node) && hasOnlyTextContent(node);
            });
            if (visibleNodes.length > 0) {
                const targetNode = visibleNodes[Math.floor(Math.random() * visibleNodes.length)];
                if (targetNode && !targetNode.classList.contains('scramble-on-hover')) {
                    const originalHTML = targetNode.innerHTML;
                    const originalText = targetNode.innerText;
                    const fx = new TextScramble(targetNode);
                    fx.setText(originalText).then(() => {
                        targetNode.innerHTML = originalHTML;
                    });
                }
            }
            setTimeout(ambientGlitch, Math.random() * 5000 + 3000);
        }

        setTimeout(ambientGlitch, 20);
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const id = href ? href.substring(1) : '';
                const el = id ? document.getElementById(id) : null;
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    function initParticleField() {
        const fields = document.querySelectorAll('.particle-field');
        fields.forEach((field) => {
            const count = 40;
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 8}s`;
                particle.style.animationDuration = `${6 + Math.random() * 6}s`;
                particle.style.width = `${1 + Math.random() * 3}px`;
                particle.style.height = particle.style.width;
                field.appendChild(particle);
            }
        });
    }

    function init3DTilt() {
        const cards = document.querySelectorAll('[data-tilt]');
        if (!cards.length) return;

        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.setProperty('--tilt-x', `${rotateX}deg`);
                card.style.setProperty('--tilt-y', `${rotateY}deg`);

                const glowX = (x / rect.width) * 100;
                const glowY = (y / rect.height) * 100;
                card.style.setProperty('--glow-x', `${glowX}%`);
                card.style.setProperty('--glow-y', `${glowY}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--tilt-x', '0deg');
                card.style.setProperty('--tilt-y', '0deg');
            });
        });
    }

    function initProjectPreview() {
        const cards = document.querySelectorAll('[data-project-card]');
        if (!cards.length) return;

        let activePreview = null;
        let cooldown = false;

        cards.forEach((card) => {
            card.addEventListener('mouseenter', function (e) {
                if (activePreview || cooldown) return;

                const screenshots = JSON.parse(this.dataset.screenshots || '[]');
                if (!screenshots.length) return;

                const rect = this.getBoundingClientRect();
                const clone = this.cloneNode(true);
                clone.classList.add('preview-card-origin');
                clone.style.position = 'fixed';
                clone.style.left = rect.left + 'px';
                clone.style.top = rect.top + 'px';
                clone.style.width = rect.width + 'px';
                clone.style.height = rect.height + 'px';
                clone.style.zIndex = '10001';
                clone.style.pointerEvents = 'none';
                clone.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                clone.style.margin = '0';

                const overlay = document.createElement('div');
                overlay.className = 'project-preview-overlay';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.4s ease';

                const orbitRing = document.createElement('div');
                orbitRing.className = 'orbit-ring';

                const orbitRadius = Math.min(320, window.innerWidth * 0.3, window.innerHeight * 0.3);

                const sizes = [100, 130, 85, 110, 95, 145, 75, 120, 105, 90, 135, 80];
                screenshots.forEach((shot, i) => {
                    const bubble = document.createElement('div');
                    bubble.className = 'orbit-bubble';
                    const size = sizes[i % sizes.length];
                    bubble.style.width = size + 'px';
                    bubble.style.height = size + 'px';
                    bubble.style.left = (-size / 2) + 'px';
                    bubble.style.top = (-size / 2) + 'px';
                    bubble.style.setProperty('--orbit-delay', `${i * 0.12}s`);
                    bubble.style.setProperty('--orbit-index', i);
                    bubble.style.setProperty('--orbit-count', screenshots.length);
                    bubble.style.background = shot.Gradient;

                    const angle = (i / screenshots.length) * Math.PI * 2 - Math.PI / 2;
                    const x = Math.cos(angle) * orbitRadius;
                    const y = Math.sin(angle) * orbitRadius;

                    bubble.style.setProperty('--orbit-start', `translate(${x * 0.3}px, ${y * 0.3}px) scale(0)`);
                    bubble.style.setProperty('--orbit-end', `translate(${x}px, ${y}px) scale(1)`);

                    const icon = document.createElement('i');
                    icon.className = shot.Icon;
                    icon.style.fontSize = Math.max(1, size / 65) + 'rem';
                    bubble.appendChild(icon);

                    const label = document.createElement('span');
                    label.className = 'orbit-label';
                    label.textContent = shot.Label;
                    bubble.appendChild(label);

                    requestAnimationFrame(() => {
                        bubble.classList.add('visible');
                    });

                    orbitRing.appendChild(bubble);

                    bubble.addEventListener('mouseenter', () => {
                        bubble.style.setProperty('--orbit-end', `translate(${x}px, ${y}px) scale(1.15)`);
                        bubble.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.4)';
                    });
                    bubble.addEventListener('mouseleave', () => {
                        bubble.style.setProperty('--orbit-end', `translate(${x}px, ${y}px) scale(1)`);
                        bubble.style.boxShadow = '';
                    });
                });

                overlay.appendChild(orbitRing);
                overlay.appendChild(clone);
                document.body.appendChild(overlay);

                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';

                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const targetW = Math.min(420, window.innerWidth * 0.35);
                    const targetH = targetW * (rect.height / rect.width);

                    clone.style.left = (centerX - targetW / 2) + 'px';
                    clone.style.top = (centerY - targetH / 2) + 'px';
                    clone.style.width = targetW + 'px';
                    clone.style.height = targetH + 'px';
                    clone.style.transform = 'scale(1.05)';
                    clone.style.boxShadow = '0 20px 80px rgba(0, 0, 0, 0.6), 0 0 60px rgba(168, 85, 247, 0.15)';
                    clone.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                });

                card.classList.add('preview-blur');

                activePreview = { overlay, clone, card };
            });
        });

        function dismissPreview() {
            if (!activePreview) return;

            const { overlay, card } = activePreview;
            const clone = overlay.querySelector('.preview-card-origin');

            if (clone) {
                const rect = card.getBoundingClientRect();
                clone.style.left = rect.left + 'px';
                clone.style.top = rect.top + 'px';
                clone.style.width = rect.width + 'px';
                clone.style.height = rect.height + 'px';
                clone.style.transform = 'scale(1)';
                clone.style.boxShadow = '';
                clone.style.borderColor = '';
            }

            overlay.style.opacity = '0';
            card.classList.remove('preview-blur');

            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 500);

            activePreview = null;

            cooldown = true;
            setTimeout(() => { cooldown = false; }, 800);
        }

        document.addEventListener('click', (e) => {
            if (!activePreview) return;
            const clone = activePreview.overlay.querySelector('.preview-card-origin');
            if (clone && !clone.contains(e.target)) {
                dismissPreview();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && activePreview) dismissPreview();
        });
    }

    function initGame() {
        const player = document.getElementById('player');
        const container = document.getElementById('game-container');
        const scoreEl = document.getElementById('score');
        const gameOverEl = document.getElementById('game-over');
        const startEl = document.getElementById('game-start');
        if (!player || !container || !scoreEl || !gameOverEl || !startEl) return;

        let gameActive = false;
        let score = 0;
        let gameLoop = null;
        let isJumping = false;

        function startGame() {
            if (gameLoop) clearInterval(gameLoop);
            gameActive = true;
            score = 0;
            scoreEl.innerText = 'SCORE: 0';
            gameOverEl.style.display = 'none';
            startEl.style.display = 'none';
            container.querySelectorAll('.obstacle').forEach((o) => o.remove());
            gameLoop = setInterval(() => {
                if (!gameActive) return;
                score++;
                scoreEl.innerText = `SCORE: ${score}`;
                if (Math.random() < 0.02) createObstacle();
            }, 50);
        }

        function createObstacle() {
            const obstacle = document.createElement('div');
            obstacle.classList.add('obstacle');
            container.appendChild(obstacle);
            let pos = -50;
            const moveInterval = setInterval(() => {
                if (!gameActive) { clearInterval(moveInterval); return; }
                pos += 8;
                obstacle.style.right = pos + 'px';
                const playerRect = player.getBoundingClientRect();
                const obsRect = obstacle.getBoundingClientRect();
                if (
                    playerRect.right > obsRect.left &&
                    playerRect.left < obsRect.right &&
                    playerRect.bottom > obsRect.top &&
                    playerRect.top < obsRect.bottom
                ) { endGame(); }
                if (pos > container.offsetWidth + 50) {
                    clearInterval(moveInterval);
                    obstacle.remove();
                }
            }, 20);
        }

        function jump() {
            if (isJumping || !gameActive) return;
            isJumping = true;
            let up = 0;
            const upInterval = setInterval(() => {
                if (up >= 150) {
                    clearInterval(upInterval);
                    const downInterval = setInterval(() => {
                        if (up <= 0) { clearInterval(downInterval); isJumping = false; }
                        up -= 5;
                        player.style.bottom = (20 + up) + 'px';
                    }, 15);
                    return;
                }
                up += 5;
                player.style.bottom = (20 + up) + 'px';
            }, 10);
        }

        function endGame() {
            gameActive = false;
            if (gameLoop) clearInterval(gameLoop);
            gameLoop = null;
            gameOverEl.style.display = 'block';
        }

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') { e.preventDefault(); jump(); }
        });
        container.addEventListener('touchstart', (e) => { e.preventDefault(); jump(); });

        window.ArmaYsm.startGame = startGame;
    }

    window.ArmaYsm = window.ArmaYsm || {};

    window.ArmaYsm.init = function () {
        if (initialized) return;
        initialized = true;
        initScramble();
        initTerminalTyping();
        initAmbientGlitch();
        initSmoothScroll();
        initParticleField();
        init3DTilt();
        initProjectPreview();
        initGame();
    };

    window.ArmaYsm.startGameSafe = function () {
        window.ArmaYsm.init();
        if (typeof window.ArmaYsm.startGame === 'function') {
            window.ArmaYsm.startGame();
        }
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    window.ArmaYsm?.init?.();
});
