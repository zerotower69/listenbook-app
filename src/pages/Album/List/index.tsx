import React, {useCallback} from 'react';
import {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Animated,
} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {IProgram} from '@/models/album';
import Item from '@/pages/Album/List/Item';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {ITabProps} from '@/pages/Album/Tab';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

const List: React.FC<IProps> = props => {
  const {list, panRef, nativeRef, onScrollDrag} = props;

  const onItemPress = useCallback((data: IProgram) => {}, []);
  const renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={onItemPress} />;
  };
  const keyExtractor = (item: IProgram) => item.id;
  console.log('onScrollTag--', onScrollDrag);
  return (
    // 通过这个组件可以拦截FlatList自带的滚动效果
    <NativeViewGestureHandler simultaneousHandlers={panRef} ref={nativeRef}>
      <Animated.FlatList
        style={styles.container}
        data={list}
        bounces={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollBeginDrag={onScrollDrag}
        onScrollEndDrag={onScrollDrag}
      />
    </NativeViewGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(List);
