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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const [theme, setTheme] = useState<Theme>('es');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
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
            // 向右滑 - 上一张
            setTheme(themes[(idx - 1 + themes.length) % themes.length].key);
          } else {
            // 向左滑 - 下一张
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
        {/* 品牌标题 */}
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
            {themes.map((t, idx) => (
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
