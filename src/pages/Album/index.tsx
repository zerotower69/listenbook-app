import React, {useEffect, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
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
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';

const HEADER_HEIGHT = 260;

const USE_NATIVE_DRIVER = true;

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
  const RANGE = [-(HEADER_HEIGHT - headerHeight), 0];

  const panRef = useRef<PanGestureHandler>();
  const tapRef = useRef<TapGestureHandler>();
  const nativeRef = useRef<NativeViewGestureHandler>();

  let translationYValue = useRef(0).current;
  //偏移值
  const translationYOffset = useRef(new Animated.Value(0)).current;
  const translationY2 = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(new Animated.Value(0)).current;
  const reverseLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    lastScrollY,
  );
  let lastScrollYValue = useRef(0).current;

  const translateY = Animated.add(
    Animated.add(translationY2, reverseLastScrollY),
    translationYOffset,
  );
  const onScrollDrag = Animated.event(
    [{nativeEvent: {contentOffset: {y: lastScrollY}}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      // listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      //   lastScrollYValue = nativeEvent.contentOffset.y;
      // },
    },
  );
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: translationY2}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER, //TODO:启动原生动画的驱动
    },
  );
  const onHandlerStateChange = ({
    nativeEvent,
  }: PanGestureHandlerStateChangeEvent) => {
    //是否处于活动状态
    if (nativeEvent.oldState === State.ACTIVE) {
      //Y轴方向下的累计手势位移
      let {translationY} = nativeEvent;
      translationY -= lastScrollYValue;
      //Animated.Value : value + offset
      translationYOffset.extractOffset(); //设置offset属性，清空value值
      translationYOffset.setValue(translationY);
      //将value = value+offset,将每次拖动累计起来
      translationYOffset.flattenOffset();
      translationY2.setValue(0);
      translationYValue += translationY;
      let maxDeltaY = -RANGE[0] - translationYValue;
      if (translationYValue < RANGE[0]) {
        translationYValue = RANGE[0];
        Animated.timing(translationYOffset, {
          toValue: RANGE[0],
          duration: 1000,
          useNativeDriver: true,
        }).start();
        maxDeltaY = RANGE[1];
      } else if (translationYValue > RANGE[1]) {
        //手指向上拖动超过时
        translationYValue = RANGE[1];
        Animated.timing(translationYOffset, {
          toValue: RANGE[1],
          duration: 1000,
          useNativeDriver: true,
        }).start();
        maxDeltaY = -RANGE[0];
      }
      if (tapRef.current) {
        const tap: any = tapRef.current;
        tap.setNativeProps({
          maxDeltaY,
        });
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
    navigation.setOptions({
      headerTitleStyle: {
        opacity: translateY.interpolate({
          inputRange: RANGE,
          outputRange: [1, 0],
        }),
      },
    });
    // navigation.setParams({
    //   opacity: translateY.interpolate({
    //     inputRange: RANGE,
    //     outputRange: [1, 0],
    //   }),
    // });
    // console.log('index onGestureEvent', typeof onGestureEvent, onGestureEvent);
  }, []);
  return (
    // <View style={styles.container}>
    //   {RenderHeader(headerHeight, summary, author, route)}
    //   <Tab />
    // </View>
    <TapGestureHandler ref={tapRef} maxDeltaY={-RANGE[0]}>
      <View style={styles.rootContainer}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onGestureEvent}
          simultaneousHandlers={[tapRef, nativeRef]}
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
              <Tab
                panRef={panRef}
                tapRef={tapRef}
                nativeRef={nativeRef}
                onScrollDrag={onScrollDrag}
              />
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </TapGestureHandler>
  );
};

// function Wrapper(){
//   const headerHeight = useHeaderHeight()
//   return <Album headerHeight={headerHeight}/>
// }

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
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
