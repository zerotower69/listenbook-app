import {DvaLoadingState} from 'dva-loading-ts';
import home from '@/models/home';
import category from '@/models/category';
import album from '@/models/album';

const models = [home, category, album];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  loading: DvaLoadingState;
} & {
  [Key: string]: typeof home.state;
};
export default models;
