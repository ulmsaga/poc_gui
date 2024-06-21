import React from "react";
import 'react-virtualized/styles.css'
import 'react-virtualized-tree/lib/main.css'
import { AutoSizer, List } from "react-virtualized";
import TreeItem from "./TreeItem";

const TreeView = ({ tree, handleExpand, treeEndNodeClicked, reloadTrigger, searchTargetItemId, setSearchTargetItemId }) => {
  const scrollToIndex = tree.findIndex(item => item.id === searchTargetItemId);
  setSearchTargetItemId('');

  const [selectedItemId, setSelectedItemId] = React.useState(null);

  const handleEndNodeClicked = (item) => {
    // setSearchTargetItemId(item.id);
    treeEndNodeClicked(item);
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={ height }
          width={ width }
          rowCount={ tree.length }
          rowHeight={26}
          rowRenderer={({ style, key, index }) => {
            const item = tree[index];
            return (
              <div style={style} key={key}>
                <TreeItem
                  item={item}
                  handleExpand={handleExpand}
                  reloadTrigger={ reloadTrigger }
                  isSelected={ item.id === selectedItemId }
                  setSelectedItemId = { setSelectedItemId }
                  treeEndNodeClicked={ handleEndNodeClicked }
                />
              </div>
            );
          }}
          scrollToIndex={ scrollToIndex }
          scrollToAlignment="center"
        />
      )}
    </AutoSizer>
  );
};

export default TreeView;