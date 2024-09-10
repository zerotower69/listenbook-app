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
import CategoryItem from '@/pages/Category/CategoryItem';
import {ICategory} from '@/models/category';
import {createHomeModel} from '@/config/dva';

const MemoHome = React.memo(Home);

export type HomeParamList = {
  [Key: string]: {
    namespace: string;
  };
};
const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = (state: RootState) => {
  const {category} = state;
  return {
    myCategories: category.myCategories,
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

const RenderScreen = (item: ICategory) => {
  createHomeModel(item.id);
  return (
    <Tab.Screen
      key={item.id}
      name={item.id}
      component={Home}
      options={{
        tabBarLabel: item.name,
      }}
      initialParams={{
        namespace: item.id,
      }}
    />
  );
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
          padding: 0,
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
          width: 350,
        },
        tabBarActiveTintColor: '#f86442',
        tabBarInactiveTintColor: '#333',
        lazy: true,
      }}>
      {/*根据myCategories 动态生成组件*/}
      {(props.myCategories || []).map(item => RenderScreen(item))}
      {/*<Tab.Screen*/}
      {/*  name="Home"*/}
      {/*  component={Home}*/}
      {/*  options={{*/}
      {/*    tabBarLabel: '推荐',*/}
      {/*  }}*/}
      {/*/>*/}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    // 占据的屏幕样式
    backgroundColor: 'transparent',
  },
  tab: {
    width: 300,
  },
});

export default connector(HomeTabs);
