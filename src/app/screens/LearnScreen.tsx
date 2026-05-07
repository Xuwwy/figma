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

const learningModes = [
  { id: 'spelling', name: '拼写练习', desc: '拼写单词', icon: '✍️', premium: false, gradient: 'from-blue-50 to-blue-100/50' },
  { id: 'listening', name: '听音辩词', desc: '听力训练', icon: '👂', premium: false, gradient: 'from-purple-50 to-purple-100/50' },
  { id: 'new-words', name: '新词学习', desc: '学习新词', icon: '📖', premium: false, gradient: 'from-green-50 to-green-100/50' },
  { id: 'review', name: '今日复习', desc: '复习巩固', icon: '🔄', premium: false, gradient: 'from-orange-50 to-orange-100/50' },
  { id: 'mixed', name: '混合学习', desc: '综合训练', icon: '🎯', premium: false, gradient: 'from-pink-50 to-pink-100/50' },
  { id: 'mistakes', name: '错词强化', desc: 'VIP专属', icon: '⚡', premium: true, gradient: 'from-amber-50 to-amber-100' },
  { id: 'favorites', name: '收藏词复习', desc: 'VIP专属', icon: '⭐', premium: true, gradient: 'from-amber-50 to-amber-100' },
  { id: 'verbs', name: '动词专项', desc: 'VIP专属', icon: '🎬', premium: true, gradient: 'from-amber-50 to-amber-100' },
  { id: 'phrases', name: '短语专项', desc: 'VIP专属', icon: '💬', premium: true, gradient: 'from-amber-50 to-amber-100' },
  { id: 'exam', name: '考试专项', desc: 'VIP专属', icon: '🎓', premium: true, gradient: 'from-amber-50 to-amber-100' },
];

export function LearnScreen({ onBack, onStartWordCard }: LearnScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const currentLang = languages.find(l => l.key === selectedLanguage) || languages[0];

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
        {/* Language Selection - 游记档案 (二级菜单) */}
        <section>
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="w-full flex items-center justify-between p-4 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 hover:bg-white/80 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentLang.gradient} flex items-center justify-center shadow-md`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="text-left">
                <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">游记档案</h2>
                <p className="text-xs text-neutral-500 mt-0.5">{currentLang.label} · {currentLang.city}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showLanguageMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {showLanguageMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.key}
                      onClick={() => {
                        setSelectedLanguage(lang.key);
                        setShowLanguageMenu(false);
                      }}
                      className={`relative ${selectedLanguage === lang.key ? 'ring-2 ring-neutral-900 ring-offset-2' : ''}`}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: languages.indexOf(lang) * 0.05 }}
                    >
                      <div className="transform scale-75 origin-top">
                        <PolaroidLandmark theme={lang.key} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            {learningModes.map((mode, index) => (
              <motion.button
                key={mode.id}
                onClick={() => mode.id === 'new-words' && onStartWordCard?.()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-2xl transition-all text-left relative overflow-hidden shadow-md hover:shadow-lg bg-gradient-to-br ${mode.gradient} border ${
                  mode.premium ? 'border-amber-300/50' : 'border-white/60'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {mode.premium && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold rounded-full shadow-sm">
                    VIP
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{mode.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-neutral-900 mb-0.5">{mode.name}</div>
                    <div className="text-xs text-neutral-600">{mode.desc}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
