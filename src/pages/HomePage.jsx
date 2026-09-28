import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import ProfileCard from '../components/ProfileCard.jsx'
import CloudPlayer from '../components/CloudPlayer.jsx'
import LyricBar from '../components/LyricBar.jsx'
import LatestPostsCarousel from '../components/LatestPostsCarousel.jsx'
import LatestChatterCarousel from '../components/LatestChatterCarousel.jsx'
import ThemeToggleBlock from '../components/ThemeToggleBlock.jsx'
import SiteDashboard from '../components/SiteDashboard.jsx'
import { photos } from '../data/site.js'

const fadeIn = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 }
}

export default function HomePage({ theme, themeMode, onToggleTheme }) {
  return (
    <div className="mx-auto w-full px-2 pb-10 pt-28 sm:px-3">
      <motion.div {...fadeIn} transition={{ duration: 0.5 }}>
        <HeroCarousel />
      </motion.div>

      <motion.div {...fadeIn} transition={{ duration: 0.5, delay: 0.05 }} className="mt-10">
        <SearchBar />
      </motion.div>

      <main className="mt-12 flex w-full flex-col gap-8">
        {/* 第一行：个人信息卡 + 云音乐播放器 */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12"
        >
          <div className="flex md:col-span-7">
            <ProfileCard />
          </div>
          <div className="flex md:col-span-5">
            <CloudPlayer />
          </div>
        </motion.div>

        {/* 歌词栏 */}
        <motion.div {...fadeIn} transition={{ duration: 0.55, delay: 0.1 }}>
          <LyricBar />
        </motion.div>

        {/* 第二行：最新文章轮播 + 照片墙大卡 / 最新杂谈 + 主题切换 */}
        <motion.div
          {...fadeIn}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12"
        >
          <div className="h-full md:col-span-4">
            <LatestPostsCarousel />
          </div>

          <div className="flex h-full flex-col gap-8 md:col-span-8">
            {/* 照片墙大卡 */}
            <a
              href="#/photowall"
              className="group relative min-h-[240px] flex-1 overflow-hidden rounded-3xl border shadow-glass transition-all duration-700 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-accent/50 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="relative p-9">
                  <h3 className="mb-3 text-3xl font-bold text-white underline decoration-white/60 underline-offset-4">
                    照片墙
                  </h3>
                  <p className="text-lg text-white/90">
                    {photos.length} 张记忆碎片 · 用镜头收集生活的证据
                  </p>
                </div>
              </div>
            </a>

            <div className="grid flex-1 grid-cols-1 items-stretch gap-8 md:grid-cols-12">
              <div className="h-full md:col-span-8">
                <LatestChatterCarousel />
              </div>
              <div className="flex h-full md:col-span-4">
                <ThemeToggleBlock theme={theme} themeMode={themeMode} onToggleTheme={onToggleTheme} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 底部数据面板 */}
        <motion.div {...fadeIn} transition={{ duration: 0.55, delay: 0.2 }} className="group">
          <SiteDashboard />
        </motion.div>
      </main>
    </div>
  )
}
