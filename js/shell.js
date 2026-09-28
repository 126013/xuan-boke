/* ===== 四边悬浮导航外壳（v8.0） =====
 * 圆角悬浮造型 + 淡蓝荧光毛玻璃。
 * 只负责新增的顶栏 / 左右圆形按钮 / 底部圆点的交互，
 * 不改动原有内容逻辑：主题切换仍复用原有的 #themeToggle。
 */
(function () {
    var railBtns = document.querySelectorAll('.rail-btn[data-target]');
    var dots = document.querySelectorAll('.shell-dot[data-target]');
    var sections = document.querySelectorAll('section[id]');
    var progressText = document.getElementById('shellProgressText');

    // 同步左侧栏高亮 + 底部圆点 + 进度
    function syncShellState() {
        var scrollTop = window.scrollY || window.pageYOffset || 0;
        var current = 'home';

        sections.forEach(function (section) {
            if (scrollTop >= section.offsetTop - 160) {
                current = section.id;
            }
        });

        railBtns.forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-target') === current);
        });

        dots.forEach(function (dot) {
            dot.classList.toggle('active', dot.getAttribute('data-target') === current);
        });

        if (progressText) {
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
            progressText.textContent = Math.min(100, Math.max(0, percent)) + '%';
        }
    }

    window.addEventListener('scroll', syncShellState, { passive: true });
    window.addEventListener('resize', function () {
        syncShellState();
        updateNotchClip();
        updateDockClip();
    });
    syncShellState();

    // ===== 左下角停靠坞轮廓 =====
    // 玻璃搁板占屏幕左下角：顶部与右侧内凹圆弧过渡进屏幕边缘，
    // 右上角外凸圆角；用 clip-path 裁切，毛玻璃随轮廓生效
    function updateDockClip() {
        var dock = document.querySelector('.shell-dock');
        if (!dock) return;

        if (window.innerWidth <= 960) {
            dock.style.clipPath = 'none';
            dock.style.webkitClipPath = 'none';
            return;
        }

        var W = dock.offsetWidth || 136;
        var H = dock.offsetHeight || 316;
        var f = 26;     // 左上内凹过渡半径（左边缘 → 搁板顶边）
        var f2 = 26;    // 右下内凹过渡半径（搁板右边 → 屏幕底边）
        // 最大圆角：整条右侧用一段椭圆大弧（rx=W-f, ry=H-f-f2），
        // 从顶边一直鼓到右下内凹弧，无任何直边段
        var rx = W - f;
        var ry = H - f - f2;

        var p =
            'M0,' + H +
            ' L0,' + f +
            ' A' + f + ',' + f + ' 0 0 1 ' + f + ',0' +
            ' A' + rx + ',' + ry + ' 0 0 1 ' + W + ',' + (H - f2) +
            ' A' + f2 + ',' + f2 + ' 0 0 1 ' + (W - f2) + ',' + H +
            ' L0,' + H + ' Z';

        dock.style.clipPath = 'path("' + p + '")';
        dock.style.webkitClipPath = 'path("' + p + '")';
    }

    updateDockClip();
    window.addEventListener('load', function () {
        updateNotchClip();
        updateDockClip();
    });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
            updateNotchClip();
            updateDockClip();
        });
    }
    setTimeout(updateDockClip, 300);
    setTimeout(updateDockClip, 1200);

    // ===== 顶部刘海（Notch）轮廓 =====
    // 通栏玻璃条 + 中间下挂刘海，两侧内凹圆角过渡；
    // 用 clip-path 裁切，毛玻璃随轮廓生效（无需实底色）
    function updateNotchClip() {
        var bar = document.querySelector('.shell-top');
        if (!bar) return;

        if (window.innerWidth <= 960) {
            bar.style.clipPath = 'none';
            bar.style.webkitClipPath = 'none';
            return;
        }

        var menu = bar.querySelector('.nav-menu');
        var W = bar.offsetWidth || window.innerWidth;
        var stripH = 44;   // 通栏条高度
        var H = 88;        // 含刘海的总高
        var R = 26;        // 内凹过渡半径
        var R2 = 22;       // 刘海底部圆角半径

        var menuW = menu ? menu.offsetWidth : 700;
        var notchW = Math.min(W - 200, menuW + 56);
        notchW = Math.max(320, notchW);
        var nL = (W - notchW) / 2;
        var nR = nL + notchW;

        var p =
            'M0,0 H' + W + ' V' + stripH +
            ' H' + (nR + R) +
            ' A' + R + ',' + R + ' 0 0 0 ' + nR + ',' + (stripH + R) +
            ' L' + nR + ',' + (H - R2) +
            ' A' + R2 + ',' + R2 + ' 0 0 1 ' + (nR - R2) + ',' + H +
            ' L' + (nL + R2) + ',' + H +
            ' A' + R2 + ',' + R2 + ' 0 0 1 ' + nL + ',' + (H - R2) +
            ' L' + nL + ',' + (stripH + R) +
            ' A' + R + ',' + R + ' 0 0 0 ' + (nL - R) + ',' + stripH +
            ' H0 Z';

        bar.style.clipPath = 'path("' + p + '")';
        bar.style.webkitClipPath = 'path("' + p + '")';
    }

    updateNotchClip();
    setTimeout(updateNotchClip, 1200);

    // 主题图标同步（右侧栏圆钮）
    function syncThemeIcons() {
        var isLight = document.documentElement.getAttribute('data-theme') === 'light';
        var icons = document.querySelectorAll('.shell-theme-icon');
        icons.forEach(function (icon) {
            icon.textContent = isLight ? '☀️' : '🌙';
        });
    }

    // 复用原有的主题切换按钮，保证主题逻辑只有一份
    document.querySelectorAll('[data-action="theme"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var original = document.getElementById('themeToggle');
            if (original) original.click();
        });
    });

    // 监听主题属性变化，同步图标
    if (window.MutationObserver) {
        new MutationObserver(syncThemeIcons).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    syncThemeIcons();

    // 右侧栏：音乐播放器
    var musicBtn = document.querySelector('[data-action="music"]');
    if (musicBtn) {
        musicBtn.addEventListener('click', function () {
            var ball = document.getElementById('musicBall');
            if (ball) ball.click();
        });
    }

    // 右下角大圆钮：回到顶部
    var topBtn = document.querySelector('[data-action="top"]');
    if (topBtn) {
        topBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
