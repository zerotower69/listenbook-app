import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import getStatusBarHeight from 'react-native-screens/lib/typescript/native-stack/utils/getStatusBarHeight';
import LinearAnimatedGradient from 'react-native-linear-animated-gradient-transition';
import {RootState} from '@/models/index';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {getActionRouteName} from '@/utils/index';
import {connect, ConnectedProps} from 'react-redux';
import Touchable from '@/components/Touchable';
import {Dimensions, StatusBar} from 'react-native';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActionRouteName(props.state);
  const modelState = state[routeName];
  return {
    // activeIndex: modelState.activeCarouselIndex,
    // linearColors: modelState.carousels
    //   ? modelState.carousels[modelState.activeCarouselIndex]?.colors ??
    //     undefined
    //   : undefined,
    // gradientVisible: modelState.gradientVisible,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

const TopTabBarWrapper: React.FC<IProps> = props => {
  function renderLinearGradient() {
    // const {linearColors = ['#ccc', '#1212'], gradientVisible} = props;
    // //渐变色只有轮播图在可视区域内显示
    // if (gradientVisible) {
    //   return <LinearAnimatedGradient />;
    // } else {
    //   return null;
    // }
    return null;
  }

  function goCategory() {
    const {navigation} = props;
    navigation.navigate('Category');
  }
  const {gradientVisible = false, ...restProps} = props;
  let textStyle = styles.whiteText;
  if (gradientVisible) {
    textStyle = styles.whiteText;
  } else {
    textStyle = styles.text;
  }
  return (
    <View style={styles.container}>
      {renderLinearGradient()}
      <View style={styles.topTabBarView}>
        <MaterialTopTabBar {...restProps} />
        <Touchable style={styles.categoryBtn} onPress={() => goCategory()}>
          <Text style={textStyle}>分类</Text>
        </Touchable>
      </View>
    </View>
  );
};

export default connector(TopTabBarWrapper);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // paddingTop: getStatusBarHeight(),
    ...Platform.select({
      android: {
        //ios设置了会导致头部空白过多
        paddingTop: STATUSBAR_HEIGHT,
      },
    }),
  },
  tabBar: {
    flex: 1,
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  topTabBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#eee',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 20,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
});
