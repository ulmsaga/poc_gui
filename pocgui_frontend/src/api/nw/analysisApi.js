import custAxios from "api/custAxios";

const getKpiAnalysis = (param) => { return custAxios.post('/poc_service/nw/analysis/getKpiAnalysis', param); };
const getKpiAnalysisExcel = () => { return '/poc_service/nw/analysis/getKpiAnalysisExcel'; };
const getKpiAnalysisEquipCauseCnt = (param) => { return custAxios.post('/poc_service/nw/analysis/getKpiAnalysisEquipCauseCnt', param); };
const getTrendKpiAndCauseAnalysis = (param) => { return custAxios.post('/poc_service/nw/analysis/getTrendKpiAndCauseAnalysis', param); };

export {
  getKpiAnalysis,
  getKpiAnalysisExcel,
  getKpiAnalysisEquipCauseCnt,
  getTrendKpiAndCauseAnalysis
}