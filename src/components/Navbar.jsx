import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/site.js'

const links = [
  { name: '首页', href: '#/' },
  { name: '项目', href: '#/projects' },
  { name: '归档', href: '#/archive' },
  { name: '照片墙', href: '#/photowall' },
  { name: '音乐', href: '#/music' },
  { name: '说说', href: '#/moments' },
  { name: '杂谈', href: '#/chatter' },
  { name: '友链', href: '#/friends' },
  { name: '关于', href: '#/about' }
]

const themeOptions = [
  { key: 'dark', icon: '🌙', label: '深色' },
  { key: 'light', icon: '☀️', label: '浅色' },
  { key: 'system', icon: '💻', label: '跟随系统' }
]

export default function Navbar({ theme, themeMode, onToggleTheme, onSetTheme }) {
  const [showNav, setShowNav] = useState(true)
  const [open, setOpen] = useState(false)
  const [themeMenu, setThemeMenu] = useState(false)
  const [route, setRoute] = useState(window.location.hash || '#/')
  const lastY = useRef(0)
  const [progress, setProgress] = useState(0)
  const themeBoxRef = useRef(null)

  const mode = themeMode || theme
  const themeIcon = themeOptions.find((o) => o.key === mode)?.icon || '🌙'

  // 点击外部关闭主题菜单
  useEffect(() => {
    if (!themeMenu) return
    const onDown = (e) => {
      if (themeBoxRef.current && !themeBoxRef.current.contains(e.target)) setThemeMenu(false)
    }
    const onEsc = (e) => e.key === 'Escape' && setThemeMenu(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onEsc)
    }
  }, [themeMenu])

  // 下滑隐藏、上滑显示
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > lastY.current && y > 80) setShowNav(false)
      else setShowNav(true)
      lastY.current = y
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由同步（高亮当前菜单）
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const isActive = (href) => {
    const h = window.location.hash || '#/'
    if (href === '#/') return h === '#/' || h === '' || h === '#'
    return h.startsWith(href)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: showNav ? 0 : -110, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pointer-events-none fixed inset-x-0 top-8 z-50 flex justify-center px-2 sm:px-3"
      >
        <nav className="pointer-events-auto flex w-full items-center justify-between gap-2 rounded-full border border-black/5 bg-white/65 px-2 py-1.5 shadow-[0_8px_32px_rgb(var(--c-shadow)/0.14)] backdrop-blur-xl transition-colors sm:gap-4 sm:px-3 dark:border-white/10 dark:bg-ink-800/55">
          {/* Logo */}
          <a
            href="#/"
            className="shrink-0 rounded-full px-2 py-1 text-sm font-black tracking-tight text-fg transition hover:text-primary sm:px-3 sm:text-base"
            title={profile.siteTitle}
          >
            <span className="hidden sm:inline">{profile.siteTitle || profile.name}</span>
            <span className="sm:hidden">{profile.name}</span>
          </a>

          {/* 桌面菜单：胶囊内 Tab */}
          <div className="hidden flex-1 items-center justify-center gap-1 overflow-hidden lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  isActive(l.href)
                    ? 'bg-primary/15 text-primary shadow-[inset_0_1px_2px_rgb(var(--c-primary)/0.18)]'
                    : 'text-ink-600 hover:bg-black/5 hover:text-primary dark:text-ink-400 dark:hover:bg-white/10'
                }`}
              >
                {l.name}
              </a>
            ))}
          </div>

          {/* 右侧按钮 */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div ref={themeBoxRef} className="relative">
              <button
                onClick={() => setThemeMenu((v) => !v)}
                aria-label="主题设置"
                title={`当前：${themeOptions.find((o) => o.key === mode)?.label || '深色'}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-black/5 text-base transition hover:scale-110 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mode}
                    initial={{ y: -8, opacity: 0, rotate: -30 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 8, opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.25 }}
                  >
                    {themeIcon}
                  </motion.span>
                </AnimatePresence>
              </button>

              <AnimatePresence>
                {themeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-10 w-36 rounded-2xl border border-black/5 bg-white/85 p-1.5 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-ink-800/90"
                  >
                    {themeOptions.map((o) => (
                      <button
                        key={o.key}
                        onClick={() => {
                          if (onSetTheme) onSetTheme(o.key)
                          else onToggleTheme()
                          setThemeMenu(false)
                        }}
                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                          mode === o.key
                            ? 'bg-primary/15 text-primary'
                            : 'text-ink-600 hover:bg-black/5 dark:text-ink-400 dark:hover:bg-white/10'
                        }`}
                      >
                        <span>{o.icon}</span>
                        <span>{o.label}</span>
                        {mode === o.key && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="菜单"
              className="grid h-8 w-8 place-items-center rounded-full bg-black/5 text-base transition hover:scale-110 hover:bg-black/10 lg:hidden dark:bg-white/10 dark:hover:bg-white/15"
            >
              {open ? '✕' : '☰'}
            </button>
          </div>

          {/* 滚动进度条 */}
          <div className="absolute bottom-1 left-5 right-5 h-0.5 rounded-full bg-black/5 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </nav>
      </motion.header>

      {/* 移动端下拉菜单 */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-[4.5rem] z-50 grid grid-cols-3 gap-1 rounded-3xl border border-black/5 bg-white/80 p-3 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-ink-800/80 sm:top-[5rem] lg:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-3 py-2.5 text-center text-sm font-bold transition ${
                    isActive(l.href)
                      ? 'bg-primary/15 text-primary'
                      : 'text-ink-600 hover:bg-black/5 dark:text-ink-400 dark:hover:bg-white/10'
                  }`}
                >
                  {l.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  )
}
