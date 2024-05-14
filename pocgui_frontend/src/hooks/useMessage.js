import { useEffect } from 'react'
import { alertMsg, confirmMsg, initMsg } from 'store/reducers/message'
import { useDispatch } from 'react-redux'

function useMessage () {
  const dispatch = useDispatch();

  const alert = (msg) => {
    dispatch(alertMsg({title: '알림', msg: msg}));
  }

  const confirm = (msg, callback) => {
    dispatch(confirmMsg({title: '확인', msg: msg, callback: callback}));
  }

  useEffect(() => {
    dispatch(initMsg());
  }, [dispatch])

  return {
    alert, confirm
  }
}

export default useMessage;