import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
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
  }, []);
  return (
    <View style={styles.container}>
      {RenderHeader(headerHeight, summary, author, route)}
      <Tab />
    </View>
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
