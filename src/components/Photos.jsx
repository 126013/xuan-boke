import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section.jsx'
import { photos } from '../data/site.js'

export default function Photos() {
  const [index, setIndex] = useState(null)
  const total = photos.length

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => {
    setIndex((i) => (i === null ? null : (i - 1 + total) % total))
  }, [total])
  const next = useCallback(() => {
    setIndex((i) => (i === null ? null : (i + 1) % total))
  }, [total])

  // 键盘：ESC 关闭、左右切换
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

  // 移动端手势：左右滑动切换
  const start = { x: 0, y: 0 }
  const onTouchStart = (e) => {
    start.x = e.touches[0].clientX
    start.y = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - start.x
    const dy = e.changedTouches[0].clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)()
  }

  return (
    <Section id="photos" title="拍摄分享" desc="日常随手拍的一些照片，点击进入灯箱（示例占位图，待替换为真实照片）。">
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
        {photos.map((p, i) => (
          <motion.figure
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            onClick={() => setIndex(i)}
            className="glass mb-4 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl shadow-glass transition hover:-translate-y-1"
          >
            <div className={`${p.h} bg-gradient-to-br ${p.cover}`} />
            <figcaption className="p-3 text-sm">{p.title}</figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="modal-backdrop fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              key={index}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className={`h-[60vh] rounded-3xl bg-gradient-to-br ${photos[index].cover}`} />
              <div className="mt-4 flex items-center justify-between text-sm text-white/90">
                <span>
                  {photos[index].title} · {index + 1} / {total}
                </span>
                <span className="flex items-center gap-2">
                  <button onClick={prev} className="glass rounded-full px-4 py-2">
                    ← 上一张
                  </button>
                  <button onClick={next} className="glass rounded-full px-4 py-2">
                    下一张 →
                  </button>
                  <button onClick={close} className="glass rounded-full px-4 py-2">
                    关闭 ESC
                  </button>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
