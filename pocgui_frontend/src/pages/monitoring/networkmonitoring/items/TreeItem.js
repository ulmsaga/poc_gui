import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { IconButton, ListItem, ListItemButton, ListItemText, Tooltip, keyframes } from "@mui/material";
import AlarmIcon from "components/alarmIcons/AlarmIcon";
import React, { Fragment, useEffect } from "react";

const animFadeInOut = keyframes`
  0%{ opacity:0; }
  20%{ opacity:0.7; }
  60%{ opacity:0.9; }
  100%{ opacity:1; }
`;

const gradeColor = {
  font: {
    CR: '#c53920',
    MJ: '#e5a022',
    MN: '#ddc53f',
    NR: ''
  }
}

const TreeItem = ({ item, handleExpand, reloadTrigger, isSelected, treeEndNodeClicked, setSelectedItemId }) => {
  useEffect(() => {
    // REDRAW
  }, [reloadTrigger]);

  const onEndNodeClick = (item) => {
    setSelectedItemId(item.id);
    treeEndNodeClicked(item);
  };

  return (
    <Tooltip title={ item.name } arrow placement="left">
      <ListItem sx={{ height: '26px', marginLeft: (item.depth - 1) * 2 - 2, cursor: item.state.lastDepth ? 'pointer' : 'default', fontSize: '0.7rem',
        animation: item.state.alarmGrade === 'NR' ? '' : `${animFadeInOut} 2s infinite`
       }}>
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
                <AlarmIcon item={item} />
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
                  color: item.state.alarmGrade === 'CR' ? gradeColor.font.CR : item.state.alarmGrade === 'MJ' ? gradeColor.font.MJ : item.state.alarmGrade === 'MN' ? gradeColor.font.MN : '',
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
