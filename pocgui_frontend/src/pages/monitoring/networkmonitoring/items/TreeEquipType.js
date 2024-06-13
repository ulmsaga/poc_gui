import React, { useEffect, useState } from "react";
import TreeView from "./TreeView";
import { forEach } from "lodash";
// eslint-disable-next-line no-unused-vars
import { NODE_TYPE_PATTERN_ENB, NODE_TYPE_PATTERN_EPC } from "data/common";

const TreeEquipType = ({ nodeTypePattern, data, alarmList, dblClickNode, searchTargetItemId, setSearchTargetItemId }) => {
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
        if (property === 'alarmGrade') {
          item.state[property] = chkAlarmGramde(item.state[property], value);
        } else {
          item.state[property] = value;
        }
        // console.log("arr[item].status[property]", item.state[property]);
        return true;
      }
    });
  };

  const chkAlarmGramde = (curr, next) => {
    if (curr === undefined) return next;
    if (next === undefined) return curr;

    let currGrade = 0;
    let nextGrade = 0;
    if (curr === 'CR') currGrade = 3;
    if (curr === 'MJ') currGrade = 2;
    if (curr === 'MN') currGrade = 1;
    if (next === 'CR') nextGrade = 3;
    if (next === 'MJ') nextGrade = 2;
    if (next === 'MN') nextGrade = 1;

    if (nextGrade > currGrade) return next;
    return curr;
  }

  const filterSet = () => {
    // console.log("expanded", expanded);
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
    let matchNode = 'node1';
    alarmList.forEach((item) => {
      matchNode = 'node1';
      let node = getItemById(flattenData, item.node1_key); 
      if (node === null && nodeTypePattern === NODE_TYPE_PATTERN_EPC) {
        // node1 or node2
        node = getItemById(flattenData, item.node2_key);
        if (node !== null) matchNode = 'node2';
      }

      if (node === null) return;

      if (node?.main?.length !== undefined && node?.main?.length > 0) {
        node.main.forEach((id) => {
          // console.log("expenedId", id);
          if (!expanded.includes(id)) {
            // setExpanded([...expanded, id]);
            existNewExpanded = true;
            tmpExpanded.push(id);
            setNodeStatus(flattenData, id, 'expanded', true);
          }
        });
      }
      if (matchNode === 'node1') {
        setNodeStatus(flattenData, item.node1_key, 'alarmGrade', item.grade);
      } else {
        setNodeStatus(flattenData, item.node2_key, 'alarmGrade', item.grade);
      }
      
    });
    if (existNewExpanded) setExpanded(tmpExpanded);
    setReloadTrigger(!reloadTrigger);
  };
 
  useEffect(() => {
    forEach(flattenData, (item) => {
      item.state.alarmGrade = 'NR';
    });

    drawAlarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alarmList]);

  useEffect(() => {
    if (searchTargetItemId === '' || searchTargetItemId === null) return;
    
    // console.log('expanded : ', expanded);
    // console.log('searchTargetItemId : ', searchTargetItemId);

    const tmpExpanded = [...expanded];
    let existNewExpanded = false;
    const node = getItemById(flattenData, searchTargetItemId);
    if (node === null) return;
    if (node?.main?.length !== undefined && node?.main?.length > 0) {
      node.main.forEach((id) => {
        if (!expanded.includes(id)) {
          existNewExpanded = true;
          tmpExpanded.push(id);
          setNodeStatus(flattenData, id, 'expanded', true);
        }
      });
    }
    if (existNewExpanded) setExpanded(tmpExpanded);
    // setReloadTrigger(!reloadTrigger);

    // setTimeout(() => {
    //   setReloadTrigger(!reloadTrigger);
    // }, 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTargetItemId]);

  const [reloadTrigger, setReloadTrigger] = useState(false);
  return (
    <TreeView tree={ filterSet() } handleExpand={ handleExpand } reloadTrigger={ !reloadTrigger } dblClickNode={ dblClickNode } searchTargetItemId={ searchTargetItemId } setSearchTargetItemId={ setSearchTargetItemId } />
  );
};

export default TreeEquipType;
