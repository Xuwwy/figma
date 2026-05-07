import { useState } from 'react';
import { motion } from 'motion/react';

interface LearnScreenProps {
  onBack: () => void;
  onStartWordCard?: () => void;
}

type Language = 'es' | 'fr' | 'de' | 'ja' | 'ko';

const languages = [
  { key: 'es' as Language, label: 'España', city: 'Barcelona', color: '#FFE4D2' },
  { key: 'fr' as Language, label: 'France', city: 'Paris', color: '#E8E0F5' },
  { key: 'de' as Language, label: 'Deutschland', city: 'Berlin', color: '#F0E6D6' },
  { key: 'ja' as Language, label: '日本', city: '富士山', color: '#FFE4EA' },
  { key: 'ko' as Language, label: '한국', city: 'Seoul', color: '#E2EFE6' },
];

const books = [
  { id: 1, name: '西班牙语A1基础词汇', words: 500, progress: 65 },
  { id: 2, name: '旅行必备500词', words: 500, progress: 30 },
  { id: 3, name: '商务西语进阶', words: 800, progress: 0 },
];

const learningModes = [
  { id: 'spelling', name: '拼写练习', premium: false },
  { id: 'listening', name: '听音辩词', premium: false },
  { id: 'new-words', name: '新词学习', premium: false },
  { id: 'review', name: '今日复习', premium: false },
  { id: 'mixed', name: '混合学习', premium: false },
  { id: 'mistakes', name: '错词强化', premium: true },
  { id: 'favorites', name: '收藏词复习', premium: true },
  { id: 'verbs', name: '动词专项', premium: true },
  { id: 'phrases', name: '短语专项', premium: true },
  { id: 'exam', name: '考试专项', premium: true },
];

export function LearnScreen({ onBack, onStartWordCard }: LearnScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');
  const currentLang = languages.find(l => l.key === selectedLanguage) || languages[0];

  return (
    <div className="h-full bg-gradient-to-b from-neutral-50 to-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <button onClick={onBack} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">学习中心</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* Language Selection - 游记档案 */}
        <section>
          <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">游记档案</h2>
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <motion.button
                key={lang.key}
                onClick={() => setSelectedLanguage(lang.key)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedLanguage === lang.key
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className={`text-xl font-bold mb-1 ${selectedLanguage === lang.key ? 'text-white' : 'text-neutral-900'}`}>
                    {lang.label}
                  </div>
                  <div className={`text-xs ${selectedLanguage === lang.key ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {lang.city}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Book Shelf - 词书书架 */}
        <section>
          <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">词书书架</h2>
          <div className="space-y-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl p-4 border border-neutral-200 hover:border-neutral-300 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">{book.name}</h3>
                    <p className="text-sm text-neutral-500">{book.words} 词</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-neutral-900">{book.progress}%</div>
                  </div>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 rounded-full transition-all"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Modes */}
        <section>
          <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider mb-4">学习模式</h2>
          <div className="grid grid-cols-2 gap-3">
            {learningModes.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => mode.id === 'new-words' && onStartWordCard?.()}
                className={`p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${
                  mode.premium
                    ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {mode.premium && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-400 text-white text-xs font-semibold rounded-full">
                    VIP
                  </div>
                )}
                <div className="font-semibold text-neutral-900">{mode.name}</div>
                <div className="mt-1 text-xs text-neutral-500">
                  {mode.premium ? '专属功能' : '免费使用'}
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
