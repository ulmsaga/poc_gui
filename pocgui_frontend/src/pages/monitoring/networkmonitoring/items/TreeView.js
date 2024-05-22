import React, { useState } from "react";
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import { List } from "react-virtualized";
import TreeItem from "./TreeItem";

const TreeEquipType = ({ tree, handleExpand, size }) => {
  // eslint-disable-next-line
  const [renamin, setRenamin] = useState([]);

  return (
    <div>
      <List
        height={ size?.height === undefined ? 600 : size?.height }
        width={ size?.width === undefined ? 300 : size?.width }
        rowCount={ tree.length }
        rowHeight={20}
        rowRenderer={({ style, key, index }) => {
          const item = tree[index];
          return (
            <div style={style} key={key}>
              <TreeItem
                item={item}
                handleExpand={handleExpand}
                isRenaming={renamin === item.id}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default TreeEquipType;