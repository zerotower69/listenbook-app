import Touchable from '@/components/Touchable';
import {IProgram} from '@/models/album';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from '@/components/iconfont/Icon';

interface IProps {
  data: IProgram;
  index: number;
  onPress: (data: IProgram, index: number) => void;
}

const Item: React.FC<IProps> = props => {
  const {data, index, onPress} = props;
  const onItemPress = useCallback(() => {
    const {onPress} = props;
    if (typeof onPress === 'function') {
      onPress(data, index);
    }
  }, []);
  return (
    <Touchable style={styles.item} onPress={onItemPress}>
      <Text style={styles.serial}>{index + 1}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.info}>
          <View style={styles.playVolume}>
            <Icon name="V" color={'#939393'} />
            <Text style={styles.infoText}>{data.playVolume}</Text>
          </View>
          <View style={styles.duration}>
            <Icon name="time" color={'#939393'} size={14} />
            <Text style={styles.infoText}>{data.duration}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.date}>{data.date}</Text>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: 25,
  },
  serial: {
    fontSize: 14,
    color: '#838383',
    // marginRight: 25,
  },
  title: {
    fontWeight: '500',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
  },
  playVolume: {
    marginRight: 10,
    flexDirection: 'row',
  },
  infoText: {
    marginHorizontal: 5,
    color: '#939393',
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#939393',
  },
});

export default Item;
