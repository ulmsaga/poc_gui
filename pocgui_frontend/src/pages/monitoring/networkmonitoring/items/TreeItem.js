import React, { useState } from "react";

const TreeItem = ({ item, handleExpand, isRenaming }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      style={{ marginLeft: item.depth * 15, color: clicked ? "red" : "black" }}
      onClick={() => handleExpand(item.id)}
    >
      <div onClick={() => setClicked(!clicked)}>
        {item.name} {isRenaming && " - RENAMING !"}
      </div>
    </div>
  );
};

export default TreeItem;
