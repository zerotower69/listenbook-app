import React, {FunctionComponent} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp, TabNavigationState} from '@react-navigation/native';
import {RootStackNavigation, RootStackParamList} from './index';
import HomeTabs, {HomeTabsProps} from './HomeTabs';

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
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTabs"
        //@ts-ignore
        component={HomeTabs}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
