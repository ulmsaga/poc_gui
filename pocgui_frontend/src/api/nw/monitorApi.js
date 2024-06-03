import custAxios from "api/custAxios";

const getLastStatusTime = (param) => { return custAxios.post('/poc_service/nw/monitor/getLastStatusTime', param); };

export {
  getLastStatusTime
}