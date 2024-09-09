import React from 'react';
import Touchable from '@/components/Touchable';
import {IChannel} from '@/models/home';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from '@/components/iconfont/Icon';

interface IProps {
  data: IChannel;
  onPress: (data: IChannel) => void;
}

const ChannelItem: React.FC<IProps> = props => {
  function onPress() {
    const {data, onPress} = props;
    if (typeof onPress === 'function') {
      //传递到父组件
      onPress(data);
    }
  }
  const {data} = props;
  return (
    <Touchable onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: data.image}} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {data.title}
          </Text>
          <Text style={styles.remark} numberOfLines={2}>
            {data.remark}
          </Text>
          <View style={styles.bottom}>
            <View style={styles.playedView}>
              <Icon name="V" size={14} />
              <Text style={styles.number}>{data.played}</Text>
            </View>
            <View style={styles.playingView}>
              <Icon name="shengyin" size={14} />
              <Text style={styles.number}>{data.playing}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#dedede',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  remark: {
    backgroundColor: '#f8f8f8',
    padding: 5,
    marginBottom: 5,
  },
  bottom: {
    flexDirection: 'row',
  },
  playedView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  playingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    marginLeft: 5,
  },
});

export default React.memo(ChannelItem);
