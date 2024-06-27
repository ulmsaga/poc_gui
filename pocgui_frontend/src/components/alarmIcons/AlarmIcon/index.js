import { keyframes } from "@emotion/react";
import { FiberManualRecordTwoTone } from "@mui/icons-material";
import { styled } from "@mui/material";
import React, { Fragment } from "react";

const animFadeInOut = keyframes`
  0%{ opacity:0; }
  25%{ opacity:0.5; }
  100%{ opacity:1; }
`;
// eslint-disable-next-line no-unused-vars
const AnimationIcon = styled(FiberManualRecordTwoTone)(({ theme }) => ({
  animation: `${animFadeInOut} 2s infinite`
}));

const AlarmIcon = ({ item }) => {
  return (
    <Fragment>
      { item.state.lastDepth && item.state.alarmGrade === 'CR' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#FF6347' }}/> }
      { item.state.lastDepth && item.state.alarmGrade === 'MJ' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#FFA500' }}/> }
      { item.state.lastDepth && item.state.alarmGrade === 'MN' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#FFD700' }}/> }
      { item.state.lastDepth && item.state.alarmGrade === 'NR' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#73be19' }}/> }
    </Fragment>
  );
};

export default AlarmIcon;