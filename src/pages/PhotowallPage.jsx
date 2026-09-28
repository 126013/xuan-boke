import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { photos } from '../data/site.js'

export default function PhotowallPage() {
  const [index, setIndex] = useState(null)
  const total = photos.length

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + total) % total)), [total])
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % total)), [total])

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, close, prev, next])

  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="📷" title="照片墙" subtitle="瀑布流相册 · 点击查看大图（示例占位，可替换为真实照片）" />

      <div className="columns-2 gap-6 md:columns-3 lg:columns-4 [&>*]:mb-6">
        {photos.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            onClick={() => setIndex(i)}
            className={`group relative block w-full overflow-hidden rounded-2xl ${p.h}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${p.cover} transition-transform duration-700 group-hover:scale-110`} />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />
            <span className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1 text-xs font-bold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              {p.title}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="modal-backdrop fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <div className={`aspect-[4/3] w-full rounded-3xl bg-gradient-to-tr ${photos[index].cover} shadow-glow`} />
              <div className="mt-4 flex items-center justify-between text-white">
                <button onClick={prev} className="rounded-full border border-white/25 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/10">
                  ‹ 上一张
                </button>
                <span className="font-bold">
                  {photos[index].title} · {index + 1}/{total}
                </span>
                <button onClick={next} className="rounded-full border border-white/25 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/10">
                  下一张 ›
                </button>
              </div>
              <button
                onClick={close}
                className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:scale-105"
                aria-label="关闭"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
