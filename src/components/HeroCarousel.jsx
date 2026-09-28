import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { banners } from '../data/site.js'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.02 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 1.02 })
}

export default function HeroCarousel() {
  const [[idx, dir], setIdx] = useState([0, 1])
  const [pause, setPause] = useState(false)
  const intervalRef = useRef(null)

  const total = banners.length
  const slide = idx >= 0 ? ((idx % total) + total) % total : 0

  const next = () => setIdx(([i]) => [i + 1, 1])
  const prev = () => setIdx(([i]) => [i - 1, -1])

  useEffect(() => {
    if (pause) return
    intervalRef.current = setInterval(next, 5000)
    return () => clearInterval(intervalRef.current)
  }, [pause])

  const current = banners[slide]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass relative w-full overflow-hidden rounded-3xl shadow-glass"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      {/* 高度约占页面视口 1/3，宽度铺满容器（与下方所有模块两端对齐） */}
      <div className="relative h-[33vh] min-h-[220px] w-full sm:min-h-[260px]">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={current.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.55, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <a
              href={current.link || '#/'}
              className="block h-full w-full"
              title={current.title}
            >
              <img
                src={current.image}
                alt={current.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </a>

            {(current.title || current.subtitle) && (
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-9">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="text-xl font-black text-white drop-shadow-lg sm:text-2xl md:text-3xl"
                >
                  {current.title}
                </motion.h2>
                {current.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="mt-1 max-w-xl text-sm font-bold text-white/90 drop-shadow-md sm:text-base"
                  >
                    {current.subtitle}
                  </motion.p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 左右箭头 */}
        <button
          onClick={prev}
          aria-label="上一张"
          className="absolute top-1/2 left-2 sm:left-4 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white/90 backdrop-blur transition hover:scale-110 hover:bg-black/50 sm:h-10 sm:w-10"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="下一张"
          className="absolute top-1/2 right-2 sm:right-4 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-white/90 backdrop-blur transition hover:scale-110 hover:bg-black/50 sm:h-10 sm:w-10"
        >
          ›
        </button>

        {/* 指示点 */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4">
          {banners.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setIdx(([old]) => [i, i > old ? 1 : -1])}
              aria-label={`切换到 ${b.title || i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slide ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
