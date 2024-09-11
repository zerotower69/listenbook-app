/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Alert} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
  getJSExceptionHandler,
} from 'react-native-exception-handler';

import store from '@/config/dva';

import {Provider} from 'react-redux';
import Navigator from '@/navigator/index';

const customErrorHandler = (e: Error, isFatal: boolean) => {
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          text: 'Close',
          // onPress: () => {
          //   RNExitApp.exitApp();
          // },
        },
      ],
    );
  } else {
    console.log('get error'); // So that we can see it in the ADB logs in case of Android if needed
    // Alert.alert('error occur', e.message);
  }
};
const previousErrorHandler = getJSExceptionHandler(); // by default u will get the red screen error handler here
const errorHandler = (e: Error, isFatal: boolean) => {
  customErrorHandler(e, isFatal);
  previousErrorHandler(e, isFatal);
};
// setJSExceptionHandler(errorHandler, true);
//
// setNativeExceptionHandler(errorString => {
//   console.log('setNativeExceptionHandler', errorString);
// });

class App extends React.Component {
  render() {
    //@ts-ignore 检查hermes是否已经存在
    const isHermes = () => !!global.HermesInternal;
    console.log('isHermes', isHermes());
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.background}>
          {/*设置安卓头部状态栏*/}
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent
          />
          <Navigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
