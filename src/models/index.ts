import {DvaLoadingState} from 'dva-loading-ts';
import home from '@/models/home';
import category from '@/models/category';

const models = [home, category];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  loading: DvaLoadingState;
} & {
  [Key: string]: typeof home.state;
};
export default models;
