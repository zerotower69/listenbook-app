import React, {useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {TabView, TabBar, SceneRendererProps} from 'react-native-tab-view';
import Introduction from './Introduction';
import AlbumList from './List';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

interface IProps {}

const Tab: React.FC<IProps> = props => {
  const [tabIndex, setTabIndex] = useState(1);
  function onTabIndexChange(index: number) {
    setTabIndex(index);
  }

  function renderScene({route}: {route: IRoute}) {
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <AlbumList />;
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

class Tab2 extends React.Component<IProps> {
  state = {
    tabIndex: 1,
  };
  onIndexChange = (index: number) => {
    this.setState({
      tabIndex: index,
    });
  };

  renderScene = ({route}: {route: IRoute}) => {
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return <AlbumList />;
    }
  };
  renderTabBar = (props: SceneRendererProps & {navigationState: IState}) => {
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
        android_ripple={{
          radius: 0,
          borderless: true,
          color: 'transparent',
        }}
      />
    );
  };
  render() {
    return (
      <TabView
        onIndexChange={this.onIndexChange}
        navigationState={{
          routes: [
            {key: 'introduction', title: '简介'},
            {key: 'albums', title: '节目'},
          ],
          index: this.state.tabIndex,
        }}
        renderTabBar={this.renderTabBar}
        renderScene={this.renderScene}
        sceneContainerStyle={{
          backgroundColor: '#fff',
        }}
      />
    );
  }
}

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
