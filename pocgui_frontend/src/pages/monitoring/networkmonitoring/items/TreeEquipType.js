import React, { useEffect, useState } from "react";
import TreeView from "./TreeView";
import { forEach } from "lodash";

const TreeEquipType = ({ data, alarmList, openPopupStatus }) => {
  const [expanded, setExpanded] = useState([]);

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

  // eslint-disable-next-line no-unused-vars
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
    // const children = getChildren(flattenData, id, 1);
    if (expanded.includes(id)) {
      const filtered = expanded.filter((x) => x !== id);
      setExpanded(filtered);
      setNodeStatus(flattenData, id, 'expanded', false);
    } else {
      setExpanded([...expanded, id]);
      setNodeStatus(flattenData, id, 'expanded', true);
    }
  };

  const setNodeStatus = (arr, id, property, value) => {
    forEach(arr, (item) => {
      if (item.id === id) {
        item.state[property] = value;
        // console.log("arr[item].status[property]", item.state[property]);
        return true;
      }
    });
  };

  const filterSet = () => {
    console.log("expanded", expanded);
    let renderSet = flattenData.filter(
      (item) =>
        item.depth === 1 ||
        (expanded.includes(item.parentId) &&
          item.main.every((x) => expanded.includes(x)))
    );

    return renderSet;
  };

  const getItemById = (arr, id) => {
    let node = null;
    arr.forEach((item) => {
      if (item.id === id) {
        node = item;
        return node;
      }
    });
    return node;
  };
  
  const drawAlarm = () => {
    const tmpExpanded = [...expanded];
    let existNewExpanded = false;
    alarmList.forEach((item) => {
      const node = getItemById(flattenData, item.id);
      if (node?.main?.length !== undefined && node?.main?.length > 0) {
        node.main.forEach((id) => {
          console.log("expenedId", id);
          if (!expanded.includes(id)) {
            // setExpanded([...expanded, id]);
            existNewExpanded = true;
            tmpExpanded.push(id);
            setNodeStatus(flattenData, id, 'expanded', true);
          }
        });
      }
      setNodeStatus(flattenData, item.id, 'alarmGrade', item.alarmGrade);
    });
    if (existNewExpanded) setExpanded(tmpExpanded);
  };
 
  useEffect(() => {
    drawAlarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alarmList]);

  return (
    <TreeView tree={filterSet()} handleExpand={handleExpand} openPopupStatus={ openPopupStatus }/>
  );
};

export default TreeEquipType;
