// ===== 音乐播放器系统 =====
class MusicPlayer {
    constructor() {
        this.audio = null;
        this.playlist = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isMuted = false;
        this.volume = 0.7;
        this.isPanelOpen = false;
        this.musicStarted = false;

        this.initElements();
        this.initPlaylist();
        this.bindEvents();
        this.checkMusicState();
    }

    initElements() {
        this.musicBall = document.getElementById('musicBall');
        this.musicPanel = document.getElementById('musicPanel');
        this.musicClose = document.getElementById('musicClose');
        this.musicPlay = document.getElementById('musicPlay');
        this.musicPrev = document.getElementById('musicPrev');
        this.musicNext = document.getElementById('musicNext');
        this.musicVolume = document.getElementById('musicVolume');
        this.musicProgressBar = document.getElementById('musicProgressBar');
        this.musicProgressFill = document.getElementById('musicProgressFill');
        this.musicCurrentTime = document.getElementById('musicCurrentTime');
        this.musicTotalTime = document.getElementById('musicTotalTime');
        this.musicTitle = document.getElementById('musicTitle');
        this.musicArtist = document.getElementById('musicArtist');
        this.musicPlaylist = document.getElementById('musicPlaylist');
        this.musicIntro = document.getElementById('musicIntro');
        this.startMusicBtn = document.getElementById('startMusicBtn');
    }

    initPlaylist() {
        // 示例播放列表 - 用户可自行替换为真实音乐文件
        this.playlist = [
            {
                title: '星际漫游',
                artist: '示例音乐 1',
                url: '', // 替换为真实音乐URL
                duration: '3:45'
            },
            {
                title: '量子波动',
                artist: '示例音乐 2',
                url: '',
                duration: '4:20'
            },
            {
                title: '星云漫步',
                artist: '示例音乐 3',
                url: '',
                duration: '3:58'
            },
            {
                title: '晨光庭院',
                artist: '示例音乐 4',
                url: '',
                duration: '4:12'
            }
        ];

        this.renderPlaylist();
        this.updateNowPlaying();
    }

    renderPlaylist() {
        this.musicPlaylist.innerHTML = '';
        this.playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = index === this.currentIndex ? 'active' : '';
            li.innerHTML = `
                <span>${song.title}</span>
                <span>${song.duration}</span>
            `;
            li.addEventListener('click', () => {
                this.playTrack(index);
            });
            this.musicPlaylist.appendChild(li);
        });
    }

    updateNowPlaying() {
        const song = this.playlist[this.currentIndex];
        this.musicTitle.textContent = song.title;
        this.musicArtist.textContent = song.artist;
        this.musicTotalTime.textContent = song.duration;
    }

    bindEvents() {
        // 悬浮球点击
        this.musicBall.addEventListener('click', () => {
            if (!this.musicStarted) {
                this.showIntro();
            } else {
                this.togglePanel();
            }
        });

        // 关闭面板
        this.musicClose.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closePanel();
        });

        // 播放/暂停
        this.musicPlay.addEventListener('click', () => {
            this.togglePlay();
        });

        // 上一首
        this.musicPrev.addEventListener('click', () => {
            this.prevTrack();
        });

        // 下一首
        this.musicNext.addEventListener('click', () => {
            this.nextTrack();
        });

        // 音量控制
        this.musicVolume.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        // 进度条点击
        this.musicProgressBar.addEventListener('click', (e) => {
            this.seek(e);
        });

        // 开启音乐引导
        this.startMusicBtn.addEventListener('click', () => {
            this.startMusic();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                if (this.musicStarted) {
                    this.togglePlay();
                }
            }
        });
    }

    checkMusicState() {
        const wasStarted = localStorage.getItem('musicStarted');
        if (wasStarted === 'true') {
            this.musicStarted = true;
            // 尝试自动播放（可能被浏览器阻止）
            this.initAudio();
            this.audio.play().catch(() => {
                // 自动播放被阻止，显示暂停状态
                this.isPlaying = false;
                this.updatePlayButton();
            });
        }
    }

    showIntro() {
        this.musicIntro.classList.add('show');
    }

    hideIntro() {
        this.musicIntro.classList.remove('show');
    }

    startMusic() {
        this.musicStarted = true;
        localStorage.setItem('musicStarted', 'true');
        this.hideIntro();
        this.initAudio();
        this.play();
        this.openPanel();
    }

    initAudio() {
        if (!this.audio) {
            this.audio = new Audio();
            this.audio.volume = this.volume;
            
            this.audio.addEventListener('timeupdate', () => {
                this.updateProgress();
            });

            this.audio.addEventListener('ended', () => {
                this.nextTrack();
            });

            this.audio.addEventListener('loadedmetadata', () => {
                this.musicTotalTime.textContent = this.formatTime(this.audio.duration);
            });

            this.audio.addEventListener('play', () => {
                this.isPlaying = true;
                this.updatePlayButton();
                this.musicBall.classList.add('playing');
            });

            this.audio.addEventListener('pause', () => {
                this.isPlaying = false;
                this.updatePlayButton();
                this.musicBall.classList.remove('playing');
            });
        }

        this.loadTrack(this.currentIndex);
    }

    loadTrack(index) {
        const song = this.playlist[index];
        if (song.url && this.audio) {
            this.audio.src = song.url;
        }
        this.currentIndex = index;
        this.updateNowPlaying();
        this.renderPlaylist();
    }

    play() {
        if (!this.audio) {
            this.initAudio();
        }
        
        const song = this.playlist[this.currentIndex];
        if (song.url) {
            this.audio.play().catch(err => {
                console.log('播放失败:', err);
            });
        } else {
            // 没有真实音乐文件时的模拟播放
            this.simulatePlay();
        }
    }

    simulatePlay() {
        this.isPlaying = true;
        this.updatePlayButton();
        this.musicBall.classList.add('playing');
        
        // 模拟进度
        if (this.simulatedInterval) {
            clearInterval(this.simulatedInterval);
        }
        
        this.simulatedTime = this.simulatedTime || 0;
        this.simulatedInterval = setInterval(() => {
            if (this.isPlaying) {
                this.simulatedTime += 1;
                const totalSeconds = this.parseDuration(this.playlist[this.currentIndex].duration);
                const progress = (this.simulatedTime / totalSeconds) * 100;
                this.musicProgressFill.style.width = progress + '%';
                this.musicCurrentTime.textContent = this.formatTime(this.simulatedTime);
                
                if (this.simulatedTime >= totalSeconds) {
                    this.nextTrack();
                }
            }
        }, 1000);
    }

    pause() {
        if (this.audio && this.playlist[this.currentIndex].url) {
            this.audio.pause();
        } else {
            this.isPlaying = false;
            this.updatePlayButton();
            this.musicBall.classList.remove('playing');
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    playTrack(index) {
        this.simulatedTime = 0;
        this.loadTrack(index);
        this.play();
    }

    prevTrack() {
        this.simulatedTime = 0;
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0) {
            newIndex = this.playlist.length - 1;
        }
        this.playTrack(newIndex);
    }

    nextTrack() {
        this.simulatedTime = 0;
        let newIndex = this.currentIndex + 1;
        if (newIndex >= this.playlist.length) {
            newIndex = 0;
        }
        this.playTrack(newIndex);
    }

    setVolume(value) {
        this.volume = value;
        if (this.audio) {
            this.audio.volume = value;
        }
    }

    seek(e) {
        const rect = this.musicProgressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        
        if (this.audio && this.audio.duration) {
            this.audio.currentTime = percent * this.audio.duration;
        } else {
            // 模拟进度
            const totalSeconds = this.parseDuration(this.playlist[this.currentIndex].duration);
            this.simulatedTime = Math.floor(percent * totalSeconds);
            this.musicProgressFill.style.width = (percent * 100) + '%';
            this.musicCurrentTime.textContent = this.formatTime(this.simulatedTime);
        }
    }

    updateProgress() {
        if (this.audio && this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.musicProgressFill.style.width = progress + '%';
            this.musicCurrentTime.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updatePlayButton() {
        this.musicPlay.textContent = this.isPlaying ? '⏸' : '▶';
    }

    togglePanel() {
        if (this.isPanelOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        this.musicPanel.classList.add('open');
        this.isPanelOpen = true;
    }

    closePanel() {
        this.musicPanel.classList.remove('open');
        this.isPanelOpen = false;
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    parseDuration(durationStr) {
        const parts = durationStr.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    // 主题切换时切换播放列表
    switchThemePlaylist(isDark) {
        // 可根据主题切换不同风格的音乐
        // 这里保持同一列表作为示例
        this.renderPlaylist();
    }
}

// 初始化
let musicPlayer = null;

document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = new MusicPlayer();
    window.musicPlayer = musicPlayer;
});
