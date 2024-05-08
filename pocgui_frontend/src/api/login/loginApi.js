import custAxios from "api/custAxios";

const getRsaKeyset = () => { return custAxios.get('/poc_service/login/getRsaKeyset'); };
const loginProc = (param) => { return custAxios.get('/poc_service/login/loginProc', {params: param}); };
const sendSmsAuthenticationCode = (param) => { return custAxios.get('/poc_service/login/sendSmsAuthenticationCode', {params: param}); };
const verifyAuthenticationCode = (param) => { return custAxios.get('/poc_service/login/verifyAuthenticationCode', {params: param}); };
const loginUser = (param) => { return custAxios.post('/login/loginUser', param); };
const getUserMenuInfoList = (param) => { return custAxios.post('/poc_service/common/getUserMenuInfoList', param); };
const getMenuInfoList = (param) => { return custAxios.post('/poc_service/common/getMenuInfoList', param); };
const logout = (param) => { return custAxios.get('/poc_service/login/logout'); };
const getAllUserList = () => { return custAxios.get('/poc_service/common/getAllUserList'); };
const getIsAuthority = () => { return custAxios.get('/poc_service/common/isAuthority'); };

export { 
  getRsaKeyset, loginProc, sendSmsAuthenticationCode, verifyAuthenticationCode, getUserMenuInfoList, getMenuInfoList, loginUser, logout, getAllUserList, getIsAuthority,
}