import { useState } from "react";
import { motion } from "motion/react";

const wordData = [
  {
    id: 1,
    word: 'Hola',
    pronunciation: '/ˈo.la/',
    translation: '你好',
    example: 'Hola, ¿cómo estás?',
    exampleTranslation: '你好，你好吗？',
  },
  {
    id: 2,
    word: 'Gracias',
    pronunciation: '/ˈɡɾa.θjas/',
    translation: '谢谢',
    example: 'Muchas gracias por tu ayuda.',
    exampleTranslation: '非常感谢你的帮助。',
  },
  {
    id: 3,
    word: 'Adiós',
    pronunciation: '/a.ˈðjos/',
    translation: '再见',
    example: 'Adiós, hasta mañana.',
    exampleTranslation: '再见，明天见。',
  },
  {
    id: 4,
    word: 'Por favor',
    pronunciation: '/poɾ fa.ˈβoɾ/',
    translation: '请',
    example: 'Por favor, ayúdame.',
    exampleTranslation: '请帮帮我。',
  },
  {
    id: 5,
    word: 'Bueno',
    pronunciation: '/ˈbwe.no/',
    translation: '好的',
    example: 'Está muy bueno.',
    exampleTranslation: '非常好。',
  },
];

interface WordCardScreenProps {
  onBack: () => void;
}

export function WordCardScreen({ onBack }: WordCardScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learned, setLearned] = useState(0);

  const currentWord = wordData[currentIndex];
  const progress = ((currentIndex + 1) / wordData.length) * 100;

  const handleNext = (knowIt: boolean) => {
    if (knowIt) {
      setLearned(learned + 1);
    }

    if (currentIndex < wordData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      alert(`学习完成！掌握了 ${learned + (knowIt ? 1 : 0)}/${wordData.length} 个单词`);
      onBack();
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* 渐变背景 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, #FFE4D2 0%, #ffffff 100%)',
        }}
      />

      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white/80 transition-all border border-white/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5m7 7l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 mx-4">
          <p className="text-sm font-semibold text-neutral-900 text-center">España · 新词学习</p>
        </div>
        <div className="w-10" />
      </div>

      {/* 进度信息 */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutral-600">进度</span>
          <span className="text-xs font-semibold text-neutral-900">{currentIndex + 1}/{wordData.length}</span>
        </div>
        <div className="h-1 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden border border-white/40">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 卡片区域 */}
      <div className="flex-1 flex items-center justify-center px-6 py-4">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
          style={{ aspectRatio: '0.75' }}
        >
          <div
            className="relative w-full h-full cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 正面 */}
              <div
                className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                }}
              >
                {/* 顶部装饰条 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent rounded-full" />

                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center mb-8">
                    <h2 className="text-6xl font-bold text-neutral-900 mb-4 tracking-tight">
                      {currentWord.word}
                    </h2>
                    <p className="text-lg text-neutral-500 font-mono tracking-wide">
                      {currentWord.pronunciation}
                    </p>
                  </div>

                  {/* 发音按钮 */}
                  <button className="px-6 py-3 bg-gradient-to-r from-neutral-100 to-neutral-50 rounded-xl hover:from-neutral-200 hover:to-neutral-100 transition-all shadow-sm border border-neutral-200/50 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
                    </svg>
                    <span className="text-sm font-medium text-neutral-700">播放发音</span>
                  </button>

                  {/* 提示 */}
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-xs text-neutral-400 flex items-center justify-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m-7-7h14" />
                      </svg>
                      点击卡片查看释义
                    </p>
                  </div>
                </div>
              </div>

              {/* 背面 */}
              <div
                className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {/* 顶部装饰条 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-neutral-300 to-transparent rounded-full" />

                <div className="flex flex-col h-full justify-center">
                  <div className="text-center mb-8">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">释义</p>
                    <h3 className="text-5xl font-bold text-neutral-900 mb-8">
                      {currentWord.translation}
                    </h3>
                  </div>

                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mx-auto mb-8" />

                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">例句</p>
                    <p className="text-base text-neutral-900 text-center leading-relaxed font-medium">
                      {currentWord.example}
                    </p>
                    <p className="text-sm text-neutral-600 text-center leading-relaxed">
                      {currentWord.exampleTranslation}
                    </p>
                  </div>

                  {/* 提示 */}
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <p className="text-xs text-neutral-400 flex items-center justify-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14m-7-7h14" />
                      </svg>
                      再次点击翻回正面
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 底部操作区 */}
      <div className="px-6 pb-6 space-y-4">
        {/* 统计 */}
        <div className="flex items-center justify-center">
          <div className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40">
            <span className="text-xs font-semibold text-neutral-700">
              已掌握 <span className="text-neutral-900">{learned}</span> 个
            </span>
          </div>
        </div>

        {/* 按钮组 */}
        <div className="flex gap-3">
          <button
            onClick={() => handleNext(false)}
            className="flex-1 py-4 bg-white/70 backdrop-blur-md border-2 border-neutral-200/60 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="text-sm font-semibold text-neutral-900">不认识</span>
          </button>
          <button
            onClick={() => handleNext(true)}
            className="flex-1 py-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-sm font-semibold text-white">认识</span>
          </button>
        </div>
      </div>
    </div>
  );
}
