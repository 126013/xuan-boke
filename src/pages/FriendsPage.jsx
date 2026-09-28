import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader.jsx'
import { friends } from '../data/site.js'
import { useToast } from '../components/ToastProvider.jsx'

export default function FriendsPage() {
  const showToast = useToast()
  return (
    <div className="mx-auto w-full px-2 pb-16 pt-28 sm:px-3">
      <PageHeader icon="🔗" title="友链" subtitle="朋友们的小站（示例数据，可替换）" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {friends.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
            onClick={() => showToast('示例友链：把真实链接填入 src/data/site.js → friends')}
            className="glass flex items-center gap-5 rounded-3xl p-6 text-left shadow-glass transition-all duration-500 hover:scale-[1.02]"
          >
            <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-tr ${f.cover} text-xl font-black text-white shadow-lg`}>
              {f.name.slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-fg transition hover:text-primary">{f.name}</div>
              <div className="mt-1 truncate text-sm text-ink-400">{f.desc}</div>
            </div>
            <span className="ml-auto text-ink-400">→</span>
          </motion.button>
        ))}
      </div>

      <div className="glass mt-10 rounded-3xl p-8 text-center text-sm text-ink-400 shadow-glass">
        想交换友链？欢迎在
        <a href="#/about" className="mx-1 font-bold text-primary hover:underline">关于页</a>
        找到我的联系方式。
      </div>
    </div>
  )
}
