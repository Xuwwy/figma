# 西语记 - React Native 完整代码

## 项目结构

```
rn-version/
├── App.tsx                          # 主应用
├── components/
│   ├── PolaroidLandmark.tsx        # 宝丽来照片组件
│   └── illustrations/              # SVG插画
│       ├── SagradaFamilia.tsx      # 🇪🇸 圣家堂
│       ├── EiffelTower.tsx         # 🇫🇷 埃菲尔铁塔
│       ├── Brandenburg.tsx         # 🇩🇪 勃兰登堡门
│       ├── MtFuji.tsx              # 🇯🇵 富士山
│       ├── Gyeongbokgung.tsx       # 🇰🇷 景福宫
│       └── index.ts
├── package.json
└── README.md
```

## 核心特性

### ✅ 自动轮播
- 每4秒自动切换目的地
- 流畅的动画过渡

### ✅ 手势交互
- 使用 `PanResponder` 实现左右滑动
- 向左滑→下一张，向右滑→上一张
- 滑动后暂停自动播放

### ✅ 跨平台字体
- iOS: PingFang SC (苹方)
- Android: Roboto / Noto Sans SC
- 使用 `Platform.select()` 分平台适配

### ✅ 宝丽来照片
- 尺寸: 260px
- 带经纬度坐标信息
- 仿真胶带贴纸效果

### ✅ 响应式设计
- 适配iPhone和Android手机
- 状态栏 + Home Indicator

---

## 📄 App.tsx

```tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PolaroidLandmark } from './components/PolaroidLandmark';

type Theme = 'es' | 'fr' | 'de' | 'ja' | 'ko';

const themes: { key: Theme; label: string; tint: string[] }[] = [
  { key: 'es', label: 'España', tint: ['#FFE4D2', '#ffffff'] },
  { key: 'fr', label: 'France', tint: ['#E8E0F5', '#ffffff'] },
  { key: 'de', label: 'Deutschland', tint: ['#F0E6D6', '#ffffff'] },
  { key: 'ja', label: '日本', tint: ['#FFE4EA', '#ffffff'] },
  { key: 'ko', label: '한국', tint: ['#E2EFE6', '#ffffff'] },
];

export default function App() {
  const [theme, setTheme] = useState<Theme>('es');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const pan = useRef(new Animated.ValueXY()).current;

  const currentTheme = themes.find((t) => t.key === theme)!;
  const currentIndex = themes.findIndex((t) => t.key === theme);

  // 自动轮播
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

  // 滑动手势
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 50) {
          setIsAutoPlay(false);
          const idx = themes.findIndex((t) => t.key === theme);

          if (gestureState.dx > 0) {
            setTheme(themes[(idx - 1 + themes.length) % themes.length].key);
          } else {
            setTheme(themes[(idx + 1) % themes.length].key);
          }
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* 渐变背景 */}
      <LinearGradient
        colors={[currentTheme.tint[0], currentTheme.tint[1]]}
        style={styles.gradientBg}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      {/* iPhone 状态栏 */}
      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <Text style={styles.statusIcons}>•••</Text>
      </View>

      {/* 内容区 */}
      <View style={styles.content}>
        {/* 品牌标题 - 左上角 */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>西语记</Text>
          <Text style={styles.brandSubtitle}>TRAVEL · LEARN · REMEMBER</Text>
        </View>

        {/* 宝丽来照片 - 可滑动 */}
        <Animated.View
          style={[
            styles.polaroidContainer,
            {
              transform: [{ translateX: pan.x }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <PolaroidLandmark theme={theme} />
        </Animated.View>

        {/* 目的地信息 */}
        <View style={styles.destinationContainer}>
          <Text style={styles.destinationName}>{currentTheme.label}</Text>
          <Text style={styles.destinationSubtitle}>TRAVEL JOURNAL</Text>

          {/* 指示器 */}
          <View style={styles.indicatorContainer}>
            {themes.map((t) => (
              <TouchableOpacity
                key={t.key}
                onPress={() => {
                  setIsAutoPlay(false);
                  setTheme(t.key);
                }}
              >
                <View
                  style={[
                    styles.indicator,
                    theme === t.key
                      ? styles.indicatorActive
                      : styles.indicatorInactive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 登录表单 */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry
          />

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>开启旅程 · Begin Journey</Text>
          </TouchableOpacity>

          {/* 分隔线 */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* 第三方登录 */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>🍎 Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>✉️ Email</Text>
            </TouchableOpacity>
          </View>

          {/* 注册链接 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>还没有护照？ </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>注册新账号</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  statusBar: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    zIndex: 20,
  },
  statusTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    fontSize: 14,
    color: '#000',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 32,
  },
  brandContainer: {
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#171717',
    letterSpacing: 2,
    ...Platform.select({
      ios: {
        fontFamily: 'PingFang SC',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#737373',
    letterSpacing: 2.5,
    marginTop: 4,
  },
  polaroidContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  destinationContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  destinationName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
    letterSpacing: 0.2,
  },
  destinationSubtitle: {
    fontSize: 9.5,
    color: '#a3a3a3',
    letterSpacing: 2,
    marginTop: 4,
    marginBottom: 12,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  indicator: {
    height: 6,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: '#171717',
    borderRadius: 3,
  },
  indicatorInactive: {
    width: 6,
    backgroundColor: '#d4d4d4',
    borderRadius: 3,
  },
  formContainer: {
    gap: 10,
  },
  input: {
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#171717',
  },
  primaryButton: {
    height: 44,
    backgroundColor: '#171717',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d4d4d4',
  },
  dividerText: {
    fontSize: 10,
    color: '#a3a3a3',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  socialButton: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: 13,
    color: '#525252',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 11,
    color: '#737373',
  },
  footerLink: {
    fontSize: 11,
    color: '#171717',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 128,
    height: 4,
    backgroundColor: '#171717',
    borderRadius: 2,
  },
});
```

---

## 📄 components/PolaroidLandmark.tsx

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  SagradaFamilia,
  EiffelTower,
  Brandenburg,
  MtFuji,
  Gyeongbokgung,
} from './illustrations';

type Theme = 'es' | 'fr' | 'de' | 'ja' | 'ko';

interface Props {
  theme: Theme;
}

const landmarkMap = {
  es: {
    Illustration: SagradaFamilia,
    caption: 'Barcelona · España',
    lat: '41.3851° N',
    lng: '2.1734° E',
  },
  fr: {
    Illustration: EiffelTower,
    caption: 'Paris · France',
    lat: '48.8584° N',
    lng: '2.2945° E',
  },
  de: {
    Illustration: Brandenburg,
    caption: 'Berlin · Deutschland',
    lat: '52.5163° N',
    lng: '13.3777° E',
  },
  ja: {
    Illustration: MtFuji,
    caption: '富士山 · 日本',
    lat: '35.3606° N',
    lng: '138.7274° E',
  },
  ko: {
    Illustration: Gyeongbokgung,
    caption: '경복궁 · 한국',
    lat: '37.5796° N',
    lng: '126.9770° E',
  },
};

export function PolaroidLandmark({ theme }: Props) {
  const { Illustration, caption, lat, lng } = landmarkMap[theme];

  return (
    <View style={styles.container}>
      {/* 胶带 */}
      <View style={styles.tape} />

      {/* 宝丽来相框 */}
      <View style={styles.polaroid}>
        {/* 插画区域 */}
        <View style={styles.imageContainer}>
          <Illustration />
        </View>

        {/* 底部说明文字 */}
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{caption}</Text>
          <View style={styles.coordsContainer}>
            <Text style={styles.coords}>{lat}</Text>
            <Text style={styles.coords}> · </Text>
            <Text style={styles.coords}>{lng}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 260,
    alignItems: 'center',
  },
  tape: {
    width: 80,
    height: 24,
    backgroundColor: '#fef3c7',
    borderRadius: 2,
    transform: [{ rotate: '-2deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: -12,
    zIndex: 10,
  },
  polaroid: {
    width: 260,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 56,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 10,
    transform: [{ rotate: '-2deg' }],
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 10 / 11,
    backgroundColor: '#fafaf9',
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  caption: {
    fontSize: 17,
    fontWeight: '500',
    color: '#57534e',
    fontFamily: 'Caveat', // 需要单独引入字体
    marginBottom: 2,
  },
  coordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coords: {
    fontSize: 11.5,
    color: '#a8a29e',
    fontFamily: 'Caveat', // 需要单独引入字体
  },
});
```

---

## 关键技术点

### 1. Platform.select() - 跨平台字体

```tsx
brandTitle: {
  ...Platform.select({
    ios: {
      fontFamily: 'PingFang SC',
    },
    android: {
      fontFamily: 'Roboto',
    },
  }),
}
```

### 2. PanResponder - 滑动手势

```tsx
const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: (_, gestureState) => {
    return Math.abs(gestureState.dx) > 10;
  },
  onPanResponderMove: Animated.event([null, { dx: pan.x }], {
    useNativeDriver: false,
  }),
  onPanResponderRelease: (_, gestureState) => {
    // 处理滑动逻辑
  },
});
```

### 3. LinearGradient - 渐变背景

```tsx
<LinearGradient
  colors={['#FFE4D2', '#ffffff']}
  start={{ x: 0.5, y: 0 }}
  end={{ x: 0.5, y: 0.6 }}
/>
```

### 4. react-native-svg - SVG插画

所有地标插画都使用 `react-native-svg` 渲染，支持渐变、路径、分组等高级特性。

---

## 依赖项

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.73.0",
    "react-native-svg": "^14.1.0",
    "expo": "~50.0.0",
    "expo-linear-gradient": "~12.7.0"
  }
}
```

---

## 运行项目

```bash
# 安装依赖
npm install

# iOS
npm run ios

# Android
npm run android
```

---

## 注意事项

1. **字体文件**: `Caveat` 手写字体需要单独引入，详见 `FONTS.md`
2. **Expo版本**: 使用Expo SDK 50
3. **SVG支持**: 需要安装 `react-native-svg`
4. **渐变背景**: 需要安装 `expo-linear-gradient`

---

完整代码已全部使用 **JSX + StyleSheet**，无任何Tailwind CSS依赖！🎉
