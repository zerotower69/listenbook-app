import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {navigationRef} from '@/utils/index';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import {Animated, Platform, StatusBar, StyleSheet} from 'react-native';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.AnimatedInterpolation<string | number>;
  };
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

function getAlbumOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}): StackNavigationOptions {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    //设置头部标题的样式
    headerTitleStyle: {
      opacity: route.params.opacity,
    },
    headerBackground: () => {
      return (
        <Animated.View
          style={[styles.headerBackground, {opacity: route.params.opacity}]}
        />
      );
    },
  };
}
const Navigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={
          {
            // headerMode: 'float',
            // headerTitleAlign: 'center',
            // headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // gestureEnabled: true,
            // gestureDirection: 'horizontal',
            // ...Platform.select({
            //   android: {
            //     headerStatusBarHeight: StatusBar.currentHeight,
            //   },
            // }),
            // headerBackTitleVisible: false,
            // headerTintColor: '#333',
            // headerStyle: {
            //   ...Platform.select({
            //     android: {
            //       elevation: 0,
            //       borderBottomWidth: StyleSheet.hairlineWidth,
            //     },
            //   }),
            // },
          }
        }>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerTitle: '首页',
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerTitle: '分类',
          }}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={getAlbumOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

export default Navigator;
