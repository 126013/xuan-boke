import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { playlist } from '../data/site.js'

export default function LyricBar() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % playlist.length), 6000)
    return () => clearInterval(t)
  }, [])

  const song = playlist[i]

  return (
    <div className="glass relative flex h-16 items-center justify-center overflow-hidden rounded-2xl shadow-glass">
      <span className="absolute left-6 text-base text-primary">♪</span>
      <AnimatePresence mode="wait">
        <motion.p
          key={song.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="px-12 text-center text-sm font-medium text-ink-600 dark:text-ink-400"
        >
          {song.lyric} <span className="ml-2 text-xs text-ink-400">—— 《{song.title}》</span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
