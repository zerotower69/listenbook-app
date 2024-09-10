import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootState} from '@/models/index';
import {RouteProp} from '@react-navigation/native';
import {HomeParamList} from '@/navigator/HomeTabs';
import {connect, ConnectedProps} from 'react-redux';
import Carousel, {sideHeight} from '@/pages/Home/Carousel';
import Guess from '@/pages/Home/Guess';
import ChannelItem from '@/pages/Home/ChannelItem';
import {IChannel} from '@/models/home';

//引入dva仓库
const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamList>},
) => {
  // const {namespace = 'home'} = route.params;
  const namespace = 'home';
  const home = state[namespace];
  return {
    namespace,
    loading: state.loading.effects[namespace + '/fetchChannels'],
    channels: home.channels,
    hasMore: home.pagination.hasMore,
    gradientVisible: home.gradientVisible,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}
interface IState {}
const Home: React.FC<IProps> = props => {
  const {dispatch, namespace, channels} = props;
  const [refreshing, setRefreshing] = useState(false);

  function onPress() {}
  function renderHeader() {
    return (
      <View>
        <Carousel namespace={namespace} />
        <View style={styles.background}>
          <Guess namespace={namespace} />
        </View>
      </View>
    );
  }
  function renderItem({item}: ListRenderItemInfo<IChannel>) {
    return <ChannelItem data={item} onPress={onPress} />;
  }

  function renderFooter() {
    const {hasMore, loading, channels} = props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>-- 我是有底线的 --</Text>
        </View>
      );
    } else if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.end}>
          <Text>正在加载中。。。</Text>
        </View>
      );
    }
    return (
      <View>
        <Text></Text>
      </View>
    );
  }

  function renderEmpty() {
    const {loading} = props;
    if (loading) return <></>;
    return (
      <View style={styles.empty}>
        <Text>无数据</Text>
      </View>
    );
  }

  function onRefresh() {
    //1.设置刷新标识
    setRefreshing(true);
    //2.获取数据
    dispatch({
      type: 'home/fetchChannels',
      //延迟，待数据加载完毕再设置刷新标识
      callback() {
        setRefreshing(false);
      },
    });
  }

  function onEndReached() {
    const {loading, hasMore, namespace} = props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: 'home/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  }

  function onScroll({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) {
    //此方法会被频繁地调度使用
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < sideHeight;
    const {gradientVisible, namespace} = props;
    if (newGradientVisible !== gradientVisible) {
      //防止多次提交重复的action
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  }

  useEffect(() => {
    //请求频道列表
    dispatch({
      type: 'home/fetchChannels',
    });
    //请求轮播图
    dispatch({
      type: 'home/fetchCarousels',
    });
  }, []);

  return (
    <FlatList
      data={channels}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      onScroll={onScroll}
    />
    // <View>
    //   <Text>Ho9mekjhhhh</Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});

export default connector(Home);
