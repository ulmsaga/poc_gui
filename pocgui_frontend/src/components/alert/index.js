import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "store/reducers/message";


const Alert = () => {
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeAlert());
  };

  const confirm = () => {
    dispatch(closeAlert());
    const callback = message.callback;
    if (callback) callback('confirm');
  };

  const [style, setStyle] = useState({ minWidth: 300, minHeight: 200 });

  useEffect(() => {
    if (message.size ==='small') {
      setStyle({ minWidth: 200, minHeight: 100, whiteSpace: 'pre-wrap'});
    } else if (message.size === 'medium') {
      setStyle({ minWidth: 400, minHeight: 200, whiteSpace: 'pre-wrap' });
    } else if (message.size === 'large') {
      setStyle({ minWidth: 600, minHeight: 300, whiteSpace: 'pre-wrap' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.size]);

  return (
    <Dialog
      open={ message.isShow }
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ margin: 0.5, padding: 0.5}}
    >
      <DialogTitle id="alert-dialog-title">
        { message.title }
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
      <DialogContent
        dividers
        sx={ style }
      >
        { 
          // message.msg.replace('<br>', '\n')
          // message.msg.replace('<br>', '\n')
          message.msg
        }
      </DialogContent>
      <DialogActions>
        { message.type === 'confirm' && <Button onClick={confirm} autoFocus>확인</Button> }
        <Button onClick={close}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Alert;