import custAxios from "api/custAxios";

const getLastStatusTime = (param) => { return custAxios.post('/poc_service/nw/monitor/getLastStatusTime', param); };
const getCurAlarm1M = (param) => { return custAxios.post('/poc_service/nw/monitor/getCurAlarm1M', param); };

export {
  getLastStatusTime,
  getCurAlarm1M
}