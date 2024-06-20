import custAxios from "api/custAxios";

const getLastStatusTime = (param) => { return custAxios.post('/poc_service/nw/monitor/getLastStatusTime', param); };
const getNwAlarm1M = (param) => { return custAxios.post('/poc_service/nw/monitor/getNwAlarm1M', param); };

export {
  getLastStatusTime,
  getNwAlarm1M
}