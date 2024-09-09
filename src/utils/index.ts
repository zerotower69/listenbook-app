import {Dimensions} from 'react-native';
import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import React from 'react';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

//根据百分比获取宽度
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

/**
 * 获取嵌套路由中的当前页面路由名
 * @param state
 */
function getActionRouteName(state: NavigationState) {
  let route = state.routes[state.index];
  while (route.state && route.state.index) {
    //@ts-ignore
    route = route.state.routes[route.state.index]!;
  }
  return route.name;
}

const navigationRef = React.createRef<NavigationContainerRef<string>>();
function navigate(name: string, params?: any) {
  //@ts-ignore
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}
export {
  viewportWidth,
  viewportHeight,
  wp,
  hp,
  getActionRouteName,
  navigationRef,
  navigate,
  goBack,
};
