import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getIsAuthority, logout } from "api/login/loginApi";
// import useMessage from "./useMessage";
import { setCurrentMenuInfo } from "store/reducers/menu";
// import { closePopup } from "store/popupSlice";
// import { closePopupOverPopup } from "store/popupOverPopupSlice";

const useCustNavigate = () => {
  const navigate = useNavigate();
  const menu = useSelector((state) => state.menu)
  // const { alert } = useMessage();
  const dispatch = useDispatch();

  let existLocation = false;
  const goToLocation = (menuLocation) => {
    existLocation = false;

    // Login
    if (menuLocation === '/' || menuLocation === '/login' || menuLocation.includes('login')) {
      doLogOut();
      return;
    }

    findMenu(menu.list, menuLocation);
    setTimeout(() => {
      if (existLocation) {
        navigate(menuLocation);
        checkAuthAndGotoDest(menuLocation);
      } else {
        const defaultMenuLoc = '/modules/monitor/NetworkMonitoring';
        const defaultMenuNav = '감시 > NW 감시';
        findMenu(menu.list, defaultMenuLoc);
        setTimeout(() => {
          if (existLocation) {
            dispatch(setCurrentMenuInfo({menu_location: defaultMenuLoc, menu_navigation: defaultMenuNav}));
            checkAuthAndGotoDest(defaultMenuLoc);
          } else {
            doLogOut();
          }
          return;
        }, 100)
      }
    }, 100);
  }
  const checkAuthAndGotoDest = (menuLocation) => {
    getIsAuthority()
      .then(response => response.data)
      .then((ret) => {
        if (ret !== undefined && ret !== null) {
          if (ret.rs) navigate(menuLocation);
        }
      })
  };
  const findMenu = (list, menuLocation) => {
    list.forEach(v => {
      if (v.menu_location === menuLocation) {
        existLocation = true;
        return false;
      }
      if (v.subMenuList !== undefined && v.subMenuList !== null) {
        findMenu(v.subMenuList, menuLocation);
      }
    });
  }
  const doLogOut = () => {
    // dispatch(closePopupOverPopup());
    // dispatch(closePopup());
    const param = {}
    logout(param)
      .then(response => response.data)
      .then((ret) => {
        if (ret.result === 1) {
          navigate('/login')
        }
      })
      .catch ((e) => {
        let errMsg = e.message;
        if (e.response !== undefined && e.response !== null) {
          if (e.response.data !== undefined && e.response.data !== null) {
            if (e.response.data.errorMessage !== undefined && e.response.data.errorMessage !== null) {
              errMsg = e.response.data.errorMessage;
            }
          }
        }
        alert(errMsg);
      })
  }
  return {
    goToLocation
  };
}

export default useCustNavigate;