import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import http from '@/config/http';

const ALBUM_URL = '/album/list';

//节目接口
export interface IProgram {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  date: string;
}

//作者接口
export interface IAuthor {
  name: string;
  avatar: string;
}

//
export interface IAlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  introduction: string;
  author: IAuthor;
  list: IProgram[];
}

interface AlbumModel extends Model {
  namespace: 'album';
  state: IAlbumModelState;
  effects: {
    fetchAlbum: Effect;
  };
  reducers: {
    setState: Reducer<IAlbumModelState>;
  };
}

const initialState: IAlbumModelState = {
  id: '',
  thumbnailUrl: '',
  title: '',
  summary: '',
  list: [],
  introduction: '',
  author: {
    name: '',
    avatar: '',
  },
};

const albumMNodel: AlbumModel = {
  namespace: 'album',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchAlbum({payload}, {call, put}) {
      const {data} = yield call(http.get, ALBUM_URL, {
        params: {
          id: payload.id,
        },
      });
      // console.log('album data', data);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
};

export default albumMNodel;
