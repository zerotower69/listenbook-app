import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import http from '@/config/http';
import {RootState} from '@/models/index';

//轮播图URL
const CAROUSEL_URL = '/carousel';

//猜你喜欢URL
const GUESS_URL = '/guess';

//首页列表URL
const CHANNEL_URL = '/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGuess {
  id: string;
  title: string;
  image: string;
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
}

export interface HomeState {
  carousels: ICarousel[];
  guess: IGuess[];
  channels: IChannel[];
  pagination: IPagination;
  activeCarouselIndex: number;
  gradientVisible: boolean;
  // loading: boolean;
}
interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
    fetchChannels: Effect;
  };
}

const initialState: HomeState = {
  carousels: [],
  activeCarouselIndex: 0,
  guess: [],
  channels: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
  gradientVisible: true,
  // loading: false,
};

function delay(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined);
    }, timeout);
  });
}

const homeModel: HomeModel = {
  namespace: 'home',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      console.log('request carousels');
      // // @ts-ignore
      const {data} = yield call(http.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      console.log('request guess');
      const {data} = yield call(http.get, GUESS_URL);
      // console.log('guess data', data);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    *fetchChannels({callback, payload}, {call, put, select}) {
      console.log('request channels');
      const {channels, pagination} = yield select(
        (state: RootState) => state.home,
      );
      let page = 1;
      if (payload && payload.loadMore) {
        page = pagination.current + 1;
      }
      const {data} = yield call(http.get, CHANNEL_URL, {
        params: {
          page: page,
        },
      });
      let newChannels = data.results;
      if (payload && payload.loadMore) {
        newChannels = channels.concat(newChannels);
      }
      yield put({
        type: 'setState',
        payload: {
          channels: newChannels,
          pagination: {
            hasMore: newChannels.length < pagination.total,
            total: data.pagination.total,
            current: data.pagination.current,
          },
        },
      });
      if (typeof callback === 'function') {
        callback();
      }
    },
  },
};

export default homeModel;
