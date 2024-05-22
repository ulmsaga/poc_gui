import React, { useState } from "react";
import TreeView from "./TreeView";

const TreeEquipType = ({ data, size }) => {
  const [expanded, setExpanded] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState("");

  const flatten = (data, depth = 1, parentId = null, main = []) => {
    return data.reduce((r, { children, id, ...rest }) => {
      const obj = { ...rest, id, depth, parentId, main };
      r.push(obj);
  
      if (children?.length) {
        r.push(...flatten(children, depth + 1, id, [...main, id]));
      }
  
      return r;
    }, []);
  };
  
  const flattenData = flatten(data);
  // console.log("res", flattenData);

  const getChildren = (arr, id, maxDepth = 9999) => {
    const result = [];

    for (const item in arr) {
      if (arr[item].parentId === id && maxDepth > 0) {
        const node = arr[item].id;
        result.push(node);

        const child = getChildren(arr, arr[item].id, maxDepth - 1);

        if (child.length) {
          result.push(...child);
        }
      }
    }

    return result;
  };

  const handleExpand = (id) => {
    // eslint-disable-next-line no-unused-vars
    const children = getChildren(flattenData, id, 1);
    if (expanded.includes(id)) {
      const filtered = expanded.filter((x) => x !== id);
      setExpanded(filtered);
    } else {
      setExpanded([...expanded, id]);
    }
  };

  const filterSet = () => {
    let renderSet = flattenData.filter(
      (item) =>
        item.depth === 1 ||
        (expanded.includes(item.parentId) &&
          item.main.every((x) => expanded.includes(x)))
    );

    if (text !== "") {
      renderSet = flattenData
        // .filter((item) => item.depth === 1 || expanded.includes(item.id))
        .filter((item) => item.name.includes(text));
    }

    return renderSet;
  };

  return (
    <TreeView tree={filterSet()} handleExpand={handleExpand} size={ size } />
  );
};

export default TreeEquipType;
