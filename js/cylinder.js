// ===== 圆筒旋转3D展示 =====
class Cylinder3D {
    constructor(containerId, faceCount = 6) {
        this.container = document.getElementById(containerId);
        this.cylinder = this.container.querySelector('.cylinder');
        this.faceCount = faceCount;
        this.rotationY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.velocity = 0;
        this.autoRotate = true;
        this.autoRotateSpeed = 0.3;
        this.faceWidth = 200;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.createFaces();
        this.updateRotation();
        
        // 自动旋转
        this.autoRotateLoop();
    }

    createFaces() {
        this.cylinder.innerHTML = '';
        const angleStep = 360 / this.faceCount;
        const radius = this.faceWidth / (2 * Math.tan(Math.PI / this.faceCount));

        for (let i = 0; i < this.faceCount; i++) {
            const face = document.createElement('div');
            face.className = 'cylinder-face';
            face.innerHTML = `🎨`;
            
            const angle = i * angleStep;
            face.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
            
            this.cylinder.appendChild(face);
        }
    }

    updateRotation() {
        this.cylinder.style.transform = `rotateY(${this.rotationY}deg)`;
    }

    autoRotateLoop() {
        if (this.autoRotate && !this.isDragging) {
            this.rotationY += this.autoRotateSpeed;
            this.updateRotation();
        }
        requestAnimationFrame(() => this.autoRotateLoop());
    }

    bindEvents() {
        // 鼠标事件
        this.container.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('mousemove', (e) => this.drag(e));
        window.addEventListener('mouseup', (e) => this.endDrag(e));

        // 触摸事件
        this.container.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        window.addEventListener('touchmove', (e) => this.drag(e.touches[0]));
        window.addEventListener('touchend', (e) => this.endDrag(e));

        // 鼠标悬停暂停自动旋转
        this.container.addEventListener('mouseenter', () => {
            this.autoRotate = false;
        });
        this.container.addEventListener('mouseleave', () => {
            if (!this.isDragging) {
                this.autoRotate = true;
            }
        });

        // 响应式调整
        window.addEventListener('resize', () => {
            this.updateFaceSize();
        });
    }

    updateFaceSize() {
        const isMobile = window.innerWidth < 640;
        this.faceWidth = isMobile ? 150 : 200;
        
        const faces = this.cylinder.querySelectorAll('.cylinder-face');
        const angleStep = 360 / this.faceCount;
        const radius = this.faceWidth / (2 * Math.tan(Math.PI / this.faceCount));

        faces.forEach((face, i) => {
            const angle = i * angleStep;
            face.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.currentX = this.rotationY;
        this.velocity = 0;
        this.autoRotate = false;
        this.container.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;
        
        const deltaX = e.clientX - this.startX;
        const newRotation = this.currentX + deltaX * 0.5;
        
        // 计算速度用于惯性
        this.velocity = (newRotation - this.rotationY) * 0.1;
        
        this.rotationY = newRotation;
        this.updateRotation();
    }

    endDrag(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.container.style.cursor = 'grab';
        
        // 惯性滑动
        this.applyInertia();
    }

    applyInertia() {
        const friction = 0.95;
        const minVelocity = 0.01;

        const inertiaLoop = () => {
            if (Math.abs(this.velocity) < minVelocity || this.isDragging) {
                if (!this.isDragging && this.container.matches(':hover')) {
                    // 鼠标仍在上面，不自动旋转
                } else if (!this.isDragging) {
                    this.autoRotate = true;
                }
                return;
            }

            this.rotationY += this.velocity;
            this.velocity *= friction;
            this.updateRotation();

            requestAnimationFrame(inertiaLoop);
        };

        inertiaLoop();
    }

    setFaceContent(contents) {
        const faces = this.cylinder.querySelectorAll('.cylinder-face');
        faces.forEach((face, i) => {
            if (contents[i]) {
                face.innerHTML = contents[i];
                face.style.fontSize = '48px';
                face.style.display = 'flex';
                face.style.alignItems = 'center';
                face.style.justifyContent = 'center';
            }
        });
    }
}

// 初始化圆筒展示（在作品详情弹层中使用）
let cylinderInstance = null;

function initCylinder() {
    if (!cylinderInstance) {
        cylinderInstance = new Cylinder3D('cylinderContainer', 6);
    }
    return cylinderInstance;
}

// 暴露给全局
window.initCylinder = initCylinder;
window.Cylinder3D = Cylinder3D;
