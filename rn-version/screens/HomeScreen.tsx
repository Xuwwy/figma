import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PolaroidLandmark } from '../components/PolaroidLandmark';

type Theme = 'es' | 'fr' | 'de' | 'ja' | 'ko';

const themes = {
  es: { label: 'España', city: 'Barcelona', tint: ['#FFE4D2', '#ffffff'] },
  fr: { label: 'France', city: 'Paris', tint: ['#E8E0F5', '#ffffff'] },
  de: { label: 'Deutschland', city: 'Berlin', tint: ['#F0E6D6', '#ffffff'] },
  ja: { label: '日本', city: '富士山', tint: ['#FFE4EA', '#ffffff'] },
  ko: { label: '한국', city: 'Seoul', tint: ['#E2EFE6', '#ffffff'] },
};

export function HomeScreen() {
  const [currentTheme] = React.useState<Theme>('es');
  const theme = themes[currentTheme];

  return (
    <View style={styles.container}>
      {/* 渐变背景 */}
      <LinearGradient
        colors={theme.tint}
        style={styles.gradientBg}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      {/* 顶部导航 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>西语记</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 宝丽来照片 - 缩小版 */}
        <View style={styles.polaroidWrapper}>
          <View style={styles.polaroidSmall}>
            <PolaroidLandmark theme={currentTheme} />
          </View>
          <Text style={styles.currentLocation}>
            {theme.label} · {theme.city}
          </Text>
        </View>

        {/* 今日进度卡片 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>今日进度</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressText}>已学</Text>
            <Text style={styles.progressValue}>5/20</Text>
            <Text style={styles.progressText}>个单词</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.streakDot} />
              <Text style={styles.statText}>连续 3 天</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.coinDot} />
              <Text style={styles.statText}>金币 125</Text>
            </View>
          </View>
        </View>

        {/* 养成游戏卡片 */}
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          <View style={styles.petCardHeader}>
            <Text style={styles.cardTitle}>我的旅伴</Text>
            <Text style={styles.petLevel}>Lv.3</Text>
          </View>
          <View style={styles.petCardContent}>
            <View style={styles.petAvatar}>
              <Text style={styles.petAvatarText}>猫</Text>
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>小橘猫</Text>
              <Text style={styles.petMood}>心情：开心</Text>
              <View style={styles.expBar}>
                <View style={[styles.expFill, { width: '80%' }]} />
              </View>
              <Text style={styles.expText}>经验值 80%</Text>
            </View>
          </View>
          <View style={styles.petCardFooter}>
            <Text style={styles.viewDetailsText}>查看详情 →</Text>
          </View>
        </TouchableOpacity>

        {/* 开始学习按钮 */}
        <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
          <LinearGradient
            colors={['#171717', '#262626']}
            style={styles.startButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.startButtonText}>开始今日旅程</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 底部间距 */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  headerTitle: {
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
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  polaroidWrapper: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  polaroidSmall: {
    transform: [{ scale: 0.7 }],
    marginBottom: -30,
  },
  currentLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#737373',
  },
  progressValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171717',
    marginHorizontal: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f97316',
  },
  coinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fbbf24',
  },
  statText: {
    fontSize: 13,
    color: '#525252',
    fontWeight: '500',
  },
  petCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  petLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#171717',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  petCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  petAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  petAvatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#171717',
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 4,
  },
  petMood: {
    fontSize: 13,
    color: '#737373',
    marginBottom: 8,
  },
  expBar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  expFill: {
    height: '100%',
    backgroundColor: '#171717',
    borderRadius: 4,
  },
  expText: {
    fontSize: 11,
    color: '#a3a3a3',
  },
  petCardFooter: {
    alignItems: 'flex-end',
  },
  viewDetailsText: {
    fontSize: 13,
    color: '#171717',
    fontWeight: '500',
  },
  startButton: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  startButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  bottomSpacer: {
    height: 20,
  },
});
