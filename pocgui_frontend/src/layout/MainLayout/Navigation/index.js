import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { IconButton, Typography } from '@mui/material';
import { ContentPasteSearchOutlined, EventNoteOutlined, ManageAccountsOutlined, MonitorHeartOutlined, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { setCurrentMenuInfo } from 'store/reducers/menu';

const IconButtonStyled = styled(IconButton)`
  display: inline-block;
  text-align: center;
  min-width: 60px;
  min-height: 80px;
  padding-top: 20px
`;

const MenuStyled = styled(Menu)`
  margin-left: 44px;
  margin-top: -70px;
`;
// 141, -42
// const MenuSubStyled = styled(Menu)`
//   margin-left: ${props => (props.menuLv - 1) * 141 + 'px'};
//   margin-top: -42px;
// `;

// const Menu

const Navigation = () => {
  const dispatch = useDispatch();
  let menuList = useSelector((state) => state.menu.list)

  // return (
  //   <nav className="mu-gnb">
  //     <MenuVUl className="mu-v-menu">
  //       {menuList.length && 
  //         menuList.map((menu) => 
  //           <Menu key={menu.menu_code} menu={menu} />
  //         )
  //       }
  //     </MenuVUl>
  //   </nav>
  // )

  const linkClick = (e, menu, popupState) => {
    const currentMenuInfo = {
      menu_code: menu.menu_code,
      menu_name: menu.menu_name,
      menu_navigation: menu.menu_navigation,
      admin_allow_lv: menu.admin_allow_lv,
      module_type: menu.module_type,
      module_allow_lv: menu.module_allow_lv,
      reg_admin_allow_lv: menu.reg_admin_allow_lv,
      reg_module_allow_lv: menu.reg_module_allow_lv
    }
    dispatch(setCurrentMenuInfo(currentMenuInfo));
    popupState.close();
  }

  return (
    <Fragment>
      {menuList.length && 
        menuList.map((menu) => 
          <PopupState key={menu.menu_code} variant="popover" popupId="demo-popup-menu" align="center" >
            {(popupState) => (
              <React.Fragment>
                <IconButtonStyled variant="contained" {...bindTrigger(popupState)} align="center">
                  { menu.module_id === '0001' && <MonitorHeartOutlined sx={{ color: (theme) => theme.palette.grey[200] }} /> }
                  { menu.module_id === '0002' && <EventNoteOutlined sx={{ color: (theme) => theme.palette.grey[200] }} /> }
                  { menu.module_id === '0003' && <ContentPasteSearchOutlined sx={{ color: (theme) => theme.palette.grey[200] }} /> }
                  { menu.module_id === '0004' && <Settings  sx={{ color: (theme) => theme.palette.grey[200] }}/> }
                  { menu.module_id === '0005' && <ManageAccountsOutlined sx={{ color: (theme) => theme.palette.grey[200] }} /> }
                  <Typography variant="caption" display="block" gutterBottom align='center' sx={{ color: (theme) => theme.palette.grey[200] }}>
                    {menu.menu_name}
                  </Typography>
                </IconButtonStyled>
                <MenuStyled {...bindMenu(popupState)}>
                  {menu.subMenuList && menu.subMenuList.map((subMenu) => 
                    <MenuItem key={subMenu.menu_code}>
                      <Link to={subMenu.menu_location} onClick={(e) => {linkClick(e, subMenu, popupState)}} style={{textDecoration: 'none', color: '#000'}}><span>{subMenu.menu_name}</span></Link>
                    </MenuItem> 
                  )}
                </MenuStyled>
              </React.Fragment>
            )}
          </PopupState>
        )
      }
    </Fragment>
  );
}

export default Navigation