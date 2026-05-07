import { useState } from "react";
import { motion } from "motion/react";
import { PolaroidLandmark } from "../components/PolaroidLandmark";
import bibiHappy from "../../imports/bibi_01_happy.png";

type Theme = 'es' | 'fr' | 'de' | 'ja' | 'ko';

const themes = {
  es: { label: 'España', city: 'Barcelona', tint: ['#FFE4D2', '#ffffff'], color: '#FF9B8F' },
  fr: { label: 'France', city: 'Paris', tint: ['#E8E0F5', '#ffffff'], color: '#B8A8E8' },
  de: { label: 'Deutschland', city: 'Berlin', tint: ['#F0E6D6', '#ffffff'], color: '#C8B8A0' },
  ja: { label: '日本', city: '富士山', tint: ['#FFE4EA', '#ffffff'], color: '#FFB5C5' },
  ko: { label: '한국', city: 'Seoul', tint: ['#E2EFE6', '#ffffff'], color: '#A8C8B0' },
};

interface HomeScreenProps {
  onStartLearn: () => void;
}

export function HomeScreen({ onStartLearn }: HomeScreenProps) {
  const [currentTheme] = useState<Theme>('es');
  const theme = themes[currentTheme];

  return (
    <div className="h-full overflow-y-auto relative">
      {/* 渐变背景 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, ${theme.tint[0]} 0%, ${theme.tint[1]} 100%)`,
        }}
      />

      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <h1
          className="text-neutral-900"
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '0.05em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", sans-serif',
          }}
        >
          西语记
        </h1>
        <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white/80 transition-all border border-white/40">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v6m0 6v6M6 12H1m6 0h6m6 0h5" />
          </svg>
        </button>
      </div>

      <div className="px-6 pb-24 space-y-5">
        {/* 宝丽来照片区域 */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ transform: 'scale(0.75)', marginBottom: -20 }}>
            <PolaroidLandmark theme={currentTheme} />
          </div>
          <div className="text-center mt-2">
            <p className="text-sm font-semibold text-neutral-900 mb-0.5">{theme.label}</p>
            <p className="text-xs text-neutral-500">{theme.city}</p>
          </div>
        </motion.div>

        {/* 学习统计卡片 */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">Today's Progress</h3>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold text-neutral-900">5</p>
              <p className="text-xs text-neutral-500 mt-0.5">已学习</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">3</p>
              <p className="text-xs text-neutral-500 mt-0.5">连续天</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">125</p>
              <p className="text-xs text-neutral-500 mt-0.5">金币</p>
            </div>
          </div>

          {/* 进度条 */}
          <div className="relative h-2 bg-neutral-200/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.color} 0%, ${theme.tint[0]} 100%)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: '25%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2 text-right">5/20 本周目标</p>
        </div>

        {/* 我的旅伴卡片 */}
        <div className="bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/40 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">My Companion</h3>
              <span className="text-xs font-bold text-white bg-neutral-900 px-2.5 py-1 rounded-full">
                Lv.3
              </span>
            </div>

            <div className="flex items-start gap-4">
              {/* 宠物头像 */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-md overflow-hidden">
                  <img src={bibiHappy} alt="Bibi" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
              </div>

              <div className="flex-1">
                <p className="text-base font-semibold text-neutral-900 mb-1">比比</p>
                <p className="text-xs text-neutral-600 mb-3">心情愉快</p>

                {/* 经验值条 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">经验值</span>
                    <span className="text-neutral-700 font-semibold">80/100</span>
                  </div>
                  <div className="h-1.5 bg-neutral-200/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors flex items-center justify-center gap-2">
              查看详情
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 开始学习按钮 */}
        <motion.button
          onClick={onStartLearn}
          className="w-full py-4 rounded-2xl text-white shadow-2xl relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${theme.color} 0%, #171717 100%)`,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* 光泽效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 -translate-x-full" />

          <span className="relative text-base font-semibold tracking-wide flex items-center justify-center gap-2">
            开始今日学习
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </span>
        </motion.button>
      </div>
    </div>
  );
}
