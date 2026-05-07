import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PolaroidLandmark } from '../components/PolaroidLandmark';
import bibiHappy from "../../imports/bibi_01_happy.png";

interface LearnScreenProps {
  onBack: () => void;
  onStartWordCard?: () => void;
}

type Language = 'es' | 'fr' | 'de' | 'ja' | 'ko';

const languages = [
  { key: 'es' as Language, label: 'España', city: 'Barcelona', color: '#FFE4D2', gradient: 'from-orange-100 to-orange-50' },
  { key: 'fr' as Language, label: 'France', city: 'Paris', color: '#E8E0F5', gradient: 'from-purple-100 to-purple-50' },
  { key: 'de' as Language, label: 'Deutschland', city: 'Berlin', color: '#F0E6D6', gradient: 'from-amber-100 to-amber-50' },
  { key: 'ja' as Language, label: '日本', city: '富士山', color: '#FFE4EA', gradient: 'from-pink-100 to-pink-50' },
  { key: 'ko' as Language, label: '한국', city: 'Seoul', color: '#E2EFE6', gradient: 'from-green-100 to-green-50' },
];

const books = [
  { id: 1, name: '西班牙语A1基础词汇', words: 500, progress: 65, color: 'from-blue-500 to-blue-600' },
  { id: 2, name: '旅行必备500词', words: 500, progress: 30, color: 'from-purple-500 to-purple-600' },
  { id: 3, name: '商务西语进阶', words: 800, progress: 0, color: 'from-orange-500 to-orange-600' },
];

// 学习模式图标组件
const ModeIcons = {
  spelling: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  listening: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  ),
  newWords: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M12 6v6m-3-3h6" />
    </svg>
  ),
  review: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
    </svg>
  ),
  mixed: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20" />
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  ),
  mistakes: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  favorites: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  verbs: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 3v18M17 3v18M3 12h4m10 0h4M3 7h4m10 0h4M3 17h4m10 0h4" />
    </svg>
  ),
  phrases: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <path d="M8 9h8M8 13h6" />
    </svg>
  ),
  exam: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
};

const learningModes = [
  { id: 'spelling', name: '拼写练习', desc: '单词拼写', icon: 'spelling', premium: false, color: 'from-blue-500 to-cyan-500' },
  { id: 'listening', name: '听音辩词', desc: '听力训练', icon: 'listening', premium: false, color: 'from-purple-500 to-pink-500' },
  { id: 'new-words', name: '新词学习', desc: '学习新词', icon: 'newWords', premium: false, color: 'from-green-500 to-emerald-500' },
  { id: 'review', name: '今日复习', desc: '复习巩固', icon: 'review', premium: false, color: 'from-orange-500 to-red-500' },
  { id: 'mixed', name: '混合学习', desc: '综合训练', icon: 'mixed', premium: false, color: 'from-pink-500 to-rose-500' },
  { id: 'mistakes', name: '错词强化', desc: '强化训练', icon: 'mistakes', premium: true, color: 'from-amber-500 to-yellow-500' },
  { id: 'favorites', name: '收藏复习', desc: '巩固收藏', icon: 'favorites', premium: true, color: 'from-amber-500 to-orange-500' },
  { id: 'verbs', name: '动词专项', desc: '动词变位', icon: 'verbs', premium: true, color: 'from-yellow-500 to-amber-500' },
  { id: 'phrases', name: '短语专项', desc: '常用短语', icon: 'phrases', premium: true, color: 'from-orange-500 to-amber-500' },
  { id: 'exam', name: '考试专项', desc: '考试模拟', icon: 'exam', premium: true, color: 'from-amber-600 to-yellow-600' },
];

export function LearnScreen({ onBack, onStartWordCard }: LearnScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [expandedLanguage, setExpandedLanguage] = useState<Language | null>(null);
  const currentLang = languages.find(l => l.key === selectedLanguage) || languages[0];

  const handleLanguageClick = (langKey: Language) => {
    if (expandedLanguage === langKey) {
      // 如果点击已展开的语言，则收起
      setExpandedLanguage(null);
    } else {
      // 展开新语言
      setExpandedLanguage(langKey);
    }
  };

  const handleSelectLanguage = (langKey: Language) => {
    setSelectedLanguage(langKey);
    setExpandedLanguage(null);
    setShowLanguageMenu(false);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      {/* 渐变背景 */}
      <div
        className="fixed inset-0 -z-10 transition-all duration-500"
        style={{
          background: `linear-gradient(180deg, ${currentLang.color} 0%, #ffffff 100%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/60 backdrop-blur-xl border-b border-white/40">
        <button onClick={onBack} className="p-2 hover:bg-white/80 rounded-full transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">学习中心</h1>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
          <img src={bibiHappy} alt="Bibi" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Language Selection - 游记档案 (档案袋风格) */}
        <section>
          <motion.div className="relative">
            {/* 档案袋封面 */}
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="w-full relative"
            >
              {/* 档案袋主体 */}
              <div className="relative bg-gradient-to-br from-amber-100 to-amber-200 rounded-t-2xl shadow-lg border-2 border-amber-300/50 p-5 pb-8">
                {/* 档案袋标签 */}
                <div className="absolute -top-3 left-6 bg-amber-200 px-4 py-1 rounded-t-lg border-2 border-amber-300/50 shadow-sm">
                  <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">Travel Archives</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentLang.gradient} flex items-center justify-center shadow-md border-2 border-white/60`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider">游记档案</h2>
                      <p className="text-xs text-amber-700 mt-0.5">{currentLang.label} · {currentLang.city}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: showLanguageMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </div>

                {/* 档案袋底部装饰线 */}
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-b from-transparent to-amber-300/30" />
              </div>

              {/* 档案袋底边 */}
              <div className="h-2 bg-gradient-to-b from-amber-200 to-amber-300 border-x-2 border-amber-300/50" />
            </button>

            {/* 档案内容 - 文件缩略图 */}
            <AnimatePresence>
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gradient-to-b from-amber-50 to-white/90 backdrop-blur-xl rounded-b-2xl shadow-xl border-2 border-t-0 border-amber-300/50 p-4">
                    {/* 文件标签行 */}
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                      {languages.map((lang, index) => (
                        <motion.button
                          key={lang.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLanguageClick(lang.key);
                          }}
                          className={`flex-shrink-0 px-4 py-2 rounded-t-lg border-2 transition-all ${
                            expandedLanguage === lang.key
                              ? 'bg-white border-amber-300 shadow-md'
                              : 'bg-amber-100/50 border-amber-200/50 hover:bg-amber-100'
                          }`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="text-xs font-semibold text-amber-900">{lang.label}</div>
                          <div className="text-[10px] text-amber-700">{lang.city}</div>
                        </motion.button>
                      ))}
                    </div>

                    {/* 展开的宝丽来照片 */}
                    <AnimatePresence mode="wait">
                      {expandedLanguage && (
                        <motion.div
                          key={expandedLanguage}
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg p-4 shadow-lg border border-amber-200/50"
                        >
                          <div className="flex flex-col items-center">
                            <div className="transform scale-90 mb-3">
                              <PolaroidLandmark theme={expandedLanguage} />
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectLanguage(expandedLanguage);
                              }}
                              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all"
                            >
                              选择此语言
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!expandedLanguage && (
                      <div className="text-center py-4 text-sm text-amber-700/70">
                        点击语言标签查看详情
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Book Shelf - 词书书架 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">词书书架</h2>
            <button className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors flex items-center gap-1">
              更多
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="space-y-3">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 border border-white/60 hover:bg-white/90 transition-all cursor-pointer shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${book.color} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors">{book.name}</h3>
                        <p className="text-sm text-neutral-500">{book.words} 词</p>
                      </div>
                      <div className="text-right ml-3">
                        <div className="text-2xl font-bold text-neutral-900">{book.progress}<span className="text-sm text-neutral-500">%</span></div>
                      </div>
                    </div>
                    <div className="h-2 bg-neutral-200/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${book.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${book.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Learning Modes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">学习模式</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {learningModes.map((mode, index) => {
              const IconComponent = ModeIcons[mode.icon as keyof typeof ModeIcons];
              return (
                <motion.button
                  key={mode.id}
                  onClick={() => mode.id === 'new-words' && onStartWordCard?.()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-2xl transition-all text-left relative overflow-hidden shadow-md hover:shadow-xl bg-white/70 backdrop-blur-xl border ${
                    mode.premium ? 'border-amber-300/60' : 'border-white/60'
                  } group`}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* 背景渐变 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                  {mode.premium && (
                    <div className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold rounded-full shadow-md">
                      VIP
                    </div>
                  )}
                  <div className="flex items-start gap-3 relative">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${mode.color} shadow-md flex-shrink-0`}>
                      <div className="text-white">
                        <IconComponent />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="font-semibold text-neutral-900 mb-0.5">{mode.name}</div>
                      <div className="text-xs text-neutral-600">{mode.desc}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
