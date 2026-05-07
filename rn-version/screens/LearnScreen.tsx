import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// 模拟单词数据
const wordData = [
  {
    id: 1,
    word: 'Hola',
    pronunciation: '/ˈo.la/',
    translation: '你好',
    example: 'Hola, ¿cómo estás?',
    exampleTranslation: '你好，你好吗？',
    language: 'es',
  },
  {
    id: 2,
    word: 'Gracias',
    pronunciation: '/ˈɡɾa.θjas/',
    translation: '谢谢',
    example: 'Muchas gracias por tu ayuda.',
    exampleTranslation: '非常感谢你的帮助。',
    language: 'es',
  },
  {
    id: 3,
    word: 'Adiós',
    pronunciation: '/a.ˈðjos/',
    translation: '再见',
    example: 'Adiós, hasta mañana.',
    exampleTranslation: '再见，明天见。',
    language: 'es',
  },
  {
    id: 4,
    word: 'Por favor',
    pronunciation: '/poɾ fa.ˈβoɾ/',
    translation: '请',
    example: 'Por favor, ayúdame.',
    exampleTranslation: '请帮帮我。',
    language: 'es',
  },
  {
    id: 5,
    word: 'Bueno',
    pronunciation: '/ˈbwe.no/',
    translation: '好的',
    example: 'Está muy bueno.',
    exampleTranslation: '非常好。',
    language: 'es',
  },
];

export function LearnScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learned, setLearned] = useState(0);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const currentWord = wordData[currentIndex];
  const progress = ((currentIndex + 1) / wordData.length) * 100;

  // 翻卡片动画
  const handleFlip = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  // 下一张卡片
  const handleNext = (knowIt: boolean) => {
    if (knowIt) {
      setLearned(learned + 1);
    }

    // 滑出动画
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (currentIndex < wordData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
        flipAnim.setValue(0);
        slideAnim.setValue(0);
      } else {
        // 学习完成
        alert(`完成学习！掌握了 ${learned + (knowIt ? 1 : 0)}/${wordData.length} 个单词 🎉`);
      }
    });
  };

  // 发音
  const handlePronounce = () => {
    // TODO: 集成语音API
    console.log('发音:', currentWord.word);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  });

  const slideTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_WIDTH],
  });

  return (
    <View style={styles.container}>
      {/* 渐变背景 */}
      <LinearGradient
        colors={['#FFE4D2', '#ffffff']}
        style={styles.gradientBg}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.6 }}
      />

      {/* 顶部导航 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>España · 单词学习</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* 进度条 */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {wordData.length}
        </Text>
      </View>

      {/* 卡片区域 */}
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleFlip}
          style={styles.cardTouchArea}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  { translateX: slideTranslate },
                  { perspective: 1000 },
                ],
              },
            ]}
          >
            {/* 正面 - 单词 */}
            <Animated.View
              style={[
                styles.cardFace,
                styles.cardFront,
                {
                  transform: [{ rotateY: frontInterpolate }],
                  opacity: frontOpacity,
                },
              ]}
            >
              {/* 胶带装饰 */}
              <View style={styles.tape} />

              <View style={styles.cardContent}>
                <Text style={styles.wordText}>{currentWord.word}</Text>
                <Text style={styles.pronunciation}>{currentWord.pronunciation}</Text>

                {/* 发音按钮 */}
                <TouchableOpacity
                  style={styles.pronounceButton}
                  onPress={handlePronounce}
                >
                  <Text style={styles.pronounceText}>发音</Text>
                </TouchableOpacity>

                <View style={styles.flipHint}>
                  <Text style={styles.flipHintText}>点击翻转查看释义</Text>
                </View>
              </View>
            </Animated.View>

            {/* 背面 - 释义 */}
            <Animated.View
              style={[
                styles.cardFace,
                styles.cardBack,
                {
                  transform: [{ rotateY: backInterpolate }],
                  opacity: backOpacity,
                },
              ]}
            >
              {/* 胶带装饰 */}
              <View style={styles.tape} />

              <View style={styles.cardContent}>
                <Text style={styles.translationLabel}>释义</Text>
                <Text style={styles.translationText}>{currentWord.translation}</Text>

                <View style={styles.divider} />

                <Text style={styles.exampleLabel}>例句</Text>
                <Text style={styles.exampleText}>{currentWord.example}</Text>
                <Text style={styles.exampleTranslation}>
                  {currentWord.exampleTranslation}
                </Text>

                <View style={styles.flipHint}>
                  <Text style={styles.flipHintText}>再次点击翻回正面</Text>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* 底部按钮 */}
      <View style={styles.bottomContainer}>
        <View style={styles.learnedBadge}>
          <Text style={styles.learnedText}>已掌握：{learned} 个</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.unknownButton]}
            onPress={() => handleNext(false)}
          >
            <Text style={styles.actionButtonText}>不认识</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.knownButton]}
            onPress={() => handleNext(true)}
          >
            <Text style={[styles.actionButtonText, styles.knownButtonText]}>认识</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tipText}>点击卡片可查看释义和例句</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backIcon: {
    fontSize: 20,
    color: '#171717',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
  },
  headerRight: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#171717',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    color: '#737373',
    textAlign: 'center',
    fontWeight: '500',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  cardTouchArea: {
    width: '100%',
    aspectRatio: 0.7,
    maxHeight: 500,
  },
  card: {
    width: '100%',
    height: '100%',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardFront: {},
  cardBack: {},
  tape: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -40,
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
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  pronunciation: {
    fontSize: 18,
    color: '#737373',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 24,
  },
  pronounceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(23, 23, 23, 0.05)',
    borderRadius: 20,
    marginBottom: 32,
  },
  pronounceText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#171717',
  },
  flipHint: {
    position: 'absolute',
    bottom: 24,
  },
  flipHintText: {
    fontSize: 13,
    color: '#a3a3a3',
  },
  translationLabel: {
    fontSize: 14,
    color: '#737373',
    marginBottom: 8,
    fontWeight: '500',
  },
  translationText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#171717',
    marginBottom: 24,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 20,
  },
  exampleLabel: {
    fontSize: 13,
    color: '#737373',
    marginBottom: 8,
    fontWeight: '500',
  },
  exampleText: {
    fontSize: 16,
    color: '#171717',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  exampleTranslation: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  learnedBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(23, 23, 23, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  learnedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#171717',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  unknownButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e5e5',
  },
  knownButton: {
    backgroundColor: '#171717',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#171717',
  },
  knownButtonText: {
    color: '#fff',
  },
  tipText: {
    fontSize: 12,
    color: '#a3a3a3',
    textAlign: 'center',
  },
});
