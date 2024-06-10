import custAxios from "api/custAxios";

const getSignalCallLogXdr = (param) => { return custAxios.post('/poc_service/nw/search/getSignalCallLogXdr', param); };
const getPacketFile = (param) => { return custAxios.post('/poc_service/nw/search/getPacketFile', param); };

export {
  getSignalCallLogXdr,
  getPacketFile
}