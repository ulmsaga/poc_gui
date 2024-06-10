import { Box, Checkbox, FormControlLabel, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import GridMain from "components/grid/GridMain";
import useMessage from "hooks/useMessage";
import TreeEquipType from "./items/TreeEquipType.js";
import { getEnbTreeList, getMmeTreeList } from "api/nw/configApi.js";
import { TypoLabel, TypoLableNoLine, TypoMarkLableNoLine } from "components/label/index.js";
import { DateRangeTwoTone, FiberManualRecordTwoTone, PauseCircleFilledTwoTone, PlayCircleFilledTwoTone } from "@mui/icons-material";
import KpiAnalysis from "pages/analysis/kpianalysis/index.js";
import { getCurAlarm1M, getLastStatusTime } from "api/nw/monitorApi.js";

const NetworkMonitoring = () => {
  // eslint-disable-next-line no-unused-vars
  const { alert } = useMessage();

  const [mmeTreeList, setMmeTreeList] = useState([]);
  const [enbTreeList, setEnbTreeList] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [mmeAlarmList, setMmeAlarmList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [enbAlarmList, setEnbAlarmList] = useState([]);
  
  // Popup Status
  // const [isOpenPopupStatus, setIsOpenPopupStatus] = useState(false);

  
  
  const [filterCrCnt, setFilterCrCnt] = useState(0);
  const [filterMjCnt, setFilterMjCnt] = useState(0);
  const [filterMnCnt, setFilterMnCnt] = useState(0);

  const [nodeCheck, setNodeCheck] = useState(true);
  const [linkCheck, setLinkCheck] = useState(true);

  const nodeAlarmCols = [
    {
      headerName: '등급', 
      field: 'grade', 
      width: 60, 
      suppressSizeToFit: true, 
      cellRenderer: (params) => {
        if (params.value === 'CR') {
          return <Tooltip title={params.value}><FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#FF6347' }}/></Tooltip>;
        } else if (params.value === 'MJ') {
          return <Tooltip title={params.value}><FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#FFA500' }}/></Tooltip>
        } else if (params.value === 'MN') {
          return <Tooltip title={params.value}><FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#FFD700' }}/></Tooltip>
        } else {
          return null;
        }
      },
      cellStyle: { textAlign: 'center' }
    },
    { headerName: '발생시간', field: 'event_exp_time', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } },
    {
      headerName: '구분',
      children: [
        {headerName: 'TYPE', field: "graph_type", width: 80, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '정보', field: "location", width: 80, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
      ]
    },
    {
      headerName: '장비1',
      children: [
        {headerName: '명칭', field: "node1_name", width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '조직', field: "node1_org", width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
      ]
    },
    {
      headerName: '장비2',
      children: [
        {headerName: '명칭', field: "node2_name", width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '조직', field: "node2_org", width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
      ]
    },
    {
      headerName: '알람 내역',
      children: [
        {headerName: 'CALL TYPE', field: "call_type", width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '명칭', field: "alarm_name", width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '원인', field: "operator_result", width: 80, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '현재값', field: 'current_value', minWidth: 80, width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '산출근거', field: "current_expression", width: 200, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '정상기준', field: "normal_case", width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
      ]
    },
    {headerName: '연속', field: 'continue_cnt', minWidth: 80, width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }}
  ];
  
  const [alarmList, setAlarmList] = useState([]);
  const [gridMainData, setGridMainData] = useState([]);

  // const [lastStatusTime, setLastStatusTime] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [monitorParam, setMonitorParam] = useState({});
  const [monitorTime, setMonitorTime] = useState('');

  const getMonitorTime = () => {
    const param = {};
    getLastStatusTime(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          console.log('getMonitorTime', ret.rs);
          setMonitorTime(ret.rs);
        }
      }
    });
  };

  const getMonitorAlarm = () => {
    const param = {
      monitorTime: monitorTime
    };
    console.log('getMonitorAlarm', param.monitorTime);
    getCurAlarm1M(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {

          setAlarmList(ret.rs);
          setGridMainData(ret.rs);
          // filterData();
          // setGradeCnt();
        }
      }
    });
  };

  const setGradeCnt = () => {
    const data = JSON.parse(JSON.stringify(gridMainData));
    const filterCrCnt = data.filter(item => item.grade === 'CR').length;
    const filterMjCnt = data.filter(item => item.grade === 'MJ').length;
    const filterMnCnt = data.filter(item => item.grade === 'MN').length;
  
    setFilterCrCnt(filterCrCnt);
    setFilterMjCnt(filterMjCnt);
    setFilterMnCnt(filterMnCnt);
  };

  const filterData = () => {
    console.log('checke ::', nodeCheck, linkCheck);
    
    const filteredData = alarmList.filter(item => {
      if (nodeCheck && item.graph_type === 'NODE') {
        return true;
      }
      if (linkCheck && item.graph_type === 'LINK') {
        return true;
      }
      return false;
    });

    console.log(filteredData);
    setGridMainData(filteredData);
  };

  const [callKpiFlag, setCallKpiFlag] = useState(false);
  const dblClickNode = (params) => {
    // alert(params.name);
    // setIsOpenPopupStatus(true);
    // console.log('dblClickNode', params);
    params.monitorTime = monitorTime;
    setMonitorParam(params);
    setCallKpiFlag(!callKpiFlag);
  };

  useEffect(() => {
    getMonitorTime();
    getMmeTreeList({}).then((response) => {
      setMmeTreeList(response.data.rs);
    });
    getEnbTreeList({}).then((response) => {
      setEnbTreeList(response.data.rs)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMonitorAlarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monitorTime]);

  useEffect(() => {
    // filterData();
    setGradeCnt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridMainData]);

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCheck, linkCheck]);

  const inputRef = useRef(null)

  useEffect(() => {
      let resizeObserverEntries = []
      const observer = new ResizeObserver((entries)=>{
          resizeObserverEntries = entries
      })
      if(inputRef.current) observer.observe(inputRef.current)
      return () => {
          resizeObserverEntries.forEach((entry)=>entry.target.remove())
          observer.disconnect()
      }
  },[])

  return (
    <Fragment>
      <Grid sx={{ width: '100%', height: 'calc(100vh - 70px)', flexGrow: 1, paddingTop: '3px' }} container spacing={0.5}>
        <Grid item sx={{ width: '300px'}}>
          <Box height={'50px'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' /*, backgroundColor: '#d8edff'*/ }} >
            <Stack direction={'row'} spacing={0} p={0} marginTop={0.6} sx={{ justifyContent: 'space-between', verticalAlign: 'middle', height: '100%' }}>
              <Stack direction={'row'} spacing={0} p={0} sx={{ verticalAlign: 'middle', height: '100%' }}>
                <TypoMarkLableNoLine label={'감시'} style={{ width: '100%', paddingRight: '10px' }}/>
                <TypoLabel label={'2021-09-01 10:00'} variant={'h3'} style={{ height: '26px', width: '130px', fontSize: '14px', fontWeight: 'bold', marginTop: '1px', textAlign: 'center', border: '0.5px solid #9fa2a7' /*, background: '#e6f4ff'*/ , borderRadius: '0px' }}/>
                <IconButton size={ 'small' } color='primary' onClick={ () => {} }>
                  <DateRangeTwoTone fontSize='small' htmlColor="#3ea2b3" />
                </IconButton>
              </Stack>
              <IconButton size={ 'small' } color='primary' onClick={ () => {} }>
                { (true) && <PauseCircleFilledTwoTone fontSize='small' htmlColor="#3ea2b3" />}
                { (false) && <PlayCircleFilledTwoTone fontSize='small' htmlColor="#3ea2b3" />}
              </IconButton>
            </Stack>
          </Box>
          {/* TREE1 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType data={ mmeTreeList } alarmList={ mmeAlarmList } dblClickNode={ dblClickNode }/>
          </Box>
          {/* TREE2 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType data={ enbTreeList } alarmList={ enbAlarmList } dblClickNode={ dblClickNode }/>
          </Box>
        </Grid>
        <Grid item sx={{ width: 'calc(100% - 310px)'}}>
          {/* <KpiAnalysis /> */}
          <Box height={'calc(70% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
            <Stack spacing={0} padding={0} sx={{ width:'100%', height: '30px' }}>
              <TypoMarkLableNoLine label={'KPI ANALYSIS'} style={{ width: '100%' }}/>
            </Stack>
            <Box height={'calc(100% - 30px)'} width={'100%'} gap={4} m={0} p={0} >
              <KpiAnalysis monitorParam={ monitorParam } callKpiFlag={ callKpiFlag } />
            </Box>
          </Box>
          <Box height={'calc(30% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
            <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
              <Stack spacing={0.5} p={0.5} sx={{ width:'100%' }}>
                <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                  <TypoMarkLableNoLine label={'ALARM LIST'} style={{ width: '100%' }}/>
                  <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={nodeCheck}
                          onChange={(event) => {
                            console.log('node', 'event.target.checked', event.target.checked);
                            setNodeCheck(event.target.checked);
                          }}
                          color="primary"
                          sx={{ paddingTop: 0, transform: 'scale(0.8)'}}
                        />
                      }
                      label="NODE 체크"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={linkCheck}
                          onChange={(event) => {
                            console.log('link', 'event.target.checked', event.target.checked);
                            setLinkCheck(event.target.checked);
                          }}
                          color="primary"
                          sx={{ paddingTop: 0, transform: 'scale(0.8)'}}
                        />
                      }
                      label="LINK 체크"
                      labelPlacement="end"
                    />
                    <FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#FF6347' }}/>
                    <TypoLableNoLine label={filterCrCnt} variant={'h3'} style={{ height: '26px', width: '50px', fontSize: '14px', fontWeight: 'bold', marginTop: '1px', textAlign: 'center', borderRadius: '0px' }}/>
                    <FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#FFA500' }}/>
                    <TypoLableNoLine label={filterMjCnt} variant={'h3'} style={{ height: '26px', width: '50px', fontSize: '14px', fontWeight: 'bold', marginTop: '1px', textAlign: 'center', borderRadius: '0px' }}/>
                    <FiberManualRecordTwoTone fontSize='small' style={{ marginTop: '2px' }} sx={{ paddingTop: 0.2, color: '#FFD700' }}/>
                    <TypoLableNoLine label={filterMnCnt} variant={'h3'} style={{ height: '26px', width: '50px', fontSize: '14px', fontWeight: 'bold', marginTop: '1px', textAlign: 'center', borderRadius: '0px' }}/>
                  </Stack>
                </Stack>
                <GridMain
                  className={'ag-theme-balham'}
                  style={{ height: '100%', width: '100%' }}
                  columnDefs={ nodeAlarmCols }
                  rowData={ gridMainData }
                  rowSelection={ 'multiple' }
                  getSelectedData={ (e) => {} }
                  // onGridReady={onGridReady}
                  // onModelUpdated={onGridReady}
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* <PopupEquipStatus title={'Equip Status'} params={{}} style={{ width: '100%', height: 1000 }} isOpen={ isOpenPopupStatus } setIsOpen={ setIsOpenPopupStatus }/> */}
    </Fragment>
  );
};

export default NetworkMonitoring;