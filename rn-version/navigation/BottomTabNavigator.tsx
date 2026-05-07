import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

type TabRoute = 'home' | 'learn' | 'journey' | 'profile';

interface BottomTabNavigatorProps {
  activeTab: TabRoute;
  onTabChange: (tab: TabRoute) => void;
}

// SVG图标组件
function HomeIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#171717' : '#a3a3a3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <Path d="M9 22V12h6v10" />
    </Svg>
  );
}

function LearnIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#171717' : '#a3a3a3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </Svg>
  );
}

function JourneyIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#171717' : '#a3a3a3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="10" r="3" />
      <Path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 6.9 8 11.7z" />
    </Svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#171717' : '#a3a3a3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </Svg>
  );
}

const tabs = [
  { key: 'home' as TabRoute, icon: HomeIcon, label: '首页' },
  { key: 'learn' as TabRoute, icon: LearnIcon, label: '学习' },
  { key: 'journey' as TabRoute, icon: JourneyIcon, label: '旅程' },
  { key: 'profile' as TabRoute, icon: ProfileIcon, label: '我的' },
];

export function BottomTabNavigator({ activeTab, onTabChange }: BottomTabNavigatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tabItem}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.7}
            >
              <View style={[styles.tabContent, isActive && styles.tabContentActive]}>
                <View style={styles.tabIconContainer}>
                  <IconComponent active={isActive} />
                </View>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Home Indicator */}
      {Platform.OS === 'ios' && <View style={styles.homeIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 4 : 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tabContentActive: {
    backgroundColor: 'rgba(23, 23, 23, 0.05)',
  },
  tabIconContainer: {
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    color: '#a3a3a3',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#171717',
    fontWeight: '600',
  },
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#171717',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
});
