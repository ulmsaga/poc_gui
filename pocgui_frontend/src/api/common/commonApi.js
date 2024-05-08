import custAxios from '../custAxios.js';

const getNmsCondList = (param) => { return custAxios.post('/dgw_service/common/getNmsCondList', param); };
const getProtocolCondList = (param) => { return custAxios.post('/dgw_service/common/getProtocolCondList', param); };
const getStatusCondList = (param) => { return custAxios.post('/dgw_service/common/getStatusCondList', param); };
const getManagerCondList = (param) => { return custAxios.post('/dgw_service/common/getManagerCondList', param); };
const getConds = (param) => { custAxios.post('/dgw_service/common/getConds', param); };
const getInterfaceCycleCondList = (param) => { return custAxios.post('/dgw_service/common/getInterfaceCycleCondList', param); };
const getIpNetCondList = (param) => { return custAxios.post('/dgw_service/common/getIpNetCondList', param); };
const getCloudList = (param) => { return custAxios.post('/dgw_service/common/getCloudList', param); };
const getRunByCondList = (param) => { return custAxios.post('/dgw_service/common/getRunByCondList', param); };
const getProvidedToCondList = (param) => { return custAxios.post('/dgw_service/common/getProvidedToCondList', param); };

export { 
  getNmsCondList,
  getProtocolCondList,
  getStatusCondList,
  getManagerCondList,
  getConds,
  getInterfaceCycleCondList,
  getIpNetCondList,
  getCloudList,
  getRunByCondList,
  getProvidedToCondList
}