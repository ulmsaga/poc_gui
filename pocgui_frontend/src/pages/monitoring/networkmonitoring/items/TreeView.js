import React from "react";
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import { AutoSizer, List } from "react-virtualized";
import TreeItem from "./TreeItem";

const TreeView = ({ tree, handleExpand, dblClickNode }) => {
  const onDoubleClick = (item) => {
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
              <div style={style} key={key} onDoubleClick={ () => { onDoubleClick(item) } }>
                <TreeItem
                  item={item}
                  handleExpand={handleExpand}
                  // isRenaming={renamin === item.id}
                  // doubleClick={ doubleClick }
                />
              </div>
            );
          }}
        />
      )}
    </AutoSizer>
  );
};

export default TreeView;