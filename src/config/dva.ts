import {create} from 'dva-core-ts';
import createLoading from 'dva-loading-ts';

//1.创建实例
const app = create({});

//2.加载model对象

//3.通过app.use加载插件
app.use(createLoading());
//4.启动dva
app.start();
//5.导出dva数据
export default app._store;
