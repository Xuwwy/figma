import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { HomeScreen, LearnScreen, JourneyScreen, ProfileScreen } from './screens';
import { BottomTabNavigator } from './navigation/BottomTabNavigator';

type TabRoute = 'home' | 'learn' | 'journey' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabRoute>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'learn':
        return <LearnScreen />;
      case 'journey':
        return <JourneyScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenContainer}>{renderScreen()}</View>
      <BottomTabNavigator activeTab={activeTab} onTabChange={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
});
