import React, {FunctionComponent, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp, TabNavigationState} from '@react-navigation/native';
import {RootStackNavigation, RootStackParamList} from './index';
import HomeTabs, {HomeTabsProps} from './HomeTabs';
import Icon from '@/components/iconfont/Icon';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {navigationRef} from '@/utils/index';

export type BottomTabParamList = {
  HomeTabs: any;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState<any>;
};
interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

//获取页面头部标题
function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '我的';
    default:
      return '首页';
  }
}

const BottomTabs: React.FC<IProps> = props => {
  //动态设置头部标题
  function setHeaderTitle() {
    const {navigation, route} = props;
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'HomeTabs';
    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
        headerShown: false,
      });
    } else {
      const title = getHeaderTitle(routeName);
      navigation.setOptions({
        headerTitle: title,
      });
    }
  }

  //首次挂载和更新都能触发
  useEffect(() => {
    setHeaderTitle();
  });
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTabs"
        //@ts-ignore
        component={HomeTabs}
        options={{
          tabBarLabel: '首页',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="shouye" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Listen"
        component={Listen}
        options={{
          tabBarLabel: '我听',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="shoucang" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Found"
        component={Found}
        options={{
          tabBarLabel: '发现',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="faxian" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: '我的',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
