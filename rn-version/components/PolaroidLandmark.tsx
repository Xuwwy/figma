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
    fontFamily: 'Caveat',
    marginBottom: 2,
  },
  coordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coords: {
    fontSize: 11.5,
    color: '#a8a29e',
    fontFamily: 'Caveat',
  },
});
