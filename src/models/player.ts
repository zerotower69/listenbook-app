import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import http from '@/config/http';
import {init, play} from '@/config/sound';

const SHOW_URL = '/show';

export interface PlayerModelState {
  id: string;
  soundUrl: string;
  playState: string;
}

export interface PlayerModel extends Model {
  namespace: 'player';
  state: PlayerModelState;
  reducers: {
    setState: Reducer<PlayerModelState>;
  };
  effects: {
    fetchShow: Effect;
    play: Effect;
  };
}

const initialState: PlayerModelState = {
  id: '',
  soundUrl: '',
  playState: '',
};

const playerModel: PlayerModel = {
  namespace: 'player',
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
    *fetchShow({payload}, {call, put, select}) {
      const {data} = yield call(http.get, SHOW_URL);
      yield put({
        type: 'setState',
        payload: {
          id: data.id,
          soundUrl: data.soundUrl,
        },
      });
      //@ts-ignore
      const selector = yield select(state => state);
      // console.log('get audio data', data, selector);
      yield call(init, data.soundUrl);
      yield put({
        type: 'play',
      });
    },
    *play(action, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      yield call(play);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
    },
  },
};

export default playerModel;
