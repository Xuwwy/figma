import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Apple, Mail } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { PolaroidLandmark } from "./components/PolaroidLandmark";

type Theme = "es" | "fr" | "de" | "ja" | "ko";

const themes: { key: Theme; label: string; tint: string }[] = [
  { key: "es", label: "España", tint: "#FFE4D2" },
  { key: "fr", label: "France", tint: "#E8E0F5" },
  { key: "de", label: "Deutschland", tint: "#F0E6D6" },
  { key: "ja", label: "日本", tint: "#FFE4EA" },
  { key: "ko", label: "한국", tint: "#E2EFE6" },
];

export default function AppLogin() {
  const [theme, setTheme] = useState<Theme>("es");
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const tint = themes.find((t) => t.key === theme)!.tint;
  const currentIndex = themes.findIndex((t) => t.key === theme);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setTheme((prev) => {
        const idx = themes.findIndex((t) => t.key === prev);
        return themes[(idx + 1) % themes.length].key;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > 50 || Math.abs(velocity) > 500) {
      setIsAutoPlay(false);
      const idx = themes.findIndex((t) => t.key === theme);

      if (offset > 0) {
        setTheme(themes[(idx - 1 + themes.length) % themes.length].key);
      } else {
        setTheme(themes[(idx + 1) % themes.length].key);
      }
    }
  };

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

        {/* Soft tinted background */}
        <AnimatePresence>
          <motion.div
            key={tint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 50% 25%, ${tint} 0%, #ffffff 60%)`,
            }}
          />
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col px-6 pt-14 pb-8">
          {/* Brand - 左上角 */}
          <div className="mb-5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-neutral-900"
              style={{
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "0.08em",
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif'
              }}
            >
              西语记
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-neutral-500 mt-1"
              style={{ fontSize: 9, letterSpacing: "0.25em", fontWeight: 400 }}
            >
              TRAVEL · LEARN · REMEMBER
            </motion.div>
          </div>

          {/* Polaroid with swipe gesture */}
          <div className="flex-1 flex items-center justify-center my-3 relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <PolaroidLandmark key={theme} theme={theme} />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Destination indicator */}
          <div className="mb-4">
            <div className="text-center mb-3">
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-neutral-900"
                style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}
              >
                {themes[currentIndex].label}
              </motion.div>
              <div className="text-neutral-400 mt-0.5" style={{ fontSize: 9.5, letterSpacing: "0.2em" }}>
                TRAVEL JOURNAL
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5">
              {themes.map((t, idx) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setIsAutoPlay(false);
                    setTheme(t.key);
                  }}
                  className="group"
                >
                  <div
                    className={`transition-all ${
                      theme === t.key
                        ? "w-6 h-1.5 bg-neutral-900 rounded-full"
                        : "w-1.5 h-1.5 bg-neutral-300 rounded-full group-hover:bg-neutral-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Login form */}
          <div className="space-y-2.5">
            <Input
              type="email"
              placeholder="Email"
              className="h-11 rounded-2xl bg-white/90 backdrop-blur-sm border-neutral-200 px-4 shadow-sm focus:shadow-md transition-shadow"
            />
            <Input
              type="password"
              placeholder="Password"
              className="h-11 rounded-2xl bg-white/90 backdrop-blur-sm border-neutral-200 px-4 shadow-sm focus:shadow-md transition-shadow"
            />
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                className="w-full h-11 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl transition-all"
                style={{ fontSize: 14, fontWeight: 500 }}
              >
                开启旅程 · Begin Journey
              </Button>
            </motion.div>

            <div className="flex items-center gap-3 py-0.5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
              <span className="text-neutral-400" style={{ fontSize: 10 }}>or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-10 rounded-2xl bg-white/90 backdrop-blur-sm border-neutral-200 shadow-sm hover:bg-neutral-50 hover:shadow-md transition-all">
                <Apple className="w-4 h-4 mr-1.5" /> Apple
              </Button>
              <Button variant="outline" className="flex-1 h-10 rounded-2xl bg-white/90 backdrop-blur-sm border-neutral-200 shadow-sm hover:bg-neutral-50 hover:shadow-md transition-all">
                <Mail className="w-4 h-4 mr-1.5" /> Email
              </Button>
            </div>

            <div className="text-center pt-1">
              <span className="text-neutral-500" style={{ fontSize: 11 }}>
                还没有护照？{" "}
              </span>
              <button className="text-neutral-900 underline-offset-2 hover:underline font-medium" style={{ fontSize: 11 }}>
                注册新账号
              </button>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-900 rounded-full" />
        </div>
      </div>
    </div>
  );
}
