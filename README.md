# 西语记 (Xiyuji)

多语言背单词移动端App - 环球旅行美学设计

## 🌍 项目简介

《西语记》是一款主打"环球旅行"美学理念的多语言背单词移动应用。应用内按"游记档案"分为西班牙语、法语、德语、日语和韩语五个篇章，每个语言都对应一个世界地标的精美手绘插画。

## ✨ 设计特点

- **宝丽来风格** - 仿真旅行照片窗口，带真实经纬度坐标
- **手绘插画** - 5个世界地标的精美SVG插画
- **自动轮播** - 每4秒自动切换目的地，沉浸式体验
- **手势交互** - 支持左右滑动切换语言主题
- **极简设计** - 白色背景 + 现代iOS设计风格

## 🗺️ 目的地列表

| 国家 | 地标 | 城市 | 经纬度 |
|------|------|------|--------|
| 🇪🇸 España | 圣家堂 | Barcelona | 41.3851° N, 2.1734° E |
| 🇫🇷 France | 埃菲尔铁塔 | Paris | 48.8584° N, 2.2945° E |
| 🇩🇪 Deutschland | 勃兰登堡门 | Berlin | 52.5163° N, 13.3777° E |
| 🇯🇵 日本 | 富士山 | - | 35.3606° N, 138.7274° E |
| 🇰🇷 한국 | 景福宫 | Seoul | 37.5796° N, 126.9770° E |

## 📁 项目结构

```
.
├── src/                        # Web版本 (React + Tailwind)
│   ├── app/
│   │   ├── App.tsx            # 主应用
│   │   └── components/
│   │       └── PolaroidLandmark.tsx
│   └── styles/
│
├── rn-version/                 # React Native版本
│   ├── App.tsx                # 主应用 (JSX + StyleSheet)
│   ├── components/
│   │   ├── PolaroidLandmark.tsx
│   │   └── illustrations/     # SVG插画
│   │       ├── SagradaFamilia.tsx
│   │       ├── EiffelTower.tsx
│   │       ├── Brandenburg.tsx
│   │       ├── MtFuji.tsx
│   │       └── Gyeongbokgung.tsx
│   ├── package.json
│   ├── README.md
│   ├── FONTS.md
│   └── COMPLETE_CODE.md
│
└── README.md (本文件)
```

## 🚀 快速开始

### Web版本

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### React Native版本

```bash
cd rn-version

# 安装依赖
npm install

# 运行iOS
npm run ios

# 运行Android
npm run android
```

## 🛠️ 技术栈

### Web版本
- React 18
- TypeScript
- Tailwind CSS v4
- Motion (Framer Motion)
- Vite

### React Native版本
- React Native 0.73
- TypeScript
- Expo SDK 50
- react-native-svg
- expo-linear-gradient

## 🎨 设计系统

### 字体
- **iOS**: PingFang SC (苹方)
- **Android**: Roboto / Noto Sans SC
- **Web**: 跨平台字体栈自动适配
- **宝丽来照片**: Caveat 手写字体

### 颜色主题
每个语言主题都有独特的柔和渐变背景：
- España: `#FFE4D2` (暖橙色调)
- France: `#E8E0F5` (淡紫色调)
- Deutschland: `#F0E6D6` (米黄色调)
- 日本: `#FFE4EA` (樱花粉调)
- 한국: `#E2EFE6` (青绿色调)

## 📱 核心功能

✅ **自动轮播漫游** - 每4秒自动切换  
✅ **手势滑动** - 左右滑动切换主题  
✅ **点状指示器** - 可快速跳转  
✅ **响应式设计** - 完美适配移动端  
✅ **跨平台字体** - iOS/Android原生字体  

## 📄 License

MIT

## 👨‍💻 开发说明

- 插画使用SVG格式，可自由缩放不失真
- 所有经纬度坐标真实准确
- Web版和RN版代码独立，便于维护
- 完整使用TypeScript，类型安全

---

**Made with ❤️ for language learners around the world**
