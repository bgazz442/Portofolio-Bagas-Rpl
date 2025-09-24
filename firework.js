// Firework animation for mini game
window.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('firework-btn');
    const canvas = document.getElementById('firework-canvas');
    if (!btn || !canvas) return;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const ctx = canvas.getContext('2d');
    let fireworks = [];

    function randomColor() {
        const colors = ['#ff1744','#fbc02d','#00e676','#2979ff','#d500f9','#ff9100'];
        return colors[Math.floor(Math.random()*colors.length)];
    }

    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2) * (i / 30);
            const speed = Math.random() * 3 + 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: randomColor()
            });
        }
    }

    Firework.prototype.update = function() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05;
            p.alpha -= 0.02;
        });
        this.particles = this.particles.filter(p => p.alpha > 0);
    };

    Firework.prototype.draw = function(ctx) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.restore();
        });
    };

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach(fw => {
            fw.update();
            fw.draw(ctx);
        });
        fireworks = fireworks.filter(fw => fw.particles.length > 0);
        if (fireworks.length > 0) requestAnimationFrame(animate);
    }

    btn.addEventListener('click', function(e) {
        // Firework muncul di area tengah atas layar
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 3;
        fireworks.push(new Firework(x, y));
        animate();
    });
});
