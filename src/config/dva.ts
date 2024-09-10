import {create, Model} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';
import modelExtend from 'dva-model-extend';
import models from '@/models/index';
import homeModel from '@/models/home';

//1.创建实例
const app = create({});

//2.加载model对象
models.forEach(model => {
  app.model(model);
});
//3.通过app.use加载插件
app.use(createLoading());
//4.启动dva
app.start();
//5.导出dva数据
export default app._store;

interface Cached {
  [Key: string]: boolean;
}
const cached: Cached = {
  home: true,
};

function registerModel(model: Model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export function createHomeModel(namespace: string) {
  const model = modelExtend(homeModel, {namespace});
  registerModel(model);
}
