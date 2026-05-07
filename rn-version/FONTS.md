# 字体配置说明

## 系统字体方案（推荐）

目前使用系统原生字体，无需额外配置：

### iOS
- **品牌名**: PingFang SC (苹方)
- **副标题**: San Francisco (系统默认)

### Android
- **品牌名**: Roboto / Noto Sans SC
- **副标题**: Roboto (系统默认)

## 自定义字体方案（可选）

如需更统一的跨平台体验，可以引入自定义字体：

### 1. 推荐字体

**思源黑体 (Source Han Sans / Noto Sans CJK)**
- Google和Adobe联合开发
- 开源免费
- 跨平台一致性好
- 支持中日韩文字

下载地址: https://github.com/adobe-fonts/source-han-sans/releases

### 2. 安装步骤

```bash
# 1. 创建字体文件夹
mkdir -p assets/fonts

# 2. 下载并放入字体文件
# SourceHanSansSC-Regular.otf
# SourceHanSansSC-Bold.otf

# 3. 在项目根目录创建 react-native.config.js
```

**react-native.config.js:**
```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

**app.json** (Expo项目):
```json
{
  "expo": {
    "fonts": {
      "SourceHanSansSC": "./assets/fonts/SourceHanSansSC-Regular.otf",
      "SourceHanSansSC-Bold": "./assets/fonts/SourceHanSansSC-Bold.otf"
    }
  }
}
```

### 3. 使用自定义字体

修改 `App.tsx` 中的 `brandTitle` 样式：

```typescript
brandTitle: {
  fontSize: 26,
  fontWeight: '600',
  color: '#171717',
  letterSpacing: 2,
  fontFamily: 'SourceHanSansSC-Bold', // 使用自定义字体
},
```

### 4. 链接字体（仅React Native CLI）

```bash
npx react-native-asset
# 或
npx react-native link
```

## 宝丽来照片字体

宝丽来照片底部使用手写字体 **Caveat**：

1. 下载: https://fonts.google.com/specimen/Caveat
2. 放入 `assets/fonts/Caveat-Regular.ttf`
3. 配置同上

如不配置，会fallback到系统默认字体（仍可正常显示）。

## 当前字体栈 (Web版)

```css
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Noto Sans SC", "Noto Sans CJK SC", "Microsoft YaHei", 
             sans-serif'
```

**说明:**
- `-apple-system`: iOS Safari 使用苹方
- `BlinkMacSystemFont`: macOS Chrome 使用苹方
- `Segoe UI`: Windows 系统字体
- `Roboto`: Android Chrome
- `Noto Sans SC`: Android 中文支持
- `Microsoft YaHei`: Windows 中文后备

## 许可证

- **PingFang SC**: Apple 系统内置，仅限Apple设备
- **Roboto**: Apache License 2.0 (开源免费)
- **Source Han Sans**: SIL Open Font License (开源免费)
- **Noto Sans**: SIL Open Font License (开源免费)
- **Caveat**: SIL Open Font License (开源免费)
