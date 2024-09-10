import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {StyleSheet} from 'react-native';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';

export type HomeParamList = {
  [Key: string]: {
    namespace: string;
  };
};
const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = (state: RootState) => {
  const {home, category} = state;
  // console.log(category);
  return {
    gradientVisible: home.gradientVisible,
    // myCategories: category.myCategories,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

export interface HomeTabsProps extends ModelState {
  name: string;
}

const RenderBar: React.FC<MaterialTopTabBarProps> = props => {
  return <TopTabBarWrapper {...props} />;
};
const HomeTabs: React.FC<HomeTabsProps> = props => {
  return (
    <Tab.Navigator
      tabBar={RenderBar}
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 80,
        },
        tabBarIndicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: '#f86442',
        },
        tabBarStyle: {
          // 设置这里才能做到真正的透明
          backgroundColor: 'transparent',
        },
        tabBarActiveTintColor: '#f86442',
        tabBarInactiveTintColor: '#333',
        lazy: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default connector(HomeTabs);
