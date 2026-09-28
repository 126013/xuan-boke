import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { posts } from '../data/site.js'
import { useToast } from './ToastProvider.jsx'

export default function SearchBar() {
  const [kw, setKw] = useState('')
  const [focus, setFocus] = useState(false)
  const boxRef = useRef(null)
  const showToast = useToast()

  const results = useMemo(() => {
    const k = kw.trim().toLowerCase()
    if (!k) return []
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(k) ||
        p.description.toLowerCase().includes(k) ||
        p.tags.some((t) => t.toLowerCase().includes(k))
    )
  }, [kw])

  return (
    <div ref={boxRef} className="relative z-20 w-full">
      <div className="glass flex items-center gap-4 rounded-2xl px-6 py-4 shadow-glass">
        <span className="text-ink-400">🔍</span>
        <input
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 180)}
          placeholder="搜索标题、描述或标签..."
          className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-ink-400"
        />
        {kw && (
          <button
            onClick={() => setKw('')}
            className="text-xs text-ink-400 transition hover:text-primary"
          >
            清空
          </button>
        )}
      </div>

      <AnimatePresence>
        {focus && kw.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass absolute inset-x-0 top-full mt-3 max-h-80 overflow-auto rounded-2xl p-3 shadow-glass"
          >
            {results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-ink-400">
                没有找到「{kw}」相关的内容
              </div>
            )}
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  showToast(`《${p.title}》文章详情将在后续版本接入`)
                  setKw('')
                }}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-black/5 dark:hover:bg-white/10"
              >
                <div className="text-sm font-bold text-fg">{p.title}</div>
                <div className="mt-0.5 line-clamp-1 text-xs text-ink-400">{p.description}</div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
