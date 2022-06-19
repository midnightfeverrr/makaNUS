import React, { useState } from 'react';
import Navigation from './navigators';
import { SafeAreaView } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

// Font
import useFonts from './hooks/useFonts';

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
  <SafeAreaView style={{flex:1}}>
       <Navigation />
  </SafeAreaView>
  )
}