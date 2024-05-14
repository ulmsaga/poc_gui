import { Box, Button, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { renderers } from "components/virtualized-tree/renderers/index.js";
// import TreeState from "components/virtualized-tree/state/TreeState";
// import Expandable from "components/virtualized-tree/renderers/Expandable";
import { DatePickerFromTo } from "components/datepicker";
import { add } from "date-fns";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import useMessage from "hooks/useMessage";
import { callTypeList, mmeList, nodeTypeList, periodList } from "data/common";
import SelectBox from "components/select/SelectBox";
import { AutoCompleteCheck, AutoCompleteGroup } from "components/autocomplete";


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
  
  // const MIN_NUMBER_OF_PARENTS = 50;/
  // const MAX_NUMBER_OF_CHILDREN = 1000;
  // const MAX_DEEPNESS = 2;

  
  // const Nodes = constructTree(MAX_DEEPNESS, MAX_NUMBER_OF_CHILDREN, MIN_NUMBER_OF_PARENTS);
  
  
  // const [state, setState] = useState({ nodes: TreeState.createFromTree(Nodes) });

  // console.log('NetworkMonitoring', state.nodes);

  

  // const handleChange = ( nodes ) => {
  //   setState( { nodes: nodes } )
  // };

  // const TreeComp = ({ style, node, nodes, ...rest }) => {
  //   return (
  //     <div style={ style }>
  //       <Expandable node={node} {...rest} onChange={ handleChange }>
  //         {node.name}
  //       </Expandable>
  //     </div>
  //   );
  // };

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

  const [selectedFromToDate, setSelectedFromToDate] = useState({
    startDate: add(new Date(), {hours: -1}),
    endDate: new Date(),
    searchTarget: 'historyFromToTime'
  });

  const changeFromToDate = (e) => {
    if (e.searchTarget !== 'historyFromToTime') return;
    if (e.name === 'startDate') {
      setSelectedFromToDate({ ...selectedFromToDate, startDate: e.value });
    } else if (e.name === 'endDate') {
      setSelectedFromToDate({ ...selectedFromToDate, endDate: e.value });
    }
  };

  

  // const callTypes = useMemo(() => [{value: 'ATTACH', label: 'ATTACH'}, {value: 'SRMO', label: 'SRMO'}], []);

  const { alert, confirm } = useMessage();
  const excelDownload = () => {
    // Alert({ title: 'Excel Download', message: 'Excel Download', callback: (e) => { console.log(e); } });
    // confirm({ title: 'Excel Download', message: 'Excel Download', callback: callback });
    confirm('Excel Download', callback);
  };
  const callback = (ret) => {
    alert(ret);
  };

  

  
  // Period
  const [period, setPeriod] = useState('1M');

  // Node1 Type, Node2 Type
  const [searchTarget1, setSearchTarget1] = useState({ value : 'MME', label: 'MME', node: 'MME' });
  const [searchTarget2, setSearchTarget2] = useState({ value: '-', label: '-', node: '-' });
  const [node2TypeList, setNode2TypeList] = useState([{ value: '-', label: '-', node: '-' }]);

  const [selectedNode1, setSelectedNode1] = useState([]);
  const [selectedNode2, setSelectedNode2] = useState([]);
  const [node1List, setNode1List] = useState([]);
  const [node2List, setNode2List] = useState([]);

  const node1TypeChange = (e) => {
    setSearchTarget1(e.target);
    getNode2TypeList(e.target);

    if (e.target.node === 'MME') {
      setNode1List([...mmeList]);
    } else if (e.target.node === 'ENB') {
      setNode1List([]);
    } else {
      setNode1List([]);
    }
  };
  
  const getNode2TypeList = (node1Type) => {
    nodeTypeList.forEach((item) => {
      if (item.value === node1Type.value) {
        setNode2TypeList(item.linkTypeList);
        setSearchTarget2(item.linkTypeList[0]);
        getNode2List(item.linkTypeList[0]);
        return true;
      }
    });
  };

  const node2TypeChange = (e) => {
    setSearchTarget2(e.target);
    getNode2List(e.target);
  };

  const getNode2List = (target) => {
    if (target.node === 'MME') {
      setNode2List([...mmeList]);
    } else {
      setNode2List([]);
    }
  };

  const onChangeNode1 = (selected) => {
    setSelectedNode1(selected);
  };
  const onChangeNode2 = (selected) => {
    setSelectedNode2(selected);
  };
    
  // Call Type
  const [ selectedCallTypes, setSelectedCallTypes ] = useState([...callTypeList]);
  const onChangeCallTypeList = (selected) => {
    setSelectedCallTypes(selected);
  };

  useEffect(() => {
    setNode1List([...mmeList]);
    // setState({ nnodes: TreeState.createFromTree(Nodes) });
    // console.log('NetworkMonitoring useEffect', state.nodes);
    setRowData([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);
    setColDefs([
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid sx={{ width: '100%', height: 'calc(100vh - 70px)', flexGrow: 1, paddingTop: '3px' }} container spacing={0.5}>
      <Grid item sx={{ width: '300px'}}>
        {/* TREE1 */}
        <Box height={'calc(50% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
          {/* <UnstableFastTree nodes={state.nodes} onChange={handleChange} style={{ height: '100%' }}>
            {({style, node, ...rest}) => (
              <TreeComp style={style} node={node}  />
            )}
          </UnstableFastTree> */}
        </Box>
        {/* TREE2 */}
        <Box height={'calc(50% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
          {/* <UnstableFastTree nodes={state.nodes} onChange={handleChange} style={{ height: '100%' }}>
            {({style, node, ...rest}) => (
              <TreeComp style={style} node={node}  />
            )}
          </UnstableFastTree> */}
        </Box>
      </Grid>
      <Grid item sx={{ width: 'calc(100% - 310px)'}}>
        {/* ANALYSIS MAIN */}
        <Box height={'calc(70% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
          {/* CONDS */}
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle' }}>
            <Stack direction={'row'} spacing={0} sx={{ justifyContent: 'space-between', height: '26px' }}>
              {/* ROW1 CONDS */}
              <Stack direction={'row'} spacing={1.5}>
                <Stack direction={'row'} spacing={0.2} sx={{ verticalAlign: 'middle' }}>
                  {/* <Typography variant="body2" paddingTop={0.5} paddingLeft={0.6} width={80} sx={{ textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }}>조회기간</Typography> */}
                  <TypoLabel label={'조회기간'} />
                  <SelectBox options={ periodList } value={ period } onChange={(e) => { setPeriod(e.target.value) }}/>
                  <DatePickerFromTo selectedDate={ selectedFromToDate } isRange={ true } format={ 'yyyy-MM-dd HH:mm:00' } showTimeSelect={ true } onChangeDate={ changeFromToDate } useMaxDate={ false }/>
                </Stack>
              </Stack>
              {/* ROW1 BUTTONS */}
              <Stack direction={'row'} spacing={0.2} sx={{float: 'right'}}>
                <Button variant="contained" color="primary">Search</Button>
                <Button variant="contained" color="secondary" onClick={excelDownload}>Excel</Button>
              </Stack>
            </Stack>
            {/* ROW2 */}
            <Stack direction={'row'} spacing={1.5}  sx={{ height: '26px' }}>
              <Stack direction={'row'} spacing={0.2}>
                {/* <Typography variant="body2" paddingTop={0.5} paddingLeft={0.6} width={80} sx={{ textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }}>조회대상1</Typography> */}
                <TypoLabel label={'조회대상1'} />
                <SelectBox options={ nodeTypeList } value={ searchTarget1.value } onChange={ node1TypeChange }/>
                <AutoCompleteGroup data={ node1List } selectedList={ selectedNode1 } onChange={ onChangeNode1 } width={ 287 } groupFilter={'mtso_desc'} />
              </Stack>
              <Stack direction={'row'} spacing={0.2}>
                {/* <Typography variant="body2" paddingTop={0.5} paddingLeft={0.6} width={80} sx={{ textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }}>조회대상2</Typography> */}
                <TypoLabel label={'조회대상2'} />
                <SelectBox options={ node2TypeList } value={ searchTarget2.value } onChange={ node2TypeChange }/>
                <AutoCompleteGroup data={ node2List } selectedList={ selectedNode2 } onChange={ onChangeNode2 } width={ 287 } groupFilter={'mtso_desc'} />
              </Stack>
            </Stack>
            {/* ROW3 */}
            <Stack direction={'row'} spacing={1.5}  sx={{ height: '26px' }}>
            <Stack direction={'row'} spacing={0.2}>
                <TypoLabel label={'CALL TYPE'} />
                <AutoCompleteCheck data={ JSON.parse(JSON.stringify(callTypeList)) } selectedList={ selectedCallTypes } onChange={ onChangeCallTypeList } width={ 388 } />
              </Stack>
            </Stack>
          </Stack>
          {/* GRID KPI - CAUSE */}
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '60%' }}>
            <GridMain
              className={'ag-theme-balham'}
              style={{ height: '100%' }}
              rowData={rowData}
              columnDefs={colDefs}
            />
          </Stack>
          {/* GRID PATH */}
          <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: 'calc(40% - 92px)' }}>
            {/* <GridMain
              className={'ag-theme-balham'}
              style={{ height: '100%', width: '100%' }}
              rowData={rowData}
              columnDefs={colDefs}
            />
            <GridMain
              className={'ag-theme-balham'}
              style={{ height: '100%', width: '100%' }}
              rowData={rowData}
              columnDefs={colDefs}
            />
            <GridMain
              className={'ag-theme-balham'}
              style={{ height: '100%', width: '100%' }}
              rowData={rowData}
              columnDefs={colDefs}
            />
            <GridMain
              className={'ag-theme-balham'}
              style={{ height: '100%', width: '100%' }}
              rowData={rowData}
              columnDefs={colDefs}
            /> */}
          </Stack>
        </Box>
        <Box height={'calc(30% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
            {/* <GridMain
                className={'ag-theme-balham'}
                style={{ height: '100%' }}
                rowData={rowData}
                columnDefs={colDefs}
            /> */}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NetworkMonitoring;