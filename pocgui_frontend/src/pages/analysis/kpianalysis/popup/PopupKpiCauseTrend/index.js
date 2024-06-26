import { CloseCircleOutlined } from "@ant-design/icons";
import { Dialog, DialogContent, DialogTitle, IconButton, Stack } from "@mui/material";
import React from "react";
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { TrendingUpOutlined } from "@mui/icons-material";
import KpiCauseTrend from "./contents";
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
      {/* <DialogTitle id="draggable-dialog-title">
        <PollOutlined sx={{ marginRight: '4px', marginBottom: '-7px', marginLeft: '-10px', color: (theme) => theme.palette.grey[500] }}/>
        { title }
      </DialogTitle> */}
      <DialogTitle id="draggable-dialog-title" sx={{ margin: 0, padding: 1.5, backgroundColor: '#1a2335' }}>
        <Stack direction={'row'} margin={0} padding={0} spacing={0.5} height={'26px'} width={'100%'} sx={{ verticalAlign: 'middle' }}>
          <TrendingUpOutlined sx={{ fontSize: '20px', color: (theme) => theme.palette.grey[300] }} style={{ marginTop: '3px' }}/>
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
        <KpiCauseTrend params={ params } />
      </DialogContent>
    </Dialog>
  );
};

export default PopupKpiCauseTrend;