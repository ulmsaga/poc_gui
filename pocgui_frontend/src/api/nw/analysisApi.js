import custAxios from "api/custAxios";

const getKpiAnalysis = (param) => { return custAxios.post('/poc_service/nw/analysis/getKpiAnalysis', param); };
const getKpiAnalysisEquipCauseCnt = (param) => { return custAxios.post('/poc_service/nw/analysis/getKpiAnalysisEquipCauseCnt', param); };
const getTrendKpiAndCauseAnalysis = (param) => { return custAxios.post('/poc_service/nw/analysis/getTrendKpiAndCauseAnalysis', param); };

export {
  getKpiAnalysis,
  getKpiAnalysisEquipCauseCnt,
  getTrendKpiAndCauseAnalysis
}