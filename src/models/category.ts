import {Effect, Model, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {RootState} from '@/models/index';

const CATEGORY_URL = '/category';

export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}

interface CategoryModelState {
  myCategories: ICategory[];
  categories: ICategory[];
  isEdit: boolean;
}

interface CategoryModel extends Model {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    loadData: Effect;
    toggle: Effect;
  };
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState: CategoryModelState = {
  myCategories: [
    {
      id: 'home',
      name: '推荐',
    },
    {
      id: 'vip',
      name: 'Vip',
    },
  ],
  categories: [],
  isEdit: false,
};

const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initialState,
  effects: {
    *loadData(_, {call, put}) {
      //从storage获取数据
      // @ts-ignore
      const myCategories = yield call(load, {key: 'myCategories'});
      //@ts-ignore
      const categories = yield call(load, {key: 'categories'});
      //发起action,将数据保存到state
      if (myCategories) {
        yield put({
          type: 'setState',
          payload: {
            myCategories,
            categories,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            categories,
          },
        });
      }
    },
    *toggle({payload}, {put, select}) {
      // @ts-ignore
      const category = yield select((state: RootState) => state.category);
      const myCategories = payload?.myCategories ?? category.myCategories;
      yield put({
        type: 'setState',
        payload: {
          isEdit: payload?.isEdit ?? !category.isEdit,
          myCategories: myCategories,
        },
      });
      //如果是编辑状态，将选择的这些标签用本地存储存下来
      if (category.isEdit) {
        storage.save({
          key: 'myCategories',
          data: myCategories,
        });
      }
    },
  },
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({dispatch}) {
      // dispatch({type: 'loadData'});
    },
    asyncStorage() {
      // storage.sync.categories = async () => {
      //   const data = await axios.get(CATEGORY_URL);
      //   // {status:100,data:{}}
      //   return data.data;
      // };
      // storage.sync.myCategories = async () => {
      //   return null;
      // };
    },
  },
};

export default categoryModel;
