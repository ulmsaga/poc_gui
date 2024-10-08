import { Box, Button, Grid, Stack } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { DatePickerFromTo } from "components/datepicker";
import { add, differenceInMinutes } from "date-fns";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import useMessage from "hooks/useMessage";
import { callTypeList, nodeTypeList, periodList } from "data/common";
import SelectBox from "components/select/SelectBox";
import { AutoCompleteCheck, AutoCompleteGroup } from "components/autocomplete";
import { forEach } from "lodash";
import { getEnbList, getEnbTreeList, getMmeList, getMmeTreeList } from "api/nw/configApi";
import TreeEquipType from "./items/TreeEquipType.js";
import PopupCallFailSearch from "./popup/PopupCallFailSearch.js/index.js";
import PopupEquipStatus from "./popup/PopupEquipStatus.js/index.js";
import ButtonIconHelp from "components/button/ButtonIconHelp";
import PopupEquipSearch from "popup/PopupEquipSearch";
import { FileDownloadOutlined, SearchOutlined } from "@mui/icons-material";
import { formatDate } from "utils/common";
import { getKpiAnalysis } from "api/nw/analysisApi";

const NetworkMonitoring = () => {
  const [mmeList, setMmeList] = useState([]);
  const [enbList, setEnbList] = useState([]);

  const [mmeTreeList, setMmeTreeList] = useState([]);
  const [enbTreeList, setEnbTreeList] = useState([]);

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

  const { alert, confirm } = useMessage();
  

  
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

    let target = {};

    forEach(nodeTypeList, (item) => {
      if (item.value === e.target.value) {
        target = JSON.parse(JSON.stringify(item));
        return true;
      }
    });

    if (target.node === 'MME') {
      setNode1List([...mmeList]);
    } else if (target.node === 'ENB') {
      setNode1List([...enbList]);
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
    let tmp = {}
    node2TypeList.forEach((item) => {
      if (item.value === target.value) {
        tmp = JSON.parse(JSON.stringify(item));
        return true;
      }
    });
    if (tmp.node === 'MME') {
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
   
  const searchNodeTypeClick = (e, targetNumName) => {
    // alert('searchNodeTypeClick');
    const params = {};
    if (targetNumName === 'node1') {
      params.nodeType = searchTarget1.value;
      params.selectedNode = JSON.parse(JSON.stringify(selectedNode1));
    } else if (targetNumName === 'node2') {
      params.nodeType = searchTarget2.value;
      params.selectedNode = JSON.parse(JSON.stringify(selectedNode2));
    }
    setEquipSearchparam(params);
    setIsOpenEquipSearch(true);
  };

  // Call Type
  const [ selectedCallTypes, setSelectedCallTypes ] = useState([...callTypeList]);
  const onChangeCallTypeList = (selected) => {
    setSelectedCallTypes(selected);
  };

  useEffect(() => {
    setNode1List([...mmeList]);
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

    getMmeList({}).then((response) => { console.log('getMeeList', setMmeList(response.data.rs)); setNode1List([...response.data.rs]); });
    getEnbList({}).then((response) => { console.log('getEnbList', setEnbList(response.data.rs)); });
    getMmeTreeList({}).then((response) => { console.log('getMmeTreeList', setMmeTreeList(response.data.rs)); });
    getEnbTreeList({}).then((response) => { console.log('getEnbTreeList', setEnbTreeList(response.data.rs)); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refTopTree = useRef();
  const refBotTree = useRef();

  // alarmList
  // eslint-disable-next-line no-unused-vars
  const [mmeAlarmList, setMmeAlarmList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [enbAlarmList, setEnbAlarmList] = useState([]);

  const excelDownload = () => {
    // Alert({ title: 'Excel Download', message: 'Excel Download', callback: (e) => { console.log(e); } });
    // confirm({ title: 'Excel Download', message: 'Excel Download', callback: callback });
    confirm('Excel Download', callback);
  };
  const callback = (ret) => {
    alert(ret);
  };

  const searchClick = () => {
    // Alarm Test
    // setMmeAlarmList([{ id:  'MME#44', alarmGrade: 'MJ' }]);
    // setEnbAlarmList([{ id: '143911', alarmGrade: 'CR' }]);
    
    // Call Fail Open Test
    // setIsOpenCallFailSearch(true);

    const param = {};
    param.isValid = true;
    param.nonValidMsg = '';

    // Terms & Time
    param.timeCond = period;
    param.startTime = formatDate(selectedFromToDate.startDate, 'yyyyMMddHHmm00');
    param.endTIme = formatDate(selectedFromToDate.endDate, 'yyyyMMddHHmm00');
    if (param.timeCond === '1M' && param.startTime === param.endTIme) {
      param.isValid = false;
      param.nonValidMsg = '시작 시간과 종료 시간을 다르게 설정하세요.\n';
    }
    if (param.startTime === param.endTIme) {
      param.isValid = false;
      param.nonValidMsg = param.nonValidMsg + '종료 시간이 시작 시간보다 빠릅니다. 변경 후 조회 해 주시기 바랍니다.\n';
    }
    param.diffOneMin = false;
    if (param.timeCond === '1M') {
      const diffMin = differenceInMinutes(selectedFromToDate.startDate, selectedFromToDate.endDate);
      if (diffMin === 1) {
        param.diffOneMin = true;
      }
    }

    // graphType
    param.graphType = 'NODE';
    if (searchTarget2.value !== '-') {
      param.graphType = 'LINK';
    }

    // Node1
    param.node1Type = searchTarget1.value;
    param.node1List = [];
    selectedNode1.forEach((item) => {
      param.node1List.push(item.value);
    });
    if (param.node1List.length === 0) {
      param.isValid = false;
      param.nonValidMsg = param.nonValidMsg + '조회대상1을 1건 이상 선택하세요.\n';
    }

    // Node2
    param.node2Type = searchTarget2.value;
    param.node2List = [];
    selectedNode2.forEach((item) => {
      param.node2List.push(item.value);
    });

    // Call Type
    param.callTypeList = [];
    selectedCallTypes.forEach((item) => {
      param.callTypeList.push(item.value);
    });
    if (param.callTypeList.length === 0) {
      param.isValid = false;
      param.nonValidMsg = param.nonValidMsg + 'CALL TYPE을 1건 이상 선택하세요.\n';
    }

    // Show DetachCnt
    param.addDetachCnt = 'OK';

    if (param.isValid === false) {
      alert(param.nonValidMsg);
      return;
    }

    getKpiAnalysis(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          // setRowData(ret.rs);
          console.log(ret.rs);
        }
      }
    });
  };

  // Call Fail Search
  const [isOpenCallFailSearch, setIsOpenCallFailSearch] = useState(false);
  // Popup Status
  const [isOpenPopupStatus, setIsOpenPopupStatus] = useState(false);
  // const [popupStatusParam, setPopupStatusParam] = useState({});
  // Equip Search
  const [isOpenEquipSearch, setIsOpenEquipSearch] = useState(false);
  const [equipSearchParam, setEquipSearchparam] = useState({});

  const openPopupStatus = (params) => {
    alert(params.name);
    setIsOpenPopupStatus(true);
  };

  const callBackEquipSearch = (ret) => {
    setSelectedNode1(ret);
  };

  return (
    <Fragment>
      <Grid sx={{ width: '100%', height: 'calc(100vh - 70px)', flexGrow: 1, paddingTop: '3px' }} container spacing={0.5}>
        <Grid item sx={{ width: '300px'}}>
          {/* TREE1 */}
          <Box ref = { refTopTree } height={'calc(50% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType data={ mmeTreeList } alarmList={ mmeAlarmList } openPopupStatus={ openPopupStatus }/>
          </Box>
          {/* TREE2 */}
          <Box ref = { refBotTree } height={'calc(50% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType data={ enbTreeList } alarmList={ enbAlarmList } openPopupStatus={ openPopupStatus }/>
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
                    <TypoLabel label={'조회기간'} />
                    <SelectBox options={ periodList } value={ period } onChange={(e) => { setPeriod(e.target.value) }}/>
                    <DatePickerFromTo selectedDate={ selectedFromToDate } isRange={ true } format={ 'yyyy-MM-dd HH:mm:00' } showTimeSelect={ true } onChangeDate={ changeFromToDate } useMaxDate={ false }/>
                  </Stack>
                </Stack>
                {/* ROW1 BUTTONS */}
                <Stack direction={'row'} spacing={0.2} sx={{float: 'right'}}>
                  <Button variant="contained" color='primary' startIcon={<SearchOutlined fontSize="small" />} sx={{ minWidth: '100px' }} onClick={ searchClick }>조회</Button>
                  <Button variant="contained" color="secondary" startIcon={<FileDownloadOutlined fontSize="small" />} sx={{ minWidth: '100px' }} onClick={ excelDownload }>다운로드</Button>
                </Stack>
              </Stack>
              {/* ROW2 */}
              <Stack direction={'row'} spacing={1.5}  sx={{ height: '26px' }}>
                <Stack direction={'row'} spacing={0.2}>
                  <TypoLabel label={'조회대상1'} />
                  <SelectBox options={ nodeTypeList } value={ searchTarget1.value } onChange={ node1TypeChange }/>
                  <AutoCompleteGroup data={ node1List } selectedList={ selectedNode1 } onChange={ onChangeNode1 } width={ 287 } groupFilter={'group_filter'} />
                  <ButtonIconHelp iconType="search" onClick={ (e) => { searchNodeTypeClick(e, 'node1') }} />
                </Stack>
                <Stack direction={'row'} spacing={0.2}>
                  <TypoLabel label={'조회대상2'} />
                  <SelectBox options={ node2TypeList } value={ searchTarget2.value } onChange={ node2TypeChange }/>
                  <AutoCompleteGroup data={ node2List } selectedList={ selectedNode2 } onChange={ onChangeNode2 } width={ 287 } groupFilter={'group_filter'} />
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
              />
              <GridMain
                className={'ag-theme-balham'}
                style={{ height: '100%', width: '100%' }}
                rowData={rowData}
                columnDefs={colDefs}
              />
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
      <PopupCallFailSearch title={'Call Fail Search'} params={{}} style={{ width: '100%', height: 1000 }} isOpen={ isOpenCallFailSearch } setIsOpen={ setIsOpenCallFailSearch }/>
      <PopupEquipStatus title={'Equip Status'} params={{}} style={{ width: '100%', height: 1000 }} isOpen={ isOpenPopupStatus } setIsOpen={ setIsOpenPopupStatus }/>
      <PopupEquipSearch title={'Equip Search'} params={ equipSearchParam } popupCallBack={ callBackEquipSearch } style={{ width: '100%', height: 1000 }} isOpen={ isOpenEquipSearch } setIsOpen={ setIsOpenEquipSearch }/>
    </Fragment>
  );
};

export default NetworkMonitoring;