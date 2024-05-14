import { Box, Button, FormControl, Grid, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import UnstableFastTree from "components/virtualized-tree/UnstableFastTree";
// import { renderers } from "components/virtualized-tree/renderers/index.js";
import TreeState from "components/virtualized-tree/state/TreeState";
import Expandable from "components/virtualized-tree/renderers/Expandable";
import { DatePickerFromTo } from "components/datepicker";
import { add } from "date-fns";
import { AutoCompleteGroup, AutoCompleteCheck, AutoCompleteEquip } from "components/autocomplete";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import useMessage from "hooks/useMessage";
import { callTypeList } from "data/common";


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

  // console.log('NetworkMonitoring', state.nodes);

  

  const handleChange = ( nodes ) => {
    setState( { nodes: nodes } )
  };


  const TreeComp = ({ style, node, nodes, ...rest }) => {
    // style.marginLeft = 0;
    // console.log('node : ', node);
    // console.log('style : ', style);
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

  const [period, setPeriod] = useState('1M');
  const [searchTarget1, setSearchTarget1] = useState('MME');
  const [searchTarget2, setSearchTarget2] = useState('-');

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

  useEffect(() => {
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
    console.log(callTypeList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call Type
  const [ selectedCallTypes, setSelectedCallTypes ] = useState([]);
  const onChangeCallTypeList = (selected) => {
    setSelectedCallTypes(selected);
  };

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
                  <Stack direction={'row'} sx={{ verticalAlign: 'middle' }}>
                    <FormControl sx={{ verticalAlign: 'middle', minWidth: 100, minHeight: 26 }} >
                      <Select
                        id="selectPeriod"
                        value={ period }
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        onChange={(e) => { setPeriod(e.target.value) }}
                        sx={{ borderRadius: '0px', minHeight: 26}}
                      >
                        <MenuItem value={'1M'}><span style={{ fontSize: '12px' }}>1M</span></MenuItem>
                        <MenuItem value={'1H'}><span style={{ fontSize: '12px' }}>1H</span></MenuItem>
                        <MenuItem value={'1D'}><span style={{ fontSize: '12px' }}>1D</span></MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
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
            <Stack Stack direction={'row'} spacing={1.5}  sx={{ height: '26px' }}>
              <Stack direction={'row'} spacing={0.2}>
                {/* <Typography variant="body2" paddingTop={0.5} paddingLeft={0.6} width={80} sx={{ textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }}>조회대상1</Typography> */}
                <TypoLabel label={'조회대상1'} />
                <FormControl sx={{ verticalAlign: 'middle', minWidth: 100, minHeight: 26 }} >
                  <Select
                    id="selectSearchTarget1"
                    value={ searchTarget1 }
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => { setSearchTarget1(e.target.value) }}
                    sx={{ borderRadius: '0px', minHeight: 26}}
                  >
                    <MenuItem value={'-'}><span style={{ fontSize: '12px' }}>-</span></MenuItem>
                    <MenuItem value={'MME'}><span style={{ fontSize: '12px' }}>MME</span></MenuItem>
                    <MenuItem value={'ENB'}><span style={{ fontSize: '12px' }}>ENB</span></MenuItem>
                  </Select>
                </FormControl>
                {/* <OutlinedInput id="outlined-basic" type="string" variant="outlined" /> */}
                {/* <AutoCompleteGroup item={[]}/> */}
                {/* <AutoCompleteCheck data={ callTypeList } selectedList={ selectedCallTypes } onChange={ onChangeCallTypeList } width={ 388 } /> */}
              </Stack>
              <Stack direction={'row'} spacing={0.2}>
                {/* <Typography variant="body2" paddingTop={0.5} paddingLeft={0.6} width={80} sx={{ textAlign: 'center', border: '0.5px solid #9fa2a7', background: '#f5f7f7', borderRadius: '0px' }}>조회대상2</Typography> */}
                <TypoLabel label={'조회대상2'} />
                <FormControl sx={{ verticalAlign: 'middle', minWidth: 100, minHeight: 26 }} >
                  <Select
                    id="searchTarget2"
                    value={ searchTarget2 }
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    onChange={(e) => { setSearchTarget2(e.target.value) }}
                    sx={{ borderRadius: '0px', minHeight: 26}}
                  >
                    <MenuItem value={'-'}><span style={{ fontSize: '12px' }}>-</span></MenuItem>
                    <MenuItem value={'S1-MME'}><span style={{ fontSize: '12px' }}>S1-MME</span></MenuItem>
                  </Select>
                </FormControl>
                <OutlinedInput id="outlined-basic" type="string" variant="outlined" />
              </Stack>
            </Stack>
            {/* ROW3 */}
            <Stack Stack direction={'row'} spacing={1.5}  sx={{ height: '26px' }}>
            <Stack direction={'row'} spacing={0.2}>
                <TypoLabel label={'CALL TYPE'} />
                {/* <SelectMulti options={callTypes} title={'CALL TYPE'} onChange={(e) => {}}/> */}
                {/* <AutoCompleteCheck data={ callTypeList } selectedList={ selectedCallTypes } onChange={ onChangeCallTypeList } width={ 388 } /> */}
                {/* <AutoCompleteEquip key={1} /> */}
                {/* <AutoCompleteEquip items={[]}/> */}
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
            <GridMain
                className={'ag-theme-balham'}
                style={{ height: '100%' }}
                rowData={rowData}
                columnDefs={colDefs}
            />
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NetworkMonitoring;