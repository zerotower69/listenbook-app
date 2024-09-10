import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Icon from '@/components/iconfont/Icon';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({home}: RootState) => {
  return {
    guess: home.guess,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  namespace: string;
}

const Guess: React.FC<IProps> = props => {
  const {dispatch, namespace, guess} = props;
  //获取数据
  function fetchData() {
    dispatch({
      type: 'home/fetchGuess',
    });
  }

  function renderItem({item}: {item: IGuess}) {
    return (
      <Touchable style={styles.item} onPress={() => {}}>
        <Image source={{uri: item.image}} style={styles.image} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="xihuan" />
          <Text style={styles.headerTitle}>猜你喜欢</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.more}>更多</Text>
          <Icon name="more" />
        </View>
      </View>
      <FlatList
        data={guess}
        renderItem={renderItem}
        style={styles.list}
        numColumns={3}
        keyExtractor={item => item.id}
      />
      <Touchable style={styles.changeGuess} onPress={fetchData}>
        <Icon name="huanyipi" color="red" />
        <Text style={styles.changeGuessText}>换一批</Text>
      </Touchable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    // padding: 2,
    margin: 16,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: '#ccc',
    //注意：这一句是可以让安卓拥有灰色阴影
    elevation: 4,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#efefef',
    //不直接使用1的原因是当前的手机大多分辨率很高，这个值是经过计算后的
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  more: {
    color: '#6f6f6f',
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changeGuessText: {
    marginLeft: 5,
  },
  list: {
    padding: 10,
  },
});
export default connector(Guess);
