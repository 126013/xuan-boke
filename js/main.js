// ===== 主应用脚本 =====

// ===== 数据定义 =====
const journeyData = [
    {
        date: '2023.09',
        title: '大一入学',
        desc: '考入天津仁爱学院数智传媒与设计艺术学院产品设计专业，开启设计之旅。',
        detail: `
            <p>2023年9月，我正式踏入天津仁爱学院的校门，成为数智传媒与设计艺术学院产品设计专业的一名新生。</p>
            <p>入学初期，我对产品设计充满了好奇与期待。通过专业导论课程，我第一次系统地了解了产品设计的全貌：</p>
            <ul>
                <li>产品设计的定义与范畴</li>
                <li>设计思维的基本方法</li>
                <li>行业发展趋势与就业方向</li>
            </ul>
            <p>大一上学期，我打下了扎实的美术基础，包括素描、色彩、平面构成等基础课程。这些课程为我后续的专业学习奠定了坚实的基础。</p>
        `
    },
    {
        date: '2024.03',
        title: '专业学习深入',
        desc: '系统学习产品设计理论与软件技能，掌握 Rhino、Keyshot、PS、AI 等工具。',
        detail: `
            <p>大一下学期开始，我逐渐深入到专业课程的学习中。这个阶段的学习让我对产品设计有了更深刻的理解。</p>
            <p><strong>主要学习内容：</strong></p>
            <ul>
                <li><strong>设计软件：</strong>系统学习了 Rhino 3D 建模、Keyshot 渲染、Photoshop 图像处理、Illustrator 矢量绘图等专业软件</li>
                <li><strong>设计方法：</strong>用户研究、需求分析、概念生成、原型制作等完整设计流程</li>
                <li><strong>设计理论：</strong>人机工程学、材料工艺、设计美学等理论知识</li>
            </ul>
            <p>通过大量的练习和作业，我逐渐掌握了将创意转化为可视化作品的能力。每一个软件命令的学习，每一次建模的尝试，都让我离专业设计师更近一步。</p>
        `
    },
    {
        date: '2024.09',
        title: '项目实践',
        desc: '参与多个课程设计项目，从概念草图到成品模型，完整经历产品设计流程。',
        detail: `
            <p>大二学年，我开始参与更多的课程设计项目，有机会完整地经历产品设计的全流程。</p>
            <p><strong>代表项目：</strong></p>
            <ul>
                <li><strong>智能家居产品设计：</strong>从用户调研出发，设计一款面向年轻家庭的智能音箱产品，完成从概念到模型的全流程</li>
                <li><strong>文创产品设计：</strong>结合天津本地文化元素，设计系列文创产品，包括文具、生活用品等</li>
                <li><strong>交通工具设计：</strong>探索未来城市出行方式，设计一款轻量化个人代步工具</li>
            </ul>
            <p>这些项目让我深刻体会到：好的设计不仅仅是外观好看，更要解决真实的问题，满足用户的需求。每一次头脑风暴、每一轮方案迭代、每一个模型的制作，都让我收获满满。</p>
        `
    },
    {
        date: '2025.05',
        title: '竞赛获奖',
        desc: '参加设计竞赛并获得优异成绩，作品获得评委认可，积累实战经验。',
        detail: `
            <p>大二下学期，我鼓起勇气参加了几项设计竞赛，希望通过比赛检验自己的学习成果，也向更优秀的设计师学习。</p>
            <p><strong>参赛经历：</strong></p>
            <ul>
                <li>参加全国大学生工业设计大赛，作品进入复赛</li>
                <li>参加天津市高校设计联展，获得优秀奖</li>
                <li>参加校级创新创业大赛，获得三等奖</li>
            </ul>
            <p>参赛的过程比结果更重要。在准备竞赛的过程中，我学会了如何在有限的时间内高质量地完成设计方案，如何清晰地展示自己的设计理念，如何从评委的反馈中汲取经验。这些都是课堂上学不到的宝贵财富。</p>
        `
    },
    {
        date: '2025.09',
        title: '大三 · 现在',
        desc: '深耕专业领域，拓展UI/交互设计能力，准备作品集与实习机会。',
        detail: `
            <p>进入大三，我对自己的未来有了更清晰的规划。我希望在产品设计的基础上，进一步拓展UI/UX和交互设计的能力，成为一名更全面的设计师。</p>
            <p><strong>当前目标：</strong></p>
            <ul>
                <li><strong>专业深耕：</strong>继续打磨产品设计能力，关注设计趋势和前沿技术</li>
                <li><strong>技能拓展：</strong>学习UI设计、交互设计、动效设计等相关技能，拓宽职业道路</li>
                <li><strong>作品集：</strong>整理过往作品，打造高质量的个人作品集网站</li>
                <li><strong>实习准备：</strong>积极寻找实习机会，在实战中成长</li>
            </ul>
            <p>设计之路漫漫，我才刚刚启程。未来，我希望能够用设计创造价值，用作品证明自己。这个个人博客，就是我成长路上的一个见证。</p>
        `
    }
];

const worksData = [
    {
        id: 1,
        title: '智能音箱设计',
        category: 'product',
        tags: ['产品设计', '智能家居'],
        desc: '面向年轻家庭的智能音箱产品设计，融合科技感与家居美学。',
        icon: '🔊',
        period: '4周',
        role: '产品设计（独立完成）',
        tools: 'Rhino, Keyshot, Photoshop',
        detail: '本项目以"科技融入生活"为理念，设计一款适合年轻家庭的智能音箱。外观采用简约圆润的造型语言，能够自然融入各种家居环境。通过用户调研确定核心功能需求，在保证音质的前提下优化交互体验。',
        faces: ['🔊', '🎵', '🏠', '💡', '🎨', '✨']
    },
    {
        id: 2,
        title: '咖啡器具系列',
        category: 'product',
        tags: ['产品设计', '文创'],
        desc: '结合天津文化元素的咖啡器具系列设计，传统与现代的碰撞。',
        icon: '☕',
        period: '3周',
        role: '产品设计（独立完成）',
        tools: 'Rhino, Keyshot, Illustrator',
        detail: '以天津地域文化为灵感，设计一套具有地方特色的咖啡器具。将传统纹样与现代简约造型相结合，让日常用品也能承载文化记忆。系列包含手冲壶、滤杯、分享壶等单品。',
        faces: ['☕', '🏛️', '🎭', '📜', '🎨', '✨']
    },
    {
        id: 3,
        title: '健身APP界面设计',
        category: 'ui',
        tags: ['UI设计', '移动端'],
        desc: '一款专注于家庭健身的移动端应用界面设计，简洁易用。',
        icon: '💪',
        period: '2周',
        role: 'UI/UX设计（独立完成）',
        tools: 'Figma, Photoshop',
        detail: '针对居家健身人群设计的一款健身APP，提供个性化训练计划、动作指导、数据追踪等功能。界面设计遵循极简风格，降低用户认知负担，让运动变得更简单。',
        faces: ['💪', '📱', '🏃', '📊', '❤️', '✨']
    },
    {
        id: 4,
        title: '音乐播放器UI',
        category: 'ui',
        tags: ['UI设计', '动效'],
        desc: '沉浸式音乐播放器界面设计，带有丰富的微交互动效。',
        icon: '🎵',
        period: '1周',
        role: 'UI设计 + 动效设计',
        tools: 'Figma, After Effects',
        detail: '一款主打沉浸式体验的音乐播放器界面设计。深色主题配合渐变色彩，营造星空般的视觉氛围。丰富的微交互动效让音乐播放变得更有仪式感。',
        faces: ['🎵', '🎧', '🎶', '🎤', '🎸', '✨']
    },
    {
        id: 5,
        title: '智能手表交互',
        category: 'interaction',
        tags: ['交互设计', '可穿戴'],
        desc: '智能手表的通知系统交互设计，提升信息获取效率。',
        icon: '⌚',
        period: '3周',
        role: '交互设计（独立完成）',
        tools: 'Figma, Principle',
        detail: '针对智能手表屏幕小、交互场景特殊的特点，重新设计通知系统的交互方式。通过手势操作和智能排序，让用户在小屏幕上也能高效处理信息。',
        faces: ['⌚', '💬', '📩', '👆', '🔔', '✨']
    },
    {
        id: 6,
        title: '读书APP交互流程',
        category: 'interaction',
        tags: ['交互设计', '用户体验'],
        desc: '读书类APP的核心阅读体验交互流程设计与优化。',
        icon: '📚',
        period: '2周',
        role: '交互设计（独立完成）',
        tools: 'Figma, Axure',
        detail: '深入研究用户阅读行为，优化阅读页面的交互体验。包括翻页方式、字体调节、笔记功能、书架管理等核心流程的交互设计，让阅读更流畅自然。',
        faces: ['📚', '📖', '✏️', '🔖', '📑', '✨']
    },
    {
        id: 7,
        title: '产品速写练习',
        category: 'sketch',
        tags: ['手绘', '产品'],
        desc: '日常产品速写练习，记录灵感，训练造型能力。',
        icon: '✏️',
        period: '持续进行',
        role: '手绘练习',
        tools: '马克笔, 针管笔',
        detail: '坚持每日手绘练习，通过速写的方式记录生活中的产品形态，训练快速表达设计想法的能力。从单线勾勒到马克笔上色，逐步提升手绘表达水平。',
        faces: ['✏️', '📒', '🖊️', '🎨', '📐', '✨']
    },
    {
        id: 8,
        title: '概念设计草图',
        category: 'sketch',
        tags: ['手绘', '概念'],
        desc: '未来交通工具概念设计草图，探索设计可能性。',
        icon: '🚗',
        period: '1周',
        role: '概念设计',
        tools: '数位板, Photoshop',
        detail: '以未来城市出行为主题的概念设计草图。探索自动驾驶时代汽车内饰的可能性，以及个人出行工具的新形态。大胆的创意配合快速的草图表达。',
        faces: ['🚗', '🛸', '🚀', '🌆', '💡', '✨']
    }
];

const certificatesData = [
    {
        name: '全国大学生工业设计大赛 优秀奖',
        issuer: '中国工业设计协会',
        date: '2025.06',
        icon: '🏆',
        desc: '参赛作品从全国数千份作品中脱颖而出，获得优秀奖。'
    },
    {
        name: '天津市高校设计联展 入围奖',
        issuer: '天津市美术家协会',
        date: '2025.04',
        icon: '🎨',
        desc: '作品入选天津市高校设计联展，与各高校优秀作品同台展示。'
    },
    {
        name: '校级一等奖学金',
        issuer: '天津仁爱学院',
        date: '2024.12',
        icon: '📜',
        desc: '学业成绩优异，综合测评名列前茅，获得校级一等奖学金。'
    },
    {
        name: '创新创业大赛 三等奖',
        issuer: '天津仁爱学院',
        date: '2025.05',
        icon: '💡',
        desc: '以创新产品设计项目参加创新创业大赛，获得三等奖。'
    },
    {
        name: '英语四级证书',
        issuer: '教育部考试中心',
        date: '2024.06',
        icon: '🔤',
        desc: '大学英语四级考试合格。'
    },
    {
        name: '计算机二级证书',
        issuer: '教育部考试中心',
        date: '2024.09',
        icon: '💻',
        desc: '全国计算机二级考试合格。'
    }
];

const gamesData = [
    {
        name: '原神',
        platform: 'PC / 移动端',
        status: '正在玩',
        desc: '开放世界冒险游戏，喜欢探索提瓦特大陆的每一个角落，感受不同地区的文化与风景。',
        icon: '⚔️',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        name: '塞尔达传说',
        platform: 'Switch',
        status: '已通关',
        desc: '旷野之息和王国之泪都玩了上百小时，任天堂的游戏设计哲学让我受益匪浅。',
        icon: '🗡️',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    {
        name: '星穹铁道',
        platform: 'PC / 移动端',
        status: '正在玩',
        desc: '回合制策略RPG，喜欢游戏中的世界观设定和角色故事，剧情表现力很棒。',
        icon: '🚂',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        name: '胡闹厨房',
        platform: 'PC / Switch',
        status: '休闲玩',
        desc: '和朋友一起玩的欢乐游戏，虽然经常手忙脚乱，但每次都笑得很开心。',
        icon: '🍳',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        name: '动物森友会',
        platform: 'Switch',
        status: '偶尔回归',
        desc: '治愈系游戏，在自己的小岛上种花钓鱼，享受慢节奏的生活。',
        icon: '🏝️',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
        name: 'Journey',
        platform: 'PC / PS',
        status: '神作推荐',
        desc: '一款关于相遇与离别的游戏，艺术设计和游戏体验的完美结合，强烈推荐。',
        icon: '🏜️',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
];

const photosData = [
    { caption: '校园黄昏', icon: '🌅', height: 200 },
    { caption: '街角咖啡馆', icon: '☕', height: 280 },
    { caption: '城市夜景', icon: '🌃', height: 220 },
    { caption: '海边日出', icon: '🌊', height: 260 },
    { caption: '植物特写', icon: '🌿', height: 180 },
    { caption: '雨后街道', icon: '🌧️', height: 240 },
    { caption: '天空云彩', icon: '☁️', height: 200 },
    { caption: '猫咪日常', icon: '🐱', height: 260 },
    { caption: '建筑光影', icon: '🏢', height: 220 },
    { caption: '美食记录', icon: '🍜', height: 180 },
    { caption: '花开花落', icon: '🌸', height: 240 },
    { caption: '图书馆一角', icon: '📚', height: 200 }
];

// ===== 初始化函数 =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initWorksGrid();
    initCertificatesWall();
    initGamesGrid();
    initPhotosMasonry();
    initScrollAnimations();
    initBackToTop();
    initTiltCards();
    initCylinder();
});

// ===== 主题切换 =====
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('blog-theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // 添加过渡效果
        document.body.style.transition = 'background-color 0.8s ease, color 0.5s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('blog-theme', newTheme);
    });
}

// ===== 导航栏 =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navProgress = document.getElementById('navProgress');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    // 滚动时更新导航进度和活动链接
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        navProgress.style.width = progress + '%';

        // 更新活动导航链接
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 移动端菜单切换
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// ===== 作品展示 =====
function initWorksGrid() {
    const worksGrid = document.getElementById('worksGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    renderWorks('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWorks(filter);
        });
    });

    function renderWorks(filter) {
        worksGrid.innerHTML = '';
        const filtered = filter === 'all' 
            ? worksData 
            : worksData.filter(w => w.category === filter);

        filtered.forEach((work, index) => {
            const card = document.createElement('div');
            card.className = 'work-card tilt-card';
            card.style.transitionDelay = (index * 0.1) + 's';
            card.innerHTML = `
                <div class="work-cover">${work.icon}</div>
                <div class="work-info-card">
                    <h3 class="work-title-card">${work.title}</h3>
                    <div class="work-tags">
                        ${work.tags.map(tag => `<span class="work-tag">${tag}</span>`).join('')}
                    </div>
                    <p class="work-desc-card">${work.desc}</p>
                </div>
            `;
            card.addEventListener('click', () => openWorkModal(work));
            worksGrid.appendChild(card);
        });

        // 触发滚动动画
        setTimeout(() => {
            const cards = worksGrid.querySelectorAll('.work-card');
            cards.forEach(card => card.classList.add('visible'));
        }, 50);
    }
}

// ===== 作品详情弹层 =====
function openWorkModal(work) {
    const modal = document.getElementById('workModal');
    document.getElementById('workModalTitle').textContent = work.title;
    document.getElementById('workModalTags').innerHTML = work.tags.map(t => 
        `<span class="work-tag">${t}</span>`
    ).join('');
    document.getElementById('workModalDesc').textContent = work.detail;
    document.getElementById('workModalPeriod').textContent = work.period;
    document.getElementById('workModalRole').textContent = work.role;
    document.getElementById('workModalTools').textContent = work.tools;

    // 更新圆筒内容
    if (window.cylinderInstance) {
        window.cylinderInstance.setFaceContent(work.faces);
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeWorkModal() {
    const modal = document.getElementById('workModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ===== 证书墙 =====
function initCertificatesWall() {
    const wall = document.getElementById('certificatesWall');

    certificatesData.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'certificate-card';
        card.style.transitionDelay = (index * 0.1) + 's';
        card.innerHTML = `
            <div class="certificate-inner">
                <div class="certificate-front">
                    <div class="certificate-icon">${cert.icon}</div>
                    <div class="certificate-name">${cert.name}</div>
                    <div class="certificate-issuer">${cert.issuer}</div>
                </div>
                <div class="certificate-back">
                    <div class="certificate-name">${cert.name}</div>
                    <div class="certificate-date">${cert.date}</div>
                    <div class="certificate-desc">${cert.desc}</div>
                </div>
            </div>
        `;
        wall.appendChild(card);
    });
}

// ===== 游戏分享 =====
function initGamesGrid() {
    const grid = document.getElementById('gamesGrid');

    gamesData.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card tilt-card';
        card.style.transitionDelay = (index * 0.1) + 's';
        card.innerHTML = `
            <div class="game-cover" style="background: ${game.gradient}">
                <span>${game.icon}</span>
                <span class="game-platform">${game.platform}</span>
            </div>
            <div class="game-info">
                <h3 class="game-name">${game.name}</h3>
                <span class="game-status">${game.status}</span>
                <p class="game-desc">${game.desc}</p>
                <button class="game-btn">了解更多</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ===== 拍摄分享 =====
function initPhotosMasonry() {
    const masonry = document.getElementById('photosMasonry');

    photosData.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.style.transitionDelay = (index * 0.05) + 's';
        item.innerHTML = `
            <div class="photo-placeholder" style="height: ${photo.height}px">
                <span>${photo.icon}</span>
            </div>
            <div class="photo-overlay">
                <span class="photo-caption">${photo.caption}</span>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        masonry.appendChild(item);
    });
}

// ===== 照片灯箱 =====
let currentPhotoIndex = 0;

function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightbox();
    document.getElementById('lightbox').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
    document.body.style.overflow = '';
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
    updateLightbox();
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
    updateLightbox();
}

function updateLightbox() {
    const photo = photosData[currentPhotoIndex];
    document.getElementById('lightboxImage').innerHTML = `<span style="font-size: 96px">${photo.icon}</span>`;
    document.getElementById('lightboxCaption').textContent = photo.caption;
}

// 键盘控制灯箱
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('show')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
});

// ===== 经历详情 =====
function showJourneyDetail(index) {
    const data = journeyData[index];
    const modal = document.getElementById('journeyModal');
    
    document.getElementById('journeyModalDate').textContent = data.date;
    document.getElementById('journeyModalTitle').textContent = data.title;
    document.getElementById('journeyModalBody').innerHTML = data.detail;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeJourneyModal() {
    document.getElementById('journeyModal').classList.remove('show');
    document.body.style.overflow = '';
}

// ===== 微信二维码 =====
function showWechatQr(e) {
    e.preventDefault();
    document.getElementById('qrModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeQrModal() {
    document.getElementById('qrModal').classList.remove('show');
    document.body.style.overflow = '';
}

// ===== 滚动动画 =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 时间轴节点
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                // 作品卡片
                if (entry.target.classList.contains('work-card')) {
                    entry.target.classList.add('visible');
                }
                // 证书卡片
                if (entry.target.classList.contains('certificate-card')) {
                    entry.target.classList.add('visible');
                }
                // 游戏卡片
                if (entry.target.classList.contains('game-card')) {
                    entry.target.classList.add('visible');
                }
                // 照片
                if (entry.target.classList.contains('photo-item')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.timeline-item, .work-card, .certificate-card, .game-card, .photo-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== 回到顶部 =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 3D倾斜卡片效果 =====
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== ESC 关闭所有弹层 =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWorkModal();
        closeJourneyModal();
        closeQrModal();
    }
});
