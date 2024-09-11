import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {IProgram} from '@/models/album';
import Item from '@/pages/Album/List/Item';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

const List: React.FC<IProps> = props => {
  const {list} = props;

  const onItemPress = useCallback((data: IProgram) => {}, []);
  const renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={onItemPress} />;
  };
  const keyExtractor = (item: IProgram) => item.id;
  return (
    <FlatList
      style={styles.container}
      data={list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(List);
