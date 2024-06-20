import { useCallback, useRef } from "react";

const useSseReceiver = () => {
  const eventSource = useRef();
  const reconnectFrequencySecond = useRef(1);
  const SSE_TYPE_NW_ALARM= 'nwAlarmResultList';
  eventSource.current = {};
  const setupEventSource = useCallback((messageType, callback) => {
    eventSource.current = new EventSource('/poc_service/sse/subscribe')
    .addEventListener(messageType, (event) => {
      const data = JSON.parse(event.data);
      if (data === "OK" || data === "200") {
        callback(data);
      } else {
        if (data?.length === undefined || data?.length === null) return;
        if (data?.length > 0) {
          if (messageType === SSE_TYPE_NW_ALARM) {
            callback(data[0]);
          }
        }
      }
    });
    return () => {
      eventSource.current.close();
      console.log('[sse] close useCallback => current close & status :: ', eventSource.current.readyState);
    }
  }, []);
 
  eventSource.current.onopen = (e) => {
    console.log("SSE connection opened");
    reconnectFrequencySecond.current = 1;
  }
  
  eventSource.current.onerror = (e) => {
    console.log('[sse] error :: ', e);
    eventSource.current.close();
    console.log('[sse] error => current close & status :: ', eventSource.current.readyState);
    reConnectFunc();
  }
  
  const isFunction = (functionTOCheck) => {
    return functionTOCheck && {}.toString.call(functionTOCheck) === '[object Function]';
  };
  const debounce = (func, wait) => {
    let timeout;
    let waitFunc;
  
    return function () {
      console.log('[sse] debounce');
      if (isFunction(wait)) {
        waitFunc = wait;
      } else {
        waitFunc = () => {
          return wait;
        }
      }
      const later = () => {
        console.log('[sse] call later');
        timeout = null;
        func.apply();
      }
      clearTimeout(timeout);
      console.log('[sse] wait seconds :: ', waitFunc());
      timeout = setTimeout(later, waitFunc());
    }
  }
  
  const reConnectFunc = debounce(() => {
    setupEventSource();
    reconnectFrequencySecond.current *= 2;
    console.log('[sse] reconnectFrequencySecond :: ', reconnectFrequencySecond.current);
    if (reconnectFrequencySecond.current > 64) {
      reconnectFrequencySecond.current = 64;
    }
  }, () => {
    console.log('[sse] reconnectFrequencySecond X 1000 :: ', reconnectFrequencySecond.current * 1000);
    return reconnectFrequencySecond.current * 1000;
  });

  return {
    setupEventSource
  };
};

export default useSseReceiver;