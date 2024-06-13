import React from "react";
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import { AutoSizer, List } from "react-virtualized";
import TreeItem from "./TreeItem";

const TreeView = ({ tree, handleExpand, dblClickNode, reloadTrigger, searchTargetItemId, setSearchTargetItemId }) => {
  const onDoubleClick = (item) => {
    dblClickNode(item);
  };
  
  const scrollToIndex = tree.findIndex(item => item.id === searchTargetItemId);
  setSearchTargetItemId('');

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
              <div style={style} key={key} onDoubleClick={ () => { onDoubleClick(item) } }>
                <TreeItem
                  item={item}
                  handleExpand={handleExpand}
                  // isRenaming={renamin === item.id}
                  // doubleClick={ doubleClick }
                  reloadTrigger={ reloadTrigger }
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