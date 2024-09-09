import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  size: 1000, //最大容量
  storageBackend: AsyncStorage, //指定数据的引擎
  defaultExpires: 1000 * 3600 * 24 * 7, //缓存一个星期，none为永远不回过期
  enableCache: true,
  sync: {},
});

//!为啥要自定义封装一次
const load = (params: LoadParams) => {
  return storage.load(params);
};

export {load};

export default storage;
