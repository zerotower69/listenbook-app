import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {ICategory} from '@/models/category';

interface IProps {
  disabled: boolean;
  selected: boolean;
  isEdit: boolean;
  data: ICategory;
}

const parentWidth = viewportWidth - 10;
const itemWidth = parentWidth / 4;

const CategoryItem: React.FC<IProps> = props => {
  const {data, isEdit, selected, disabled} = props;
  return (
    <View key={data.id} style={styles.itemWrapper}>
      <View style={[styles.item, disabled && styles.disabled]}>
        <Text>{data.name}</Text>
        {isEdit && !disabled && (
          <View style={styles.icon}>
            <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {width: itemWidth, height: 48},
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 16,
    width: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f86442',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: 15,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
});

export default CategoryItem;
