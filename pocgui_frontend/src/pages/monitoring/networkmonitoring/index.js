import { Box, Divider, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import UnstableFastTree from "components/virtualized-tree/UnstableFastTree";
// import { renderers } from "components/virtualized-tree/renderers/index.js";
import TreeState from "components/virtualized-tree/state/TreeState";
import Expandable from "components/virtualized-tree/renderers/Expandable";
import { AgGridReact } from "ag-grid-react";


// const [Expandable, Deletable, Favorite] = renderers;


export const constructTree = (maxDeepness, maxNumberOfChildren, minNumOfNodes, deepness = 1) => {

  

  const ids = {};

  const getUniqueId = () => {
    const candidateId = Math.round(Math.random() * 1000000000);
  
    if (ids[candidateId]) {
      return getUniqueId();
    }
  
    ids[candidateId] = true;
  
    return candidateId;
  };

  return new Array(minNumOfNodes).fill(deepness).map((si, i) => {
    const id = getUniqueId();
    const numberOfChildren = deepness === maxDeepness ? 0 : Math.round(Math.random() * maxNumberOfChildren);

    return {
      id,
      name: `Leaf ${id}`,
      children: numberOfChildren ? constructTree(maxDeepness, maxNumberOfChildren, numberOfChildren, deepness + 1) : [],
      state: {
        expanded: numberOfChildren ? Boolean(Math.round(Math.random())) : false,
        favorite: Boolean(Math.round(Math.random())),
        deletable: Boolean(Math.round(Math.random())),
      },
    };
  });
};

const NetworkMonitoring = () => {
  
  const MIN_NUMBER_OF_PARENTS = 50;
  const MAX_NUMBER_OF_CHILDREN = 1000;
  const MAX_DEEPNESS = 2;

  
  const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);
  
  
  const [state, setState] = useState({ nodes: TreeState.createFromTree(Nodes) });

  console.log('NetworkMonitoring', state.nodes);

  /*
  useEffect(() => {
    setState({ nnodes: TreeState.createFromTree(Nodes) });
    console.log('NetworkMonitoring useEffect', state.nodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */

  const handleChange = ( nodes ) => {
    setState( { nodes: nodes } )
  };


  const TreeComp = ({ style, node, nodes, ...rest }) => {
    // style.marginLeft = 0;
    console.log('node : ', node);
    console.log('style : ', style);
    return (
      <div style={ style }>
        <Expandable node={node} {...rest} onChange={ handleChange }>
          {node.name}
        </Expandable>
      </div>
    );
  };

  //const treeStyle={ height: 20, left: 0, position: 'absolute', top: 0, width: '100%', userSelect: 'none', marginLeft: 0};

  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  return (
    <Grid sx={{ width: '100%', height: 'calc(100vh - 70px)', flexGrow: 1, paddingTop: '3px' }} container spacing={0.5}>
      <Grid item sx={{ width: '300px'}}>
        <Box height={'calc(50% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
          <UnstableFastTree nodes={state.nodes} onChange={handleChange} style={{ height: '100%' }}>
            {({style, node, ...rest}) => (
              <TreeComp style={style} node={node}  />
            )}
          </UnstableFastTree>
        </Box>
        <Box height={'calc(50% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
          <UnstableFastTree nodes={state.nodes} onChange={handleChange} style={{ height: '100%' }}>
            {({style, node, ...rest}) => (
              <TreeComp style={style} node={node}  />
            )}
          </UnstableFastTree>
        </Box>
      </Grid>
      <Grid item sx={{ width: 'calc(100% - 310px)'}}>
        <Box height={'calc(70% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
          <Stack spacing={0.5} divider={<Divider orientation="horizontal" flexItem />}>
          </Stack>
        </Box>
        <Box height={'calc(30% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
          <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: '100%' }} // the grid will fill the size of the parent container
          >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NetworkMonitoring;