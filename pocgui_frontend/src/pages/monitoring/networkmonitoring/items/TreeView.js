import React from "react";
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import { AutoSizer, List } from "react-virtualized";
import TreeItem from "./TreeItem";

const TreeView = ({ tree, handleExpand, dblClickNode, reloadTrigger, searchTargetItemId, setSearchTargetItemId }) => {
  // eslint-disable-next-line no-unused-vars
  const onDoubleClick = (item) => {
    dblClickNode(item);
  };
  
  const scrollToIndex = tree.findIndex(item => item.id === searchTargetItemId);
  setSearchTargetItemId('');

  const [selectedItemId, setSelectedItemId] = React.useState(null);

  const handleItemDblClick = (item) => {
    setSearchTargetItemId(item.id);
    dblClickNode(item);
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={ height }
          width={ width }
          rowCount={ tree.length }
          rowHeight={20}
          rowRenderer={({ style, key, index }) => {
            const item = tree[index];
            return (
              // <div style={style} key={key} onDoubleClick={ () => { onDoubleClick(item) } }>
              <div style={style} key={key}>
                <TreeItem
                  item={item}
                  handleExpand={handleExpand}
                  reloadTrigger={ reloadTrigger }
                  isSelected={ item.id === selectedItemId }
                  setSelectedItemId = { setSelectedItemId }
                  onDoubleClick={ handleItemDblClick }
                />
              </div>
            );
          }}
          scrollToIndex={ scrollToIndex }
          scrollToAlignment="start"
        />
      )}
    </AutoSizer>
  );
};

export default TreeView;