/**
 * 站点数据（占位示例，可自行替换为真实内容）
 * 结构对齐开源模板 XHBlogs（XinghuisamaBlogs）：首页信息卡 / 文章 / 杂谈 / 说说 / 照片墙 / 友链 / 播放器
 */

export const profile = {
  name: 'December_瑄',
  siteTitle: 'December_瑄 の 小宇宙',
  tagline: '产品设计 · 大三在读',
  bio: '天津仁爱学院 · 数智传媒与设计艺术学院。在产品、手绘与交互设计间穿梭的普通人，这里记录我的课程项目、设计笔记与生活片段。',
  buildDate: '2026-09-28T00:00:00'
}

export const social = {
  github: 'https://github.com/',
  bilibili: 'https://space.bilibili.com/',
  xiaohongshu: 'https://www.xiaohongshu.com/',
  email: 'example@mail.com',
  qq: '1000000000',
  wechat: 'jiajingxuan_'
}

/* ===== 首页横幅轮播（海报展示空间） ===== */
export const banners = [
  {
    id: 'bn1',
    title: '星际漫游',
    subtitle: '粒子与光 · 横屏海报展示',
    image: '/banners/粒子Banner-1.png',
    link: '#/projects'
  },
  {
    id: 'bn2',
    title: '深海极光',
    subtitle: '深蓝荧光 · 沉浸式视觉',
    image: '/banners/粒子Banner-2.png',
    link: '#/photowall'
  },
  {
    id: 'bn3',
    title: '星尘低语',
    subtitle: '光点与轨迹 · 氛围封面',
    image: '/banners/粒子Banner-3.png',
    link: '#/archive'
  }
]

/* ===== 文章（首页轮播 + 搜索） ===== */
export const posts = [
  {
    id: 'po1',
    title: '从手绘草图到可交互原型：我的设计流程沉淀',
    description: '把三年课程作业里的方法整理成一条能复用的流程线。',
    date: '2026.09.20',
    tags: ['设计流程', '方法论'],
    read: 156,
    cover: 'from-primary/70 to-accent/60'
  },
  {
    id: 'po2',
    title: '桌面级机械键盘项目复盘',
    description: '从用户调研到手板验证，一次完整产品设计的得与失。',
    date: '2026.08.11',
    tags: ['项目复盘', '产品'],
    read: 132,
    cover: 'from-accent/60 to-primary/50'
  },
  {
    id: 'po3',
    title: 'UI 习作：音乐播放器的声波纹',
    description: '以「声波纹」为视觉主线的播放器界面练习与思考。',
    date: '2026.07.02',
    tags: ['UI', '练习'],
    read: 98,
    cover: 'from-primary/50 to-accent/40'
  },
  {
    id: 'po4',
    title: '校园二手交易 App 界面设计笔记',
    description: '轻量化界面的信息层级取舍与视觉规范沉淀。',
    date: '2026.05.18',
    tags: ['UI', 'App'],
    read: 121,
    cover: 'from-accent/50 to-primary/40'
  },
  {
    id: 'po5',
    title: '无障碍购票流程改造记录',
    description: '针对老年用户的地铁购票流程简化方案与访谈摘录。',
    date: '2026.04.06',
    tags: ['交互', '无障碍'],
    read: 87,
    cover: 'from-primary/40 to-accent/50'
  },
  {
    id: 'po6',
    title: '三十张速写教会我的事',
    description: '每天一张的速写打卡，练的是观察而不是技法。',
    date: '2026.03.15',
    tags: ['手绘', '打卡'],
    read: 76,
    cover: 'from-accent/40 to-primary/50'
  }
]

/* ===== 杂谈（碎片记录） ===== */
export const chatters = [
  {
    id: 'c1',
    title: '开学的第一周',
    description: '新学期的课表排得很满，但工作室的工位终于有窗。',
    date: '2026.09.12',
    cover: 'from-primary/60 to-accent/50'
  },
  {
    id: 'c2',
    title: '配色灵感库又更新了',
    description: '最近沉迷收集电影截图里的蓝紫色渐变。',
    date: '2026.08.30',
    cover: 'from-accent/60 to-primary/50'
  },
  {
    id: 'c3',
    title: '手板到货的那天',
    description: '第一次摸到自己画的键盘外壳，公差比想象中宽容。',
    date: '2026.08.02',
    cover: 'from-primary/50 to-accent/40'
  },
  {
    id: 'c4',
    title: '图书馆四楼靠窗的位置',
    description: '期末周固定的座位，看得到操场和晚霞。',
    date: '2026.06.25',
    cover: 'from-accent/50 to-primary/40'
  },
  {
    id: 'c5',
    title: '给毕业设计埋的伏笔',
    description: '想做一个关于「声音记忆」的课题，先记下来。',
    date: '2026.05.09',
    cover: 'from-primary/40 to-accent/50'
  }
]

/* ===== 说说（短动态） ===== */
export const moments = [
  { id: 'm1', text: '今天的云像被拉丝的芝士，拍了下来。', date: '2026.09.21', mood: '📷' },
  { id: 'm2', text: '渲染终于跑完了，庆祝一下（喝奶茶）。', date: '2026.09.08', mood: '🧋' },
  { id: 'm3', text: '把播放器界面的按钮圆角从 8 改成 12，瞬间顺眼了。', date: '2026.08.19', mood: '🎨' },
  { id: 'm4', text: '下雨天的画室只有我一个人，安静得能听到笔尖。', date: '2026.07.30', mood: '🌧️' }
]

/* ===== 友链 ===== */
export const friends = [
  { id: 'f1', name: '示例博客 A', desc: '一只在设计院画图的前端', link: '#', cover: 'from-primary/60 to-accent/50' },
  { id: 'f2', name: '示例博客 B', desc: '摄影 / 旅行 / 生活碎片', link: '#', cover: 'from-accent/60 to-primary/50' },
  { id: 'f3', name: '示例博客 C', desc: '产品思维与读书笔记', link: '#', cover: 'from-primary/50 to-accent/40' },
  { id: 'f4', name: '示例博客 D', desc: '独立游戏开发日常', link: '#', cover: 'from-accent/50 to-primary/40' }
]

/* ===== 播放器曲目（占位：播放为模拟进度） ===== */
export const playlist = [
  {
    id: 's1', title: '星际漫游', artist: '未知艺术家', duration: '04:31',
    cover: 'from-primary/70 to-accent/60',
    lyric: '穿过星云的边缘，把心事留在轨道外面'
  },
  {
    id: 's2', title: '深海灯焰', artist: '未知艺术家', duration: '03:47',
    cover: 'from-accent/60 to-primary/50',
    lyric: '海底也有一盏灯，为迷路的鱼亮着'
  },
  {
    id: 's3', title: '喷泉与白鸽', artist: '未知艺术家', duration: '04:05',
    cover: 'from-primary/50 to-accent/40',
    lyric: '白鸽落在水面上，涟漪把午后拉长'
  },
  {
    id: 's4', title: '未完成的草图', artist: '未知艺术家', duration: '03:22',
    cover: 'from-accent/50 to-primary/40',
    lyric: '橡皮擦掉的那一笔，是明天再见的伏笔'
  }
]

/* ===== 4.2 经历旅途（归档页时间轴） ===== */
export const journey = [
  {
    id: 'j1', period: '2023.09', title: '入学 · 初识产品设计', icon: '🎒',
    summary: '进入天津仁爱学院产品设计专业，第一次接触完整的设计流程。',
    detail: '示例正文（占位）。可替换为：入学时的期待与困惑、第一门设计基础课的作业等。'
  },
  {
    id: 'j2', period: '2024.03', title: '专业基础 · 手绘与构成', icon: '✏️',
    summary: '系统学习手绘、三大构成、材料工艺，完成第一个课程设计。',
    detail: '示例正文（占位）。可替换为：手绘训练的量变过程、构成课程的作业、第一次做模型的经验教训。'
  },
  {
    id: 'j3', period: '2024.11', title: '项目实践 · 桌面级机械键盘', icon: '🛠️',
    summary: '从用户调研到手板验证，完整跑通一次产品设计流程。',
    detail: '示例正文（占位）。可替换为：项目背景、调研结论、结构堆叠方案、手板验证结果与复盘。'
  },
  {
    id: 'j4', period: '2025.06', title: '竞赛 · 第一次获奖', icon: '🏆',
    summary: '参加设计类竞赛，作品进入终评并获奖（示例成绩，待替换）。',
    detail: '示例正文（占位）。可替换为：赛事名称、作品主题、团队分工、评审反馈与自己的收获。'
  },
  {
    id: 'j5', period: '2026.03', title: '现在 · 补上交互与前端', icon: '🚀',
    summary: '开始自学交互与前端实现，把设计稿真正做成能跑起来的东西。',
    detail: '示例正文（占位）。可替换为：自学路径、做过的小项目、对「设计 + 实现」这条路的想法。'
  }
]

/* ===== 作品展示（项目页，含游戏分类） ===== */
export const workCategories = ['全部', '产品', 'UI', '交互', '手绘', '游戏']

export const works = [
  { id: 'w1', title: '桌面级机械键盘', category: '产品', cover: 'from-primary/70 to-accent/60', desc: '从用户调研到手板验证的一次完整产品设计流程。', role: '独立完成（调研 / 结构 / 外观 / 手板）', detail: '示例正文（占位）。', shots: ['from-primary/70 to-accent/60', 'from-accent/60 to-primary/50', 'from-primary/50 to-accent/40'] },
  { id: 'w2', title: '校园二手交易 App', category: 'UI', cover: 'from-accent/60 to-primary/50', desc: '面向校内学生的轻量化二手交易界面设计。', role: 'UI 设计 / 视觉规范', detail: '示例正文（占位）。', shots: ['from-accent/60 to-primary/50', 'from-primary/50 to-accent/40', 'from-primary/70 to-accent/60'] },
  { id: 'w3', title: '智慧图书馆导览系统', category: '交互', cover: 'from-primary/50 to-accent/40', desc: '为新生设计的馆内找书流程，平均寻书时间降低约 40%。', role: '交互设计 / 可用性测试', detail: '示例正文（占位）。', shots: ['from-primary/50 to-accent/40', 'from-primary/70 to-accent/60', 'from-accent/60 to-primary/50'] },
  { id: 'w4', title: '产品手绘草图集', category: '手绘', cover: 'from-accent/50 to-primary/40', desc: '三十张小稿铺开可能性，是我在建模前的固定动作。', role: '全部手绘', detail: '示例正文（占位）。', shots: ['from-accent/50 to-primary/40', 'from-primary/40 to-accent/50', 'from-primary/70 to-accent/60'] },
  { id: 'w5', title: '便携咖啡机概念设计', category: '产品', cover: 'from-primary/60 to-accent/50', desc: '为通勤场景做的极简手压咖啡机概念方案。', role: '概念设计 / 外观建模', detail: '示例正文（占位）。', shots: ['from-primary/60 to-accent/50', 'from-accent/50 to-primary/40', 'from-primary/70 to-accent/60'] },
  { id: 'w6', title: '音乐播放器界面概念', category: 'UI', cover: 'from-accent/70 to-primary/60', desc: '以「声波纹」为视觉主线的播放器界面练习。', role: 'UI 设计', detail: '示例正文（占位）。', shots: ['from-accent/70 to-primary/60', 'from-primary/60 to-accent/50', 'from-primary/70 to-accent/60'] },
  { id: 'w7', title: '无障碍购票流程改造', category: '交互', cover: 'from-primary/40 to-accent/50', desc: '针对老年用户的地铁购票流程简化方案。', role: '交互设计 / 用户访谈', detail: '示例正文（占位）。', shots: ['from-primary/40 to-accent/50', 'from-accent/50 to-primary/40', 'from-primary/70 to-accent/60'] },
  { id: 'w8', title: '静物速写 30 张', category: '手绘', cover: 'from-accent/40 to-primary/50', desc: '每天一张的速写打卡，练的是观察而不是技法。', role: '全部手绘', detail: '示例正文（占位）。', shots: ['from-accent/40 to-primary/50', 'from-primary/50 to-accent/40', 'from-primary/70 to-accent/60'] },
  { id: 'w9', title: '塞尔达传说：王国之泪', category: '游戏', platform: 'Switch', status: '通关', cover: 'from-primary/60 to-accent/50', desc: '把「物理拼装」做进开放世界，灵感来源级的一款。', role: '游玩记录', detail: '示例正文（占位）。', shots: ['from-primary/60 to-accent/50', 'from-accent/50 to-primary/40', 'from-primary/70 to-accent/60'] },
  { id: 'w10', title: '原神', category: '游戏', platform: 'PC / 移动端', status: '游玩中', cover: 'from-accent/60 to-primary/50', desc: '美术与音乐都很能打，常当作配色参考。', role: '游玩记录', detail: '示例正文（占位）。', shots: ['from-accent/60 to-primary/50', 'from-primary/50 to-accent/40', 'from-primary/70 to-accent/60'] },
  { id: 'w11', title: '空洞骑士', category: '游戏', platform: 'PC', status: '通关', cover: 'from-primary/50 to-accent/40', desc: '手绘氛围和关卡节奏的教科书。', role: '游玩记录', detail: '示例正文（占位）。', shots: ['from-primary/50 to-accent/40', 'from-primary/70 to-accent/60', 'from-accent/50 to-primary/40'] },
  { id: 'w12', title: '集合啦！动物森友会', category: '游戏', platform: 'Switch', status: '偶尔上线', cover: 'from-accent/50 to-primary/40', desc: '用来放松，也用来练习空间与陈设。', role: '游玩记录', detail: '示例正文（占位）。', shots: ['from-accent/50 to-primary/40', 'from-primary/40 to-accent/50', 'from-primary/70 to-accent/60'] }
]

/* ===== 成绩与证书（关于页） ===== */
export const stats = [
  { label: 'GPA', value: '3.7', note: '满分 4.0（示例）' },
  { label: '专业排名', value: '前 15%', note: '同年级（示例）' },
  { label: '核心课程均分', value: '88', note: '设计类课程（示例）' },
  { label: '竞赛奖项', value: '3 项', note: '校级及以上（示例）' }
]

export const awards = [
  { id: 'a1', name: '全国大学生工业设计大赛', issuer: '省级赛区 · 三等奖', date: '2025.08', level: '省级', detail: '示例证书（占位）。' },
  { id: 'a2', name: '校园创新设计竞赛', issuer: '天津仁爱学院 · 二等奖', date: '2025.05', level: '校级', detail: '示例证书（占位）。' },
  { id: 'a3', name: '手绘表现技法专项认证', issuer: '行业协会 · 认证通过', date: '2024.12', level: '技能认证', detail: '示例证书（占位）。' },
  { id: 'a4', name: '优秀学生奖学金', issuer: '天津仁爱学院 · 三等奖学金', date: '2024.10', level: '校级', detail: '示例证书（占位）。' }
]

/* ===== 拍摄 / 照片墙 ===== */
export const photos = [
  { id: 'p1', title: '校园黄昏', h: 'h-56', cover: 'from-primary/60 to-accent/50' },
  { id: 'p2', title: '旧巷光影', h: 'h-72', cover: 'from-accent/60 to-primary/50' },
  { id: 'p3', title: '窗边的猫', h: 'h-40', cover: 'from-primary/50 to-accent/40' },
  { id: 'p4', title: '雨后操场', h: 'h-64', cover: 'from-accent/50 to-primary/40' },
  { id: 'p5', title: '教室一角', h: 'h-48', cover: 'from-primary/70 to-accent/60' },
  { id: 'p6', title: '夜色公交站', h: 'h-72', cover: 'from-accent/70 to-primary/60' },
  { id: 'p7', title: '春天的树', h: 'h-40', cover: 'from-primary/40 to-accent/50' },
  { id: 'p8', title: '天台的日落', h: 'h-56', cover: 'from-accent/40 to-primary/50' }
]

/* ===== 联系方式（关于页） ===== */
export const contacts = [
  { label: '邮箱', value: 'example@mail.com', href: 'mailto:example@mail.com', icon: '✉️' },
  { label: '微信', value: 'jiajingxuan_', icon: '💬' },
  { label: '小红书', value: '@贾静瑄', icon: '📕' },
  { label: 'B 站', value: '@贾静瑄', icon: '📺' }
]
