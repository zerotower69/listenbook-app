/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

import store from '@/config/dva';

import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.background}>
        {/*设置安卓头部状态栏*/}
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
