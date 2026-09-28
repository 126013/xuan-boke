import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { playlist } from '../data/site.js'
import { useToast } from '../components/ToastProvider.jsx'

export default function MusicPage() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const showToast = useToast()
  const song = playlist[current]

  const pick = (i) => {
    setCurrent(i)
    setPlaying(true)
  }

  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="🎧" title="音乐" subtitle="我的歌单 · 当前为模拟播放（示例占位）" />

      <div className="glass mb-10 flex flex-col items-center gap-8 rounded-3xl p-10 shadow-glass sm:flex-row">
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={playing ? { repeat: Infinity, duration: 8, ease: 'linear' } : { duration: 0.4 }}
          className={`relative h-32 w-32 shrink-0 rounded-full bg-gradient-to-tr ${song.cover} shadow-glow`}
        >
          <div className="absolute inset-3 rounded-full border border-white/30" />
          <div className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-slate-900/70 dark:bg-black/50" />
        </motion.div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-black text-fg">{song.title}</h2>
          <p className="mt-1 text-sm text-ink-400">{song.artist} · {song.duration}</p>
          <p className="mt-3 text-sm italic text-ink-600 dark:text-ink-400">「{song.lyric}」</p>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-4 inline-grid h-12 w-12 place-items-center rounded-full bg-gradient-to-tr from-primary to-accent text-xl text-white shadow-glow transition hover:scale-105"
            aria-label={playing ? '暂停' : '播放'}
          >
            {playing ? '⏸' : '▶'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {playlist.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            onClick={() => pick(i)}
            className={`glass flex w-full items-center gap-5 rounded-2xl p-5 text-left shadow-glass transition hover:scale-[1.01] ${
              i === current ? 'ring-1 ring-primary/50' : ''
            }`}
          >
            <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-tr ${s.cover}`} />
            <div className="min-w-0 flex-1">
              <div className={`font-bold ${i === current ? 'text-primary' : 'text-fg'}`}>
                {s.title}
              </div>
              <div className="text-xs text-ink-400">{s.artist}</div>
            </div>
            <span className="text-xs font-bold text-ink-400">{s.duration}</span>
          </motion.button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-ink-400">
        提示：当前播放为界面演示。接入真实音频时，把曲目文件地址填入
        <button
          className="mx-1 text-primary underline"
          onClick={() => showToast('数据文件：src/data/site.js → playlist')}
        >
          playlist
        </button>
        即可。
      </p>
    </div>
  )
}
