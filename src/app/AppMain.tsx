import { useState } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { LearnScreen } from "./screens/LearnScreen";
import { WordCardScreen } from "./screens/WordCardScreen";

type TabRoute = 'home' | 'learn' | 'journey' | 'profile';
type Screen = 'tab' | 'learn-center' | 'word-card';

const tabs = [
  {
    key: 'home' as TabRoute,
    label: '首页',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    )
  },
  {
    key: 'learn' as TabRoute,
    label: '学习',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    )
  },
  {
    key: 'journey' as TabRoute,
    label: '旅程',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 6.9 8 11.7z" />
      </svg>
    )
  },
  {
    key: 'profile' as TabRoute,
    label: '我的',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
];

export default function AppMain() {
  const [activeTab, setActiveTab] = useState<TabRoute>('home');
  const [currentScreen, setCurrentScreen] = useState<Screen>('tab');

  const renderScreen = () => {
    // 学习流程（全屏，隐藏底部导航）
    if (currentScreen === 'learn-center') {
      return (
        <LearnScreen
          onBack={() => setCurrentScreen('tab')}
          onStartWordCard={() => setCurrentScreen('word-card')}
        />
      );
    }
    if (currentScreen === 'word-card') {
      return <WordCardScreen onBack={() => setCurrentScreen('learn-center')} />;
    }

    // 正常底部导航流程
    switch (activeTab) {
      case 'home':
        return <HomeScreen onStartLearn={() => setCurrentScreen('learn-center')} />;
      case 'learn':
        return (
          <LearnScreen
            onBack={() => setActiveTab('home')}
            onStartWordCard={() => setCurrentScreen('word-card')}
          />
        );
      case 'journey':
        return <JourneyScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onStartLearn={() => setCurrentScreen('learn-center')} />;
    }
  };

  const shouldShowTabBar = currentScreen === 'tab';

  return (
    <div className="size-full flex items-center justify-center bg-neutral-100 p-6">
      {/* iPhone frame */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[48px] shadow-2xl overflow-hidden border border-neutral-200">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-3 z-20 text-black" style={{ fontSize: 14 }}>
          <span style={{ fontWeight: 600 }}>9:41</span>
          <div className="flex items-center gap-1">
            <span>•••</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative h-full flex flex-col">
          {/* Screen Content */}
          <div className="flex-1 overflow-hidden pt-12">
            {renderScreen()}
          </div>

          {/* Bottom Tab Bar */}
          {shouldShowTabBar && (
            <div className="border-t border-neutral-100 bg-white/95 backdrop-blur-md">
              <div className="flex items-center justify-around px-2 pt-2 pb-6">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                        isActive ? 'bg-neutral-100' : ''
                      }`}
                    >
                      <div className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                        {tab.icon(isActive)}
                      </div>
                      <span
                        className={`text-[10px] font-medium transition-colors ${
                          isActive ? 'text-neutral-900' : 'text-neutral-400'
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Home indicator */}
              <div className="w-32 h-1 bg-neutral-900 rounded-full mx-auto mb-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 占位屏幕组件
function JourneyScreen() {
  return (
    <div className="h-full bg-gradient-to-b from-green-50 to-white p-6 flex flex-col items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-600 mb-4">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 6.9 8 11.7z" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2 text-neutral-900">旅程地图</h2>
      <p className="text-neutral-500 text-sm">探索世界，收集明信片</p>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white p-6 flex flex-col items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-600 mb-4">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2 text-neutral-900">个人中心</h2>
      <p className="text-neutral-500 text-sm">查看个人信息和设置</p>
    </div>
  );
}
