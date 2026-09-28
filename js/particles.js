// ===== 光粒子交互背景系统 =====
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.particleCount = 0;
        this.animationId = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.resize();
        this.createParticles();
        if (!this.isReducedMotion) {
            this.animate();
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // 根据屏幕宽度调整粒子数量
        const baseCount = window.innerWidth < 640 ? 50 : 
                          window.innerWidth < 960 ? 80 : 120;
        this.particleCount = Math.min(baseCount, Math.floor((this.canvas.width * this.canvas.height) / 15000));
    }

    createParticles() {
        this.particles = [];
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                colorIndex: Math.floor(Math.random() * 3)
            });
        }
    }

    getParticleColor(index) {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const colors = theme === 'dark'
            ? ['#5F67D8', '#9E8AE8', '#DC4B9C']
            : ['#B79CED', '#7FB5E6', '#E4C7D6'];
        return colors[index % colors.length];
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // 主题切换时重新创建粒子以更新颜色
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    this.createParticles();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        // 减少动效偏好变化
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            if (this.isReducedMotion) {
                this.stop();
                this.drawStatic();
            } else {
                this.animate();
            }
        });
    }

    drawParticle(particle) {
        const color = this.getParticleColor(particle.colorIndex);
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fill();
        
        // 发光效果
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = color;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        this.ctx.globalAlpha = 1;
    }

    connectParticles() {
        const maxDistance = 120;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    const color = this.getParticleColor(this.particles[i].colorIndex);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = color;
                    this.ctx.globalAlpha = opacity;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }

    updateParticle(particle) {
        // 基础运动
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // 边界检测
        if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.speedY = -particle.speedY;
        }

        // 鼠标交互 - 视差效果
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                particle.x += Math.cos(angle) * force * 2;
                particle.y += Math.sin(angle) * force * 2;
                particle.opacity = Math.min(1, particle.opacity + force * 0.3);
            } else {
                particle.opacity = Math.max(0.2, particle.opacity - 0.01);
            }
        }
    }

    animate() {
        if (this.isReducedMotion) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        this.connectParticles();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawStatic() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            this.drawParticle(particle);
        });
        this.connectParticles();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// ===== 流星效果 =====
class MeteorSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.meteors = [];
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!this.isReducedMotion) {
            this.init();
        }

        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            if (e.matches) {
                this.clear();
            } else {
                this.init();
            }
        });
    }

    init() {
        // 定期创建流星
        this.createMeteor();
        this.interval = setInterval(() => {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.createMeteor();
            }
        }, 3000 + Math.random() * 2000);
    }

    createMeteor() {
        if (this.isReducedMotion) return;
        if (document.documentElement.getAttribute('data-theme') !== 'dark') return;

        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = Math.random() * 100 + '%';
        meteor.style.top = '-100px';
        meteor.style.animationDuration = (2 + Math.random() * 2) + 's';
        meteor.style.animationDelay = Math.random() * 2 + 's';
        
        this.container.appendChild(meteor);

        // 动画结束后移除
        setTimeout(() => {
            if (meteor.parentNode) {
                meteor.parentNode.removeChild(meteor);
            }
        }, 5000);
    }

    clear() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.container.innerHTML = '';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem('particleCanvas');
    window.meteorSystem = new MeteorSystem('meteorsContainer');
});
