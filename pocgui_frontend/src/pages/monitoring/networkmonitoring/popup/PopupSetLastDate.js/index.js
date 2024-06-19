import { CloseCircleOutlined } from "@ant-design/icons";
import { PollOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton, Paper } from "@mui/material";
import React from "react";
import Draggable from "react-draggable";
import SetLastDate from "./SetLastDate";

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

const PopupSetLastDate = ({ title, params, style, isOpen, setIsOpen, callBackFn }) => {
  const close = () => {
    setIsOpen(false);
  };

  const callBackComp = (ret) => {
    callBackFn(ret);
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
      maxWidth={ false }
      sx={{ margin: 0, padding: 0}}
      style={ style }
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
        {/* <CallFailSearch params={ params } /> */}
        <SetLastDate params={ params } callBackComp={ callBackComp } />
      </DialogContent>
    </Dialog>
  );
}

export default PopupSetLastDate;