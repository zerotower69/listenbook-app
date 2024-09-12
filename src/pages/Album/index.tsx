import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Text, Animated} from 'react-native';
import {BlurView} from '@react-native-community/blur';
//v6
import {useHeaderHeight} from '@react-navigation/elements';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {RootStackNavigation, RootStackParamList} from '@/navigator/index';
import {IAuthor} from '@/models/album';
import Tab from './Tab';

import coverRight from '@/assets/cover-right.png';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'Album'>;
  navigation: RootStackNavigation;
  headerHeight: number;
}

const RenderHeader = (
  height: number,
  summary: string,
  author: IAuthor,
  route: IProps['route'],
) => {
  const {image, title} = route.params.item;
  // console.log('image', image, author.avatar);
  //TODO:频道页面头像图片似乎有问题
  const avatarUrl = 'http://dummyimage.com/32x32/f1f279/d079f2.png&text=汤敏';
  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: height,
        },
      ]}>
      <Image source={{uri: image}} style={styles.backgroundImage} />
      {/*blurAmount的默认值似乎是10*/}
      <BlurView blurAmount={5} style={StyleSheet.absoluteFillObject} />
      <View style={styles.leftView}>
        <Image source={{uri: image}} style={styles.thumbnailImage} />
        <Image source={coverRight} style={styles.coverRight} />
      </View>
      <View style={styles.rightView}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.summary}>
          <Text style={styles.summaryText} numberOfLines={1}>
            {summary}
          </Text>
        </View>
        <View style={styles.authorInfo}>
          <Image source={{uri: avatarUrl}} style={styles.authorAvatar} />
          <Text style={styles.nameText}>{author.name}</Text>
        </View>
      </View>
    </View>
  );
};

const Album: React.FC<IProps> = props => {
  const {dispatch, route, navigation, summary, author} = props;
  //获取标题栏的高度
  const headerHeight = useHeaderHeight();

  const HEADER_HEIGHT = 260;

  const RANGE = [-(HEADER_HEIGHT - headerHeight), 0];

  let translationYValue = 0;
  //偏移值
  const translationYOffset = new Animated.Value(0);
  const translationY2 = new Animated.Value(0);
  // const onGestureEvent=(e: PanGestureHandlerGestureEvent) =>{
  //   //e.nativeEvent.translationY 手指拖动的距离
  //   console.log(e.nativeEvent.translationY);
  // }
  const translateY = Animated.add(translationY2, translationYOffset);
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translationY2}}],
    {
      useNativeDriver: true, //TODO:启动原生动画的驱动
    },
  );
  const onHandlerStateChange = ({
    nativeEvent,
  }: PanGestureHandlerStateChangeEvent) => {
    //是否处于活动状态
    if (nativeEvent.oldState === State.ACTIVE) {
      //Y轴方向下的累计手势位移
      let {translationY} = nativeEvent;
      //Animated.Value : value + offset
      translationYOffset.extractOffset(); //设置offset属性，清空value值
      translationYOffset.setValue(translationY);
      //将value = value+offset,将每次拖动累计起来
      translationYOffset.flattenOffset();
      translationY2.setValue(0);
      translationYValue += translationY;
      if (translationYValue < RANGE[0]) {
        translationYValue = RANGE[0];
        Animated.timing(translationYOffset, {
          toValue: RANGE[0],
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else if (translationYValue > RANGE[1]) {
        //手指向上拖动超过时
        translationYValue = RANGE[1];
        Animated.timing(translationYOffset, {
          toValue: RANGE[1],
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    }
  };
  //componentWillMount
  useEffect(() => {
    const {id} = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
    navigation.setOptions({
      headerBackTitle: '返回',
    });
    // Animated.timing(translateY as Animated.Value, {
    //   toValue: 0,
    //   duration: 3 * 1000,
    //   useNativeDriver: false,
    // }).start(() => {});
    // console.log('props', props.headerHeight);
  }, []);
  return (
    // <View style={styles.container}>
    //   {RenderHeader(headerHeight, summary, author, route)}
    //   <Tab />
    // </View>
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: RANGE,
                  outputRange: RANGE,
                  //如果translateY的值超过了范围就不处理
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        {RenderHeader(headerHeight, summary, author, route)}
        <View style={{height: viewportHeight - headerHeight}}>
          <Tab />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

// function Wrapper(){
//   const headerHeight = useHeaderHeight()
//   return <Album headerHeight={headerHeight}/>
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 260,
    flexDirection: 'row',
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  thumbnailImage: {
    width: 98,
    height: 98,
    //图片设置边框
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -20,
    zIndex: -1,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  summary: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  summaryText: {
    color: '#fff',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: '#fff',
  },
  authorAvatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 8,
  },
});

export default connector(Album);
