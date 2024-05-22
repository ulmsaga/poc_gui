import custAxios from '../custAxios.js';

const getMmeList = (param) => { return custAxios.post('/poc_service/nw/config/getMmeList', param); };
const getEnbList = (param) => { return custAxios.post('/poc_service/nw/config/getEnbList', param); };
const getMmeTreeList = (param) => { return custAxios.post('/poc_service/nw/config/getMmeTreeList', param); };
const getEnbTreeList = (param) => { return custAxios.post('/poc_service/nw/config/getEnbTreeList', param); };

export { 
  getMmeList,
  getEnbList,
  getMmeTreeList,
  getEnbTreeList
}