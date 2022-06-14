import React from 'react';
import Navigation from './navigators';
import { SafeAreaView } from 'react-native';

// React navigation stack
import RootStack from './navigators/RootStack'
import HomePage from './screens/HomePage';

export default function App() {
  return (
  <SafeAreaView style={{flex:1}}>
       <Navigation />
  </SafeAreaView>
  )
}