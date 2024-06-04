import { CloseCircleOutlined } from "@ant-design/icons";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { PollOutlined } from "@mui/icons-material";
import KpiCauseTrend from "./contents";

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

const PopupKpiCauseTrend = ({ title, params, style, isOpen, setIsOpen }) => {
  const close = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      PaperComponent={ PaperComponent }
      open={ isOpen }
      onClose={close}
      aria-labelledby="draggable-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={ true }
      maxWidth={ false }
      sx={{ margin: 0, padding: 0}}
    >
      <DialogTitle id="draggable-dialog-title">
        <PollOutlined sx={{ marginRight: '4px', marginBottom: '-7px', marginLeft: '-10px', color: (theme) => theme.palette.grey[500] }}/>
        { title }
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
        <KpiCauseTrend params={ params } />
      </DialogContent>
    </Dialog>
  );
};

export default PopupKpiCauseTrend;