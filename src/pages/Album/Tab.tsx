import React, {useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar, SceneRendererProps} from 'react-native-tab-view';
import Introduction from './Introduction';
import AlbumList from './List';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panRef: React.RefObject<PanGestureHandler | undefined>;
  tapRef: React.RefObject<TapGestureHandler | undefined>;
  nativeRef: React.RefObject<NativeViewGestureHandler | undefined>;
  onScrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const Tab: React.FC<ITabProps> = props => {
  const [tabIndex, setTabIndex] = useState(1);
  function onTabIndexChange(index: number) {
    setTabIndex(index);
  }

  function renderScene({route}: {route: IRoute}) {
    const {panRef, tapRef, nativeRef, onScrollDrag} = props;
    // console.log('onScrollDrag', typeof onScrollDrag, onScrollDrag);
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return (
          <AlbumList
            panRef={panRef}
            tapRef={tapRef}
            nativeRef={nativeRef}
            onScrollDrag={onScrollDrag}
          />
        );
    }
  }
  function renderTabBar(props: SceneRendererProps & {navigationState: IState}) {
    return (
      <TabBar
        {...props}
        scrollEnabled
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelStyle}
        style={styles.tabBarStyle}
        contentContainerStyle={styles.tabBarContainer}
        indicatorStyle={styles.indicatorStyle}
        indicatorContainerStyle={styles.indicatorContainer}
      />
    );
  }
  return (
    <TabView
      onIndexChange={onTabIndexChange}
      navigationState={{
        routes: [
          {key: 'introduction', title: '简介'},
          {key: 'albums', title: '节目'},
        ],
        index: tabIndex,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      sceneContainerStyle={styles.tabViewContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    width: 80,
  },
  labelStyle: {
    color: '#333',
  },
  tabViewContainerStyle: {
    backgroundColor: '#fff',
  },
  tabBarContainer: {},
  tabBarStyle: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  //指示器样式
  indicatorStyle: {
    //指示器设置一个橘黄色
    backgroundColor: '#eb6d48',
    //设置指示器的边框的宽度,这样设置也只是一种视觉效果上的欺骗
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: '#fff',
  },
  indicatorContainer: {
    elevation: 0,
  },
});

export default Tab;
