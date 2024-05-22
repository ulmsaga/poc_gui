import React, { useEffect, useState } from "react";
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import { List } from "react-virtualized";
import TreeItem from "./TreeItem";

const TreeView = ({ tree, handleExpand, size }) => {
  // eslint-disable-next-line
  // const [renamin, setRenamin] = useState([]);

  const [ treeSize, setTreeSize ] = useState({ height: 0, width: 0 });

  useEffect(() => {
    console.log('TreeView useEffect');
    console.log('height', size.height);
    // console.log('refTopTree', refTopTree?.current?.clientHeight);
    setTreeSize({ height: 0, width: 0 })
    setTimeout(() => {
      setTreeSize({ height: size.height, width: size.width });
    } , 100);
  }, [size.height]);

  return (
    <div style={{ height: 'auto', overflow: 'hidden', width: treeSize?.width }}>
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
                // isRenaming={renamin === item.id}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default TreeView;