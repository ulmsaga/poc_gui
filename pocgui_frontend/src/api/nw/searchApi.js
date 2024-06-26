import custAxios from "api/custAxios";

const getSignalCallLogXdr = (param) => { return custAxios.post('/poc_service/nw/search/getSignalCallLogXdr', param); };
const getSignalCallLogXdrExcel = () => { return '/poc_service/nw/search/getSignalCallLogXdrExcel' };
const getPacketFile = (param) => { return custAxios.post('/poc_service/nw/search/getPacketFile', param); };

export {
  getSignalCallLogXdr,
  getSignalCallLogXdrExcel,
  getPacketFile
}