import { AddOutlined, FiberManualRecordTwoTone, RemoveOutlined } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import React, { Fragment, useEffect } from "react";

const TreeItem = ({ item, handleExpand, reloadTrigger, isSelected, treeEndNodeClicked, setSelectedItemId }) => {
  useEffect(() => {
    // REDRAW
  }, [reloadTrigger]);

  const onEndNodeClick = (item) => {
    setSelectedItemId(item.id);
    treeEndNodeClicked(item);
  };

  return (
    /*
    <div
      style={{ marginLeft: item.depth * 15, cursor: item.state.lastDepth ? 'pointer' : 'default'}}
      onClick={() => handleExpand(item.id)}
    >
      <Tooltip title={ item.name } arrow placement="left">
        <div style={{ textOverflow: 'ellipsis',  overflow: 'hidden', whiteSpace: 'nowrap', backgroundColor: isSelected ? 'lightblue' : 'transparent'}} onDoubleClick={ () => { onNodeDoubleClick(item) } } >
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
    */
    
    <Tooltip title={ item.name } arrow placement="left">
      <ListItem sx={{ height: '26px', marginLeft: (item.depth - 1) * 2 - 2, cursor: item.state.lastDepth ? 'pointer' : 'default', fontSize: '0.7rem' }}>
        { !item.state.lastDepth &&
          <Fragment>
            <IconButton onClick={() => handleExpand(item.id)} sx={{ height: '26px', width: '10px' }}>
              { !item.state.lastDepth && item.state.expanded && <RemoveOutlined sx={{ fontSize: 10 }}/> }
              { !item.state.lastDepth && !item.state.expanded && <AddOutlined sx={{ fontSize: 10 }}/> }
            </IconButton>
            <ListItemText primary={item.name} 
              sx={{ 
                textOverflow: 'ellipsis',  
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                '& .MuiTypography-root': {
                  fontSize: '0.8rem'
                },
              }}
            />
          </Fragment>
        }
        {
          item.state.lastDepth &&
          <Fragment>
            <ListItemButton sx={{ height: '26px', textAlign: 'left', verticalAlign: 'middle', margin: 0, padding: 0, backgroundColor: isSelected ? '#0091EA47' : 'transparent', }} onClick={ () => { onEndNodeClick(item) }}>
              <span style={{ paddingTop: '4px' }}>
                { item.state.lastDepth && item.state.alarmGrade === 'CR' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#FF6347' }}/> }
                { item.state.lastDepth && item.state.alarmGrade === 'MJ' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#FFA500' }}/> }
                { item.state.lastDepth && item.state.alarmGrade === 'MN' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#FFD700' }}/> }
                { item.state.lastDepth && item.state.alarmGrade === 'NR' && <FiberManualRecordTwoTone fontSize='small' sx={{ marginRight:0.5, padding: 0, width: 12, height: 12, color: '#73be19' }}/> }
              </span>
              <ListItemText primary={item.name} 
                sx={{ 
                  margin: 0,
                  textOverflow: 'ellipsis',  
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  
                  '& .MuiTypography-root': {
                    fontSize: '0.8rem'
                  },
                }}
              />
            </ListItemButton>
          </Fragment>
        }
      </ListItem>
    </Tooltip>
  );
};

export default TreeItem;
