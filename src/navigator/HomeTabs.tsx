import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';

export type HomeParamList = {
  [Key: string]: {
    namespace: string;
  };
};
const Tab = createMaterialTopTabNavigator<HomeParamList>();

export interface HomeTabsProps {
  name: string;
}
const HomeTabs: React.FC<HomeTabsProps> = props => {
  return (
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
      }}
    />
  );
};

export default HomeTabs;
