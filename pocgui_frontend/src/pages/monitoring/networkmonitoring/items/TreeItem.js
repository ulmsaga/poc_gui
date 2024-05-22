import { AddOutlined, AodOutlined, RemoveOutlined, SettingsInputAntennaOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";

const TreeItem = ({ item, handleExpand }) => {
  // const [clicked, setClicked] = useState(false);

  const alarmGrade = () => {
    if (item.state.alarmGrade === 'CR') {
      return 'red';
    } else if (item.state.alarmGrade === 'MJ') {
      return 'orange';
    } else if (item.state.alarmGrade === 'MN') {
      return 'yellow';
    } else if (item.state.alarmGrade === 'NR') {
      return 'black';
    } else {
      return 'black'
    }
  };

  return (
    <div
      // style={{ marginLeft: item.depth * 15, color: clicked ? "red" : "black" }}
      style={{ marginLeft: item.depth * 15, color: alarmGrade(), cursor: item.state.lastDepth ? 'pointer' : 'default'}}
      onClick={() => handleExpand(item.id)}
    >
      {/* <div onClick={() => setClicked(!clicked)}> */}
      <Tooltip title={ item.name } arrow placement="left">
      <div style={{ textOverflow: 'ellipsis',  overflow: 'hidden', whiteSpace: 'nowrap'}}>
        { !item.state.lastDepth && item.state.expanded && <RemoveOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        { !item.state.lastDepth && !item.state.expanded && <AddOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        { item.state.lastDepth && (item.state.nodeType === 'MME') && <AodOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        { item.state.lastDepth && (item.state.nodeType === 'ENB') && <SettingsInputAntennaOutlined fontSize="9" sx={{ paddingTop: 0.2, paddingRight: 0.4 }}/> }
        {item.name}
      </div>
      </Tooltip>
    </div>
  );
};

export default TreeItem;
