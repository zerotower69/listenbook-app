import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
  TransitionPreset,
} from '@react-navigation/stack';
import React from 'react';
import {
  NavigationContainer,
  RouteProp,
  NavigationState,
} from '@react-navigation/native';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {navigationRef} from '@/utils/index';
import BottomTabs from './BottomTabs';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{
            headerTitle: '首页',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
