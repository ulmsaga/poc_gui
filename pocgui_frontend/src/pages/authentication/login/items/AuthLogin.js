import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
// import { Formik } from 'formik';

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { getRsaKeyset, loginProc } from 'api/login/loginApi';
import rsa from 'utils/rsa/rsa';
import sha512 from 'js-sha512';

import { useCookies } from 'react-cookie';
import { fnDateAdd } from 'utils/common';

import { fetchMenuListById, setCurrentMenuInfo, initMenuInfo } from 'store/reducers/menu';
import { initUserInfo, setUserInfo } from 'store/reducers/user';
import useCustNavigate from 'hooks/useCustNavigate';

import { useFormik } from 'formik';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const isInitInfo = useRef(false);
  const isAuthorization = useRef(false);
  const menu = useSelector((state) => state.menu)

  const dispatch = useDispatch()

  // const [checked, setChecked] = useState(false);
  // const [inputs, setInputs] = useState({userId: '', userPwd: ''})
  // const {userId, userPwd} = inputs

  const [showPassword, setShowPassword] = useState(false);
  const [ cookies, setCookies, removeCookies ] = useCookies(['userId', 'chkRememberId']);
  const [ isChekRemeberId, setIsChekRemeberId ] = useState(false);
  const loginPolicy = useRef('RSA512').current

  const { goToLocation } = useCustNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getRsaKeysetBeforeLoginProc = (userId, userPwd) => {
    const rsaKey = new rsa()
    // const sha512key = sha512
    if (loginPolicy === 'RSA512') {
      getRsaKeyset()
      .then(response => response.data)
      .then ((ret) => {
        if (ret.result === 1) {
          rsaKey.setPublic(ret.rs.RSAModulus, ret.rs.RSAExponent)
          doLogin(rsaKey.encrypt(userId), rsaKey.encrypt(userPwd), rsaKey.encrypt(userId + userPwd), userId, userPwd)
        }
      })
      .catch((e) => {
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
  }

  const doLogin = (encUserId, encUserPwdEx, encUserpwd, userId, userPwd) => {
    const sha512key = sha512
    loginProc({userId: encUserId, userPwdEx: encUserPwdEx, userPwd: encUserpwd, userPwdExSha512: sha512key.hex(userPwd)})
      .then(response => response.data)
      .then((ret) => {
        if (ret.result === 1) {

          setCookies("chkRememberId", isChekRemeberId, { path: "/", expires: fnDateAdd(new Date(Date.now()), "day", 7) });
          if (isChekRemeberId) {
            setCookies("userId", userId, {path: "/", expires: fnDateAdd(new Date(Date.now()), "day", 7) });
          } else {
            removeCookies("userId");
            removeCookies("chkRememberId");
          }
          if (ret.rs.authFlowStage === "2") {
            const retRs = {
              result: ret.rs
            };
            callBackSmsAuth(retRs);
          } else {
            // not used
            openPopupSendSmsAuth()
          }
        } else {
          if (ret.rs.authFailMsg !== undefined && ret.rs.authFailMsg !== '' && ret.rs.authFailMsg !== null) {
            
            alert(ret.rs.authFailMsg);
          } else {
            if (ret.errorMessage !== undefined && ret.errorMessage !== '' && ret.errorMessage !== null ) {
              alert(ret.errorMessage);
            } else {
              alert("로그인 작업에 실패하였습니다.");
            }
          }
        }
      })
      .catch((e) => {
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
  // not used
  const openPopupSendSmsAuth = () => {
    // PopupSmsAuth
  }
  
  const callBackSmsAuth = (rs) => {
    if (rs.result.userInfo === undefined || rs.result.userInfo === null) return
    if (rs.result.userInfo.user_id !== undefined && rs.result.userInfo.user_id !== null) {
      const userInfo = {
        user_id: rs.result.userInfo.user_id,
        user_name: rs.result.userInfo.user_name,
        user_role_list: rs.result.userInfo.userRoleList
      }
      let targetMenuInfo = {
        menu_navigation: '/modules/monitor/NetworkMonitoring',
        menu_location: '감시 > NW 감시'
      }
      if (rs.result.defaultMenuInfo) {
        targetMenuInfo = {
          menu_navigation: rs.result.defaultMenuInfo.menu_navigation,
          menu_location: rs.result.defaultMenuInfo.menu_location,
          menu_code: rs.result.defaultMenuInfo.menu_code,
          menu_name: rs.result.defaultMenuInfo.menu_name,
          default_menu_yn: rs.result.defaultMenuInfo.default_menu_yn,
          module_id: rs.result.defaultMenuInfo.module_id,
          module_name: rs.result.defaultMenuInfo.module_name,
          module_desc: rs.result.defaultMenuInfo.module_desc,
          role_id: rs.result.defaultMenuInfo.role_id,
          role_name: rs.result.defaultMenuInfo.role_name,
          role_desc: rs.result.defaultMenuInfo.role_desc,
          allow_use_auth: rs.result.defaultMenuInfo.allow_use_auth,
          allow_read_auth: rs.result.defaultMenuInfo.allow_read_auth,
          allow_create_auth: rs.result.defaultMenuInfo.allow_create_auth,
          allow_modify_auth: rs.result.defaultMenuInfo.allow_modify_auth,
          allow_delete_auth: rs.result.defaultMenuInfo.allow_delete_auth,
          allow_confirm_auth: rs.result.defaultMenuInfo.allow_confirm_auth,
          allow_func01_auth: rs.result.defaultMenuInfo.allow_func01_auth,
          allow_func02_auth: rs.result.defaultMenuInfo.allow_func02_auth,
          allow_func03_auth: rs.result.defaultMenuInfo.allow_func03_auth,
          allow_func04_auth: rs.result.defaultMenuInfo.allow_func04_auth,
          allow_func05_auth: rs.result.defaultMenuInfo.allow_func05_auth,
          allow_func06_auth: rs.result.defaultMenuInfo.allow_func06_auth,
          allow_func07_auth: rs.result.defaultMenuInfo.allow_func07_auth,
          allow_func08_auth: rs.result.defaultMenuInfo.allow_func08_auth,
          allow_func09_auth: rs.result.defaultMenuInfo.allow_func09_auth,
          allow_func10_auth: rs.result.defaultMenuInfo.allow_func10_auth
        }
      }
      // TangoSSO OK -> SMS OK
      isAuthorization.current = true;
      dispatch(setUserInfo(userInfo))
      dispatch(fetchMenuListById());
      dispatch(setCurrentMenuInfo(targetMenuInfo));
    }
  }

  useEffect(() => {
    if (!isAuthorization.current) {
      if (!isInitInfo.current) {
        // document.getElementById('root').className = 'login-wrap'
        dispatch(initMenuInfo());
        dispatch(initUserInfo());
        setTimeout(() => {
          if (cookies.chkRememberId !== undefined) {
            if (cookies.chkRememberId) {
              setIsChekRemeberId(true);
              formik.values.userid = cookies.userId;
            }
          }
        }, 100);
        isInitInfo.current = true;
      }
    }else if (isAuthorization.current) {
      if (menu.list !== undefined) {
        if (menu.list.length > 0) {
          goToLocation(menu.currentMenuInfo.menu_location);
        } else if (menu.list.length === 0) {
          alert("허용된 메뉴 사용 권한이 없습니다.\n관리자에게 문의해 주시기 바랍니다.");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu.list])

  const formik = useFormik({
    initialValues: {
      userid: 'ADMIN',
      password: 'mobigen2024^_',
      submit: null
    },
    validationSchema: Yup.object().shape({
      userid: Yup.string().max(32).required('User ID를 입력해 주시기 바랍니다.'),
      password: Yup.string().max(255).required('Password를 입력해 주시기 바랍니다.')
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        setStatus({ success: true });
        setSubmitting(false);
        getRsaKeysetBeforeLoginProc(values.userid, values.password, setStatus, setSubmitting);
      } catch (err) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="userid-login">User ID</InputLabel>
            <OutlinedInput
              id="userid-login"
              type="string"
              value={formik.values.userid}
              name="userid"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="User ID"
              fullWidth
              error={Boolean(formik.touched.userid && formik.errors.userid)}
            />
            {formik.touched.userid && formik.errors.userid && (
              <FormHelperText error id="standard-weight-helper-text-userid-login">
                {formik.errors.userid}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(formik.touched.password && formik.errors.password)}
              id="-password-login"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {formik.errors.password}
              </FormHelperText>
            )}
          </Stack>
        </Grid>
        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <AnimateButton>
            <Button disableElevation disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
              Login
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthLogin;
