import { AccountCircle, LogoutOutlined, UpdateOutlined } from "@mui/icons-material";
import { Box, Divider, Fade, IconButton, Popper, Stack, Typography } from "@mui/material";
import { logout } from "api/login/loginApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userInfo } from "store/reducers/user";
import { lpad } from "utils/common";


const HeaderRightContent = () => {
  const navigate = useNavigate();
  const loginUserInfo = useSelector(userInfo);
  const loginUserId = loginUserInfo.id;
  
  // -----------------------------------------------------------
  // 로그아웃
  const doLogout = () => {
    // dispatch(closePopupOverPopup());
    // dispatch(closePopup());
    const param = {}
    logout(param)
      .then(response => response.data)
      .then((ret) => {
        if (ret !== undefined) {
          if (ret?.result === 1) {
            navigate('/login')
          }
        }
      })
  }
  // -----------------------------------------------------------

  // -----------------------------------------------------------
  //  로그인 시간 체크
  const [isRunTimer, setRunTimer] = useState(true);
  const [remain, setRemain] = useState({remainTime: 3600, remainExpMin: '60', remainExpSec: '00'});
  const {remainTime, remainExpMin, remainExpSec} = remain;

  useEffect(() => {
    const id = setInterval(() => {
      setRemain({remainTime: remainTime - 1, remainExpMin: lpad(parseInt((remainTime - 1) / 60), '0', 2), remainExpSec: lpad(parseInt((remainTime - 1) % 60), '0', 2)});
    }, 1000)
    if (remainTime === 0) {
      clearInterval(id);
      setRunTimer(false);
      doLogout();
    }
    /*
      // ---------------------------------------------
      // 자동 연장 처리 (ADMIN일 경우) :: 필요하면 사용
      // ---------------------------------------------
      const C_ADMIN_LV = '1';
      if (remainTime < 3540 && loginUserInfo.admin_lv === C_ADMIN_LV) {
        extendPeriod();
      }
    */
    const C_TEST_USER = 'PTN1889130';
    if (remainTime < 3540 && loginUserInfo.id === C_TEST_USER) {
      extendPeriod();
    }
    return () => {
      clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunTimer, remainTime, doLogout])

  const extendPeriod = () => {
    setRemain({remainTime: 3600, remainExpMin: lpad(parseInt(3600 / 60), '0', 2), remainExpSec: lpad(parseInt(3600 % 60), '0', 2)});
  }
  // -----------------------------------------------------------

  // -----------------------------------------------------------
  // Popper
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
  // -----------------------------------------------------------

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem/>}
      spacing={2}
    >
      <Stack direction="row" spacing={0}>
        <IconButton onClick={handleClick}>
          <AccountCircle sx={{ color: (theme) => theme.palette.grey[200] }} />
        </IconButton>
        <Typography variant="subtitle1" paddingTop={1} paddingRight={0.9} sx={{ color: (theme) => theme.palette.grey[200] }} >{loginUserId}</Typography>
        <Popper id={id} open={open} anchorEl={anchorEl} transition sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper'}}>
                <Stack spacing={0.5} divider={<Divider orientation="horizontal" flexItem />}>
                  <Typography key={-1} variant="subtitle1">ROLE</Typography>
                  <Stack spacing={0.5}>
                    {loginUserInfo.roles.map((role, index) => {
                      return (
                        <Typography key={index} variant="subtitle1">{role.role_name}</Typography>
                      )
                    })}
                  </Stack>
                </Stack>
              </Box>
            </Fade>
          )}
        </Popper>
      </Stack>
      <Stack direction={"row"} spacing={0}>
        <Typography variant="subtitle1" paddingTop={1} paddingLeft={0.6} width={76} sx={{ color: (theme) => theme.palette.grey[200] }}>{remainExpMin + '분 ' + remainExpSec + '초'}</Typography>
        <IconButton onClick={extendPeriod} sx={{ color: (theme) => theme.palette.grey[200] }}>
          <UpdateOutlined />
        </IconButton>
      </Stack>
      <IconButton onClick={doLogout}>
        <LogoutOutlined sx={{ color: (theme) => theme.palette.grey[200] }}/>
      </IconButton>
    </Stack>
  );
}

export default HeaderRightContent;