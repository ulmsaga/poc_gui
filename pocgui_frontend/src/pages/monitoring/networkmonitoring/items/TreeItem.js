import { AddOutlined, AodOutlined, CircleSharp, RemoveOutlined, SettingsInputAntennaOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useEffect } from "react";

const TreeItem = ({ item, handleExpand, reloadTrigger }) => {
  useEffect(() => {
    // console.log("TreeItem", item);
  }, [reloadTrigger]);
  return (
    <div
      style={{ marginLeft: item.depth * 15, cursor: item.state.lastDepth ? 'pointer' : 'default'}}
      onClick={() => handleExpand(item.id)}
    >
      {/* <div onClick={() => setClicked(!clicked)}> */}
      <Tooltip title={ item.name } arrow placement="left">
      <div style={{ textOverflow: 'ellipsis',  overflow: 'hidden', whiteSpace: 'nowrap'}}>
        { !item.state.lastDepth && item.state.expanded && <RemoveOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        { !item.state.lastDepth && !item.state.expanded && <AddOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        { item.state.lastDepth && item.state.alarmGrade === 'CR' && <CircleSharp fontSize='small' style={{ marginTop: '2px', paddingTop: '6px' }} sx={{ color: '#FF6347' }}/> }
        { item.state.lastDepth && item.state.alarmGrade === 'MJ' && <CircleSharp fontSize='small' style={{ marginTop: '2px', paddingTop: '6px' }} sx={{ color: '#FFA500' }}/> }
        { item.state.lastDepth && item.state.alarmGrade === 'MN' && <CircleSharp fontSize='small' style={{ marginTop: '2px', paddingTop: '6px' }} sx={{ color: '#FFD700' }}/> }
        { item.state.lastDepth && item.state.alarmGrade === 'NR' && <CircleSharp fontSize='small' style={{ marginTop: '2px', paddingTop: '6px' }} sx={{ color: '#73be19' }}/> }
        { item.state.lastDepth && (item.state.nodeType === 'MME') && <AodOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        { item.state.lastDepth && (item.state.nodeType === 'ENB') && <SettingsInputAntennaOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        {item.name}
      </div>
      </Tooltip>
    </div>
  );
};

export default TreeItem;
