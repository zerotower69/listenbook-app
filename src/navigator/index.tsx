import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {navigationRef} from '@/utils/index';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Album from '@/pages/Album';
import {Animated, Platform, StatusBar, StyleSheet} from 'react-native';
import Detail from '@/pages/Detail';
import Icon from '@/components/iconfont/Icon';

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

export type ModalStackParamList = {
  Root: undefined;
  Detail: {
    id: string;
  };
};

const ModalStack = createStackNavigator<ModalStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerMode: 'screen',
        //设置属性，让Android和IOS两侧的样式保持统一
        headerTitleAlign: 'center', //头部标题居中
        gestureEnabled: true, //允许开启手势
        ...TransitionPresets.ModalPresentationIOS,
        headerBackTitleVisible: false,
      }}>
      <ModalStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{
          //Root头部名称不需要显示
          headerShown: false,
        }}
      />
      <ModalStack.Screen
        name="Detail"
        component={Detail}
        options={{
          //假装让标题栏透明
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: '#807c66',
          },
          headerBackImage: ({tintColor}) => (
            <Icon
              name="down"
              color={tintColor}
              size={30}
              style={styles.headerBackImage}
            />
          ),
        }}
      />
    </ModalStack.Navigator>
  );
}
function RootStackScreen() {
  return (
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
      <Stack.Screen name="Album" component={Album} options={getAlbumOptions} />
    </Stack.Navigator>
  );
}
const Navigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      {ModalStackScreen()}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
  headerBackImage: {
    // marginVertical: 5,
    //统一外边距
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});

export default Navigator;
