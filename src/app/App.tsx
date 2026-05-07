import { useState } from "react";
import AppLogin from "./AppLogin";
import AppMain from "./AppMain";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div>
        <AppLogin />
        {/* 临时调试按钮 - 点击进入主页 */}
        <button
          onClick={() => setIsLoggedIn(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            backgroundColor: '#171717',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            zIndex: 9999,
          }}
        >
          🚀 进入主页（调试）
        </button>
      </div>
    );
  }

  return <AppMain />;
}
