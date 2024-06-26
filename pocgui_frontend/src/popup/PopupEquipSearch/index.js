import { CloseCircleOutlined } from "@ant-design/icons";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import React from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { ManageSearchOutlined } from "@mui/icons-material";
import EquipSearch from "./EquipSearch";
import { TypoLableNoLine } from "components/label";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const PopupEquipSearch = ({ title, params, style, isOpen, setIsOpen, popupCallBack }) => {
  const close = () => {
    setIsOpen(false);
  };

  const contentCallBack = (retRows, params ) => {
    if (retRows !== undefined && retRows !== null && retRows !== '') {
      popupCallBack(retRows, params);
    }
    close();
  };

  return (
    <Dialog
      PaperComponent={ PaperComponent }
      open={ isOpen }
      onClose={close}
      aria-labelledby="draggable-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={ true }
      maxWidth={ 'lg' }
      sx={{ margin: 0, padding: 0}}
    >
      <DialogTitle id="draggable-dialog-title" sx={{ margin: 0, padding: 1.5, backgroundColor: '#1a2335' }}>
        <Stack direction={'row'} margin={0} padding={0} spacing={0.5} height={'26px'} width={'100%'} sx={{ verticalAlign: 'middle' }}>
          <ManageSearchOutlined sx={{ fontSize: '20px', color: (theme) => theme.palette.grey[300] }} style={{ marginTop: '3px' }}/>
          <TypoLableNoLine variant="h6" label={ title } style={{ fontWeight: 'bold', color: (theme) => theme.palette.grey[300] }}/>
        </Stack>
      </DialogTitle>
      <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseCircleOutlined />
      </IconButton>
      <DialogContent dividers sx={{ paddingLeft: 0, paddingRight: 2, paddingTop: 0.5, paddingBottom: 0.5}}>
        <EquipSearch params={ params } contentCallBack = { contentCallBack } selectedNode = { params.selectedNode }/>
      </DialogContent>
    </Dialog>
  );
};

export default PopupEquipSearch;