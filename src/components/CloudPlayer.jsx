import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { playlist } from '../data/site.js'

function toSeconds(str) {
  const [m, s] = str.split(':').map(Number)
  return m * 60 + s
}

function fmt(sec) {
  sec = Math.max(0, Math.floor(sec))
  return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
}

export default function CloudPlayer() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const timer = useRef(null)
  const song = playlist[index]
  const total = toSeconds(song.duration)

  // 模拟播放进度（真实音频可在 playlist 中接入 src 后替换此逻辑）
  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setElapsed((e) => {
          if (e + 1 >= total) {
            setIndex((i) => (i + 1) % playlist.length)
            return 0
          }
          return e + 1
        })
      }, 1000)
    }
    return () => clearInterval(timer.current)
  }, [playing, total])

  const switchSong = (fn) => {
    setPlaying(false)
    setElapsed(0)
    setIndex((i) => (i + fn + playlist.length) % playlist.length)
    setTimeout(() => setPlaying(true), 150)
  }

  const pct = total ? (elapsed / total) * 100 : 0

  return (
    <div className="glass relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-8 shadow-glass">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-ink-400">
          Cloud Music
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">
          云音乐 · {index + 1}/{playlist.length}
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* 旋转唱片 */}
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: 8, ease: 'linear' } : { duration: 0.4 }}
          className={`relative h-28 w-28 shrink-0 rounded-full bg-gradient-to-tr ${song.cover} shadow-glow`}
        >
          <div className="absolute inset-2 rounded-full border border-white/30" />
          <div className="absolute inset-0 m-auto h-9 w-9 rounded-full bg-slate-900/70 backdrop-blur dark:bg-black/50" />
          <div className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white" />
        </motion.div>

        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="truncate text-xl font-bold text-fg">
                {song.title}
              </div>
              <div className="mt-1 truncate text-sm text-ink-400">{song.artist}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 进度条 */}
      <div>
        <div
          className="group h-2 w-full cursor-pointer rounded-full bg-black/10 dark:bg-white/10"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            setElapsed(Math.round(ratio * total))
          }}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2.5 flex justify-between text-[11px] font-bold text-ink-400">
          <span>{fmt(elapsed)}</span>
          <span>{song.duration}</span>
        </div>
      </div>

      {/* 控制区 */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-ink-400">
          <span className="text-xs">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-black/10 accent-primary dark:bg-white/10"
            aria-label="音量"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => switchSong(-1)}
            aria-label="上一首"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white/50 transition hover:text-primary dark:border-white/10 dark:bg-white/5"
          >
            ⏮
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? '暂停' : '播放'}
            className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-primary to-accent text-2xl text-white shadow-glow transition hover:scale-105"
          >
            {playing ? '⏸' : '▶'}
          </button>
          <button
            onClick={() => switchSong(1)}
            aria-label="下一首"
            className="grid h-10 w-10 place-items-center rounded-full border border-black/5 bg-white/50 transition hover:text-primary dark:border-white/10 dark:bg-white/5"
          >
            ⏭
          </button>
        </div>
        <a
          href="#/music"
          className="rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold text-primary transition hover:bg-primary/20"
        >
          音乐站 →
        </a>
      </div>
    </div>
  )
}
