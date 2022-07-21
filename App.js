import React, { useState, useCallback, useEffect } from 'react';
import Navigation from './navigators';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Holder, LandingLogo } from './components/styles'
import useFonts from './hooks/useFonts';

export default function App() {
  const [IsReady, SetIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        SetIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [IsReady]);

  if (!IsReady) {
    return (
      <Holder>
          <LandingLogo
            onLayout={onLayoutRootView}
            source={require('./assets/Logo.png')}
          />
      </Holder>
    )
  }

  return (
  <SafeAreaView style={{flex:1}}>
       <Navigation />
  </SafeAreaView>
  )
}