import { chatters, photos, posts, profile, social } from '../data/site.js'
import { useToast } from './ToastProvider.jsx'

function StatItem({ count, label, colorClass }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-black transition-transform group-hover:scale-110 ${colorClass}`}>
        {count}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-ink-400">{label}</div>
    </div>
  )
}

function SocialBtn({ type, url, onClick, children, title }) {
  const inner = (
    <div
      onClick={onClick}
      title={title || type}
      className="grid h-10 w-10 place-items-center rounded-xl border border-black/5 bg-white/50 text-ink-600 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-ink-400 dark:hover:text-white"
    >
      {children}
    </div>
  )
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    inner
  )
}

const GithubIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

const BiliIcon = (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.8 4.6l1.6-2a.6.6 0 10-.9-.7L16.7 4a9.6 9.6 0 00-4.7-1c-1.7 0-3.3.3-4.7 1L5.5 1.9a.6.6 0 10-.9.7l1.6 2A7.7 7.7 0 002 11.2v4.6c0 2.5 2 4.6 4.5 4.6h.8l.4 1.5h1.2l-.4-1.5h7l-.4 1.5h1.2l.4-1.5h.8c2.5 0 4.5-2 4.5-4.6v-4.6a7.7 7.7 0 00-4.2-6.6zM7.5 13.5a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm9 0a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8z" />
  </svg>
)

export default function ProfileCard() {
  const showToast = useToast()

  const copy = (text, label) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
    showToast(`✨ ${label}已复制: ${text}`)
  }

  return (
    <a
      href="#/about"
      className="glass group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl p-9 shadow-glass transition-all duration-500 hover:scale-[1.01]"
    >
      <div className="relative z-10 flex items-start gap-8">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-accent p-1 text-4xl shadow-lg transition-transform duration-500 group-hover:rotate-3">
          <span className="grid h-full w-full place-items-center rounded-xl bg-ink-50/90 text-primary backdrop-blur dark:bg-ink-900/80">
            ✦
          </span>
        </div>
        <div>
          <h1 className="mb-3 text-3xl font-bold tracking-wider text-fg">
            {profile.name}
          </h1>
          <p className="max-w-md font-medium leading-relaxed text-ink-600 dark:text-ink-400">
            {profile.bio}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
        <div className="flex w-full justify-around gap-8 md:w-auto md:justify-start">
          <StatItem count={posts.length} label="文章" colorClass="text-primary" />
          <div className="hidden h-10 w-px bg-black/10 md:block dark:bg-white/10" />
          <StatItem count={chatters.length} label="杂谈" colorClass="text-accent" />
          <div className="hidden h-10 w-px bg-black/10 md:block dark:bg-white/10" />
          <StatItem count={photos.length} label="照片" colorClass="text-primary" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:justify-end" onClick={(e) => e.preventDefault()}>
          <SocialBtn type="github" url={social.github} title="GitHub">
            {GithubIcon}
          </SocialBtn>
          <SocialBtn type="bilibili" url={social.bilibili} title="B站">
            {BiliIcon}
          </SocialBtn>
          <SocialBtn type="email" onClick={() => copy(social.email, '邮箱')} title="邮箱（点击复制）">
            ✉️
          </SocialBtn>
          <SocialBtn type="wechat" onClick={() => copy(social.wechat, '微信号')} title="微信（点击复制）">
            💬
          </SocialBtn>
          <SocialBtn type="qq" onClick={() => copy(social.qq, 'QQ号')} title="QQ（点击复制）">
            🐧
          </SocialBtn>
        </div>
      </div>
    </a>
  )
}
