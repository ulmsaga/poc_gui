import custAxios from "api/custAxios";

const getKpiAnalysis = (param) => { return custAxios.post('/poc_service/nw/analysis/getKpiAnalysis', param); };

export {
  getKpiAnalysis,
}