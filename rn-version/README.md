# 西语记 - React Native 版本

## 项目说明

这是《西语记》多语言背单词App的React Native版本，主打"环球旅行"美学理念。

## 功能特性

✅ **自动轮播漫游** - 每4秒自动切换目的地  
✅ **手势滑动** - 支持左右滑动切换（向左滑下一张，向右滑上一张）  
✅ **精美插画** - 5个世界地标的手绘SVG插画  
✅ **宝丽来风格** - 带经纬度坐标的旅行照片窗口  
✅ **响应式设计** - 完全适配移动端交互  

## 目的地列表

- 🇪🇸 **España** - 圣家堂 (Barcelona)
- 🇫🇷 **France** - 埃菲尔铁塔 (Paris)
- 🇩🇪 **Deutschland** - 勃兰登堡门 (Berlin)
- 🇯🇵 **日本** - 富士山
- 🇰🇷 **한국** - 景福宫 (Seoul)

## 安装依赖

```bash
npm install
# 或
yarn install
```

## 运行项目

```bash
# iOS
npm run ios

# Android
npm run android

# Web (预览)
npm run web
```

## 技术栈

- **React Native** - 跨平台移动应用框架
- **Expo** - 开发工具链
- **react-native-svg** - SVG插画渲染
- **expo-linear-gradient** - 渐变背景
- **TypeScript** - 类型安全

## 文件结构

```
rn-version/
├── App.tsx                          # 主应用组件
├── components/
│   ├── PolaroidLandmark.tsx        # 宝丽来照片组件
│   └── illustrations/              # SVG插画文件夹
│       ├── SagradaFamilia.tsx      # 圣家堂
│       ├── EiffelTower.tsx         # 埃菲尔铁塔
│       ├── Brandenburg.tsx         # 勃兰登堡门
│       ├── MtFuji.tsx              # 富士山
│       ├── Gyeongbokgung.tsx       # 景福宫
│       └── index.ts                # 导出文件
├── package.json
└── README.md
```

## 设计特点

### 宝丽来照片
- 手写字体显示地名
- 真实经纬度坐标
- 仿真胶带贴纸效果
- 微倾斜角度(-2deg)

### 插画风格
- 柔和渐变天空
- 手绘质感建筑
- 细腻光影细节
- 主题配色系统

### 交互体验
- 自动轮播（4秒/次）
- 滑动切换（弹性动画）
- 点状指示器（可快速跳转）
- 滑动后暂停自动播放

## 自定义字体

如需使用 **Caveat** 手写字体（用于宝丽来照片底部说明），请：

1. 下载字体文件到 `assets/fonts/`
2. 在 `app.json` 中配置：
```json
{
  "expo": {
    "fonts": {
      "Caveat": "./assets/fonts/Caveat-Regular.ttf"
    }
  }
}
```

## License

MIT
