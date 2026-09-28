import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleField from './components/ParticleField.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ToastProvider from './components/ToastProvider.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ArchivePage from './pages/ArchivePage.jsx'
import PhotowallPage from './pages/PhotowallPage.jsx'
import MusicPage from './pages/MusicPage.jsx'
import MomentsPage from './pages/MomentsPage.jsx'
import ChatterPage from './pages/ChatterPage.jsx'
import FriendsPage from './pages/FriendsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

const pages = {
  home: HomePage,
  projects: ProjectsPage,
  archive: ArchivePage,
  photowall: PhotowallPage,
  music: MusicPage,
  moments: MomentsPage,
  chatter: ChatterPage,
  friends: FriendsPage,
  about: AboutPage
}

// 滚轮翻页顺序：向下滚 → 下一页，向上滚 → 上一页
const PAGE_ORDER = ['home', 'projects', 'archive', 'photowall', 'music', 'moments', 'chatter', 'friends', 'about']

function parseRoute() {
  const h = window.location.hash.replace(/^#\/?/, '')
  return pages[h] ? h : 'home'
}

export default function App() {
  // theme：用户选择（dark / light / system）；resolved：实际生效（dark / light）
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
    } catch (e) {}
    return 'dark'
  })
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [route, setRoute] = useState(parseRoute)

  // 跟随系统：监听系统深色偏好变化
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => setSystemDark(e.matches)
    if (mq.addEventListener) mq.addEventListener('change', onChange)
    else if (mq.addListener) mq.addListener(onChange)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      else if (mq.removeListener) mq.removeListener(onChange)
    }
  }, [])

  const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  // 应用主题到 <html>（class 策略：dark / light）
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolved === 'dark')
    root.classList.toggle('light', resolved === 'light')
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme, resolved])

  // hash 路由
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute())
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // 滚轮 / 触摸滑动切换页面：
  // 页面滚到底部后继续向下滑 → 切下一页；在顶部向上滑 → 切上一页
  const pageLock = useRef(0)
  useEffect(() => {
    const atTop = () => window.scrollY <= 2
    const atBottom = () =>
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
    const go = (dir) => {
      const now = Date.now()
      if (now - pageLock.current < 1000) return // 冷却锁：一次手势只翻一页
      const idx = PAGE_ORDER.indexOf(route)
      const next = idx + dir
      if (next < 0 || next >= PAGE_ORDER.length) return
      pageLock.current = now
      window.location.hash = '#/' + PAGE_ORDER[next]
    }
    const onWheel = (e) => {
      const d = e.deltaY
      if (Math.abs(d) < 25) return
      if (d > 0 && atBottom()) go(1)
      else if (d < 0 && atTop()) go(-1)
    }
    let touchY = 0
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      const d = touchY - e.changedTouches[0].clientY
      if (Math.abs(d) < 60) return
      if (d > 0 && atBottom()) go(1)
      else if (d < 0 && atTop()) go(-1)
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [route])

  // 三态循环：深色 → 浅色 → 跟随系统
  const toggleTheme = () =>
    setTheme((t) => (t === 'dark' ? 'light' : t === 'light' ? 'system' : 'dark'))
  const setThemeMode = (m) => setTheme(m)
  const Page = pages[route]

  return (
    <ToastProvider>
      <div className="relative min-h-screen">
        <ParticleField />
        <Navbar theme={resolved} themeMode={theme} onToggleTheme={toggleTheme} onSetTheme={setThemeMode} />
        <AnimatePresence mode="wait">
          <motion.div
            key={route}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Page
              theme={resolved}
              themeMode={theme}
              onToggleTheme={toggleTheme}
              onSetTheme={setThemeMode}
            />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </div>
    </ToastProvider>
  )
}
