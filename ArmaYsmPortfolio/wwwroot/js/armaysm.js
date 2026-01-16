/* global window, document, requestAnimationFrame, cancelAnimationFrame, setTimeout, setInterval, clearInterval */

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
            if (el.dataset.scrambleBound === "1") return; // already wired
            el.dataset.scrambleBound = "1";

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


    function initAmbientGlitch() {
        function ambientGlitch() {
            const allNodes = document.querySelectorAll('h1, h2, h3, p, a');
            if (!allNodes || allNodes.length === 0) {
                setTimeout(ambientGlitch, 3000);
                return;
            }

            const targetNode = allNodes[Math.floor(Math.random() * allNodes.length)];
            if (targetNode && !targetNode.classList.contains('scramble-on-hover')) {
                const original = targetNode.innerText;
                const fx = new TextScramble(targetNode);
                fx.setText(original);
            }

            setTimeout(ambientGlitch, Math.random() * 5000 + 3000);
        }

        setTimeout(ambientGlitch, 2000);
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const id = href ? href.substring(1) : "";
                const el = id ? document.getElementById(id) : null;
                if (!el) return;
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
            });
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
                if (!gameActive) {
                    clearInterval(moveInterval);
                    return;
                }

                pos += 8;
                obstacle.style.right = pos + 'px';

                const playerRect = player.getBoundingClientRect();
                const obsRect = obstacle.getBoundingClientRect();

                if (
                    playerRect.right > obsRect.left &&
                    playerRect.left < obsRect.right &&
                    playerRect.bottom > obsRect.top &&
                    playerRect.top < obsRect.bottom
                ) {
                    endGame();
                }

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
                        if (up <= 0) {
                            clearInterval(downInterval);
                            isJumping = false;
                        }
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
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        });

        container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            jump();
        });

        window.ArmaYsm.startGame = startGame;
    }

    window.ArmaYsm = window.ArmaYsm || {};

    window.ArmaYsm.init = function () {
        if (initialized) return;
        initialized = true;
        initScramble();
        initAmbientGlitch();
        initSmoothScroll();
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