import custAxios from "api/custAxios";
import useLoading from "hooks/useLoading";
import useMessage from "hooks/useMessage";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeAlert } from "store/reducers/message";

const AxiosInterceptLayer = () => {
  const { onLoad, offLoad } = useLoading();
  const { alert } = useMessage();
  const dispatch = useDispatch();
  
  const requestInstance = custAxios.interceptors.request.use(
    (config) => {
      onLoad();
      return config;
    },
    (e) => {
      offLoad();
      
      let errMsg = e.message;
      if (e.response !== undefined && e.response !== null) {
        if (e.response.data !== undefined && e.response.data !== null) {
          if (e.response.data.errorMessage !== undefined && e.response.data.errorMessage !== null) {
            errMsg = e.response.data.errorMessage;
          }
        }
      }
      // Promise.reject(e);
      return (
        <Fragment>
          {
            alert(errMsg)
          }
        </Fragment>
      )
    }
  );
  const responseInstance = custAxios.interceptors.response.use(
    (response) => {
      offLoad();
      if (response.data !== undefined) {
        if (response.data.result === -1) {
          if (response.data.resultMsg === undefined || response.data.resultMsg === null) {
            if (response.data.errorMessage !== undefined) {
              alert(response.data.errorMessage);
            } else {
              alert('오류가 발생하였습니다.(unknown error)');
            }
          } else {
            alert(response.data.resultMsg);
          }
        } else {
          if (response.data.rs !== undefined && response.data.rs !== null) {
            if (response.data.rs.result !== undefined && response.data.rs.result !== null) {
              if (response.data.rs.result === -1) {
                alert(response.data.rs.resultMsg);
              }
            }
          }
        }
      }
      return response;
    },
    (e) => {
      offLoad();
      let importantErrMsg = "";
      let responseErrorMsg = "";
      let errStatus = "";
      let errMsg = e.message;
      if (e.response !== undefined && e.response !== null) {
        if (e.response.data !== undefined && e.response.data !== null) {
          if (e.response.data.errorMessage !== undefined && e.response.data.errorMessage !== null) {
            responseErrorMsg = e.response.data.errorMessage;
            if (e.response.status !== undefined && e.response.status !== null) {
              errStatus = e.response.status;
              if (errStatus === 401) {
                errMsg = errMsg + '\n잠시 후 로그인 화면으로 이동 합니다.'
                setTimeout(() => {
                  dispatch(closeAlert());
                  setTimeout(() => {
                    window.location.href = '/login';
                  }, 100);
                }, 1000);
              }
            }
          } else {
            if (e.response.status !== undefined && e.response.status !== null) {
              errStatus = e.response.status;
              if (errStatus === 403) {
                // importantErrMsg = "현재 세션은 권한이 없는 세션으로 유효하지 않습니다.\n잠시 후 화면을 새로고침 하고 세션을 재 확인 합니다.";
                importantErrMsg = "현재 세션은 권한이 없는 세션으로 유효하지 않습니다.\n잠시 후 로그인 화면으로 이동 합니다.";
                setTimeout(() => {
                  dispatch(closeAlert());
                  setTimeout(() => {
                    window.location.href = '/login';
                  }, 100);
                }, 1000);
              } else if (errStatus === 502 || errStatus === 504) {
                importantErrMsg = "서버에 연결 할 수 없습니다.\n관리자에게 문의 하시기 바랍니다.";
              }
            }
          }
        }
      }
      if (responseErrorMsg !== '') {
        errMsg = responseErrorMsg;
      } else {
        errMsg = '다음과 같은 오류가 발생 하였습니다.\n' + errMsg;
      }
      if (importantErrMsg !== "") errMsg = importantErrMsg;

      // Promise.reject(e);
      return (
        <Fragment>
          {
            (errStatus === 502 || errStatus === 504) ? setTimeout(() => {  alert(errMsg) }, 100) : alert(errMsg)
          }
        </Fragment>
      )
    }
  );

  useEffect(() => {
    return () => {
      custAxios.interceptors.request.eject(requestInstance);
      custAxios.interceptors.response.eject(responseInstance);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestInstance, responseInstance]);
}

export default AxiosInterceptLayer;