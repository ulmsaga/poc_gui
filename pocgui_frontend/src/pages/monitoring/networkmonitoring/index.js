import { Box, Checkbox, FormControlLabel, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import GridMain from "components/grid/GridMain";
import useMessage from "hooks/useMessage";
import TreeEquipType from "./items/TreeEquipType.js";
import { getEnbTreeList, getMmeTreeList } from "api/nw/configApi.js";
import { TypoLabel, TypoLableNoLine, TypoMarkLableNoLine } from "components/label/index.js";
import { DateRangeTwoTone, FiberManualRecordTwoTone, PauseCircleFilledTwoTone, PlayCircleFilledTwoTone } from "@mui/icons-material";
import KpiAnalysis from "pages/analysis/kpianalysis/index.js";
import { getNwAlarm1M, getLastStatusTime } from "api/nw/monitorApi.js";
import { fnDateToFormatStr, fnStrToDate } from "utils/common.js";
import { NODE_TYPE_PATTERN_ENB, NODE_TYPE_PATTERN_EPC } from "data/common/index.js";
import PopupSetHistoryDate from "./popup/PopupSetHistoryDate.js/index.js";

const NetworkMonitoring = () => {
  // eslint-disable-next-line no-unused-vars
  const { alert } = useMessage();

  const [mmeTreeList, setMmeTreeList] = useState([]);
  const [enbTreeList, setEnbTreeList] = useState([]);

  const [mmeAlarmList, setMmeAlarmList] = useState([]);
  const [enbAlarmList, setEnbAlarmList] = useState([]);
  
  // FILTER COUNT
  const [filterCrCnt, setFilterCrCnt] = useState(0);
  const [filterMjCnt, setFilterMjCnt] = useState(0);
  const [filterMnCnt, setFilterMnCnt] = useState(0);

  // FILTER CHECK
  const [nodeFilterCheck, setNodeFilterCheck] = useState(true);
  const [linkFilterCheck, setLinkFilterCheck] = useState(true);

  // MONITORING
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [isReRun, setIsReRun] = useState(false);

  // POPUP SET LAST DATE FOR MONITORING
  const [isOpenPopupHistoryDate, setIsOpenPopupHistoryDate] = useState(false);

  const [alarmList, setAlarmList] = useState([]);
  const [gridMainData, setGridMainData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [monitorParam, setMonitorParam] = useState({});
  const [monitorTime, setMonitorTime] = useState('');
  const [monitorFormatTime, setMonitorFormatTime] = useState('');

  const [callKpiFlag, setCallKpiFlag] = useState(false);
  const [searchTargetMmeId, setSearchTargetMmeId] = useState('');
  const [searchTargetEnbId, setSearchTargetEnbId] = useState('');

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
  
  

  const getMonitorTime = (isSetAndRun) => {
    const param = {};
    if (isSetAndRun === undefined || isSetAndRun === null || isSetAndRun === '') isSetAndRun = false;
    getLastStatusTime(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          console.log('getMonitorTime', ret.rs);
          setMonitorTime(ret.rs);
          setMonitorFormatTime(fnDateToFormatStr(fnStrToDate(ret.rs), 'yyyy-MM-dd HH:mm'));
          if (isSetAndRun) {
            getMonitorAlarm(ret.rs);
          }
        }
      }
    });
  };

  const getMonitorAlarm = (sTime) => {
    const param = {
      monitorTime: monitorTime
    };

    if (sTime !== undefined || sTime !== null || sTime !== '') {
      param.monitorTime = sTime;
    }

    getNwAlarm1M(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          if (ret.rs.alarmList !== undefined && ret.rs.alarmList !== null && ret.rs.alarmList !== '') {
            setAlarmList(ret.rs.alarmList);
            filterData(ret.rs.alarmList);
          }
        }
      }
    });
  };

  const setEquipAlarm = (list) => {
    const data = JSON.parse(JSON.stringify(list));
    const filterMmeAlarmList = data.filter(item => (item.node1_type === 'MME' || item.node2_type === 'MME'));
    const filterEnbAlarmList = data.filter(item => (item.node1_type === 'ENB'));
    // set 처리시 한박자 늦게 동작 하는 듯... 처리 필요
    setMmeAlarmList(filterMmeAlarmList);
    setEnbAlarmList(filterEnbAlarmList);
  };

  const setGradeCnt = (list) => {
    const data = JSON.parse(JSON.stringify(list));
    const filterCrCnt = data.filter(item => item.grade === 'CR').length;
    const filterMjCnt = data.filter(item => item.grade === 'MJ').length;
    const filterMnCnt = data.filter(item => item.grade === 'MN').length;
  
    setFilterCrCnt(filterCrCnt);
    setFilterMjCnt(filterMjCnt);
    setFilterMnCnt(filterMnCnt);
  };

  const filterData = (list) => {
    // console.log('checked ::', nodeFilterCheck, linkFilterCheck);
    console.log('filter nodeFilterCheck : ', nodeFilterCheck, 'linkFilterCheck', linkFilterCheck);
    
    if (list === undefined || list === null || list === '') list = JSON.parse(JSON.stringify(alarmList));
    const tmp = JSON.parse(JSON.stringify(list));

    const filteredData = tmp.filter(item => {
      if (nodeFilterCheck && item.graph_type === 'NODE') {
        return true;
      }
      if (linkFilterCheck && item.graph_type === 'LINK') {
        return true;
      }
      return false;
    });

    console.log(filteredData);
    setGridMainData(filteredData);
    setGradeCnt(filteredData);
    setEquipAlarm(filteredData)
  };

  const nodeFilterCheckChange = (event) => {
    setNodeFilterCheck(event.target.checked);
  };
  const linkFilterCheckChange = (event) => {
    setLinkFilterCheck(event.target.checked);
  };
  
  const treeEquipNodeClicked = (params) => {
    params.callFromMonitorType = 'EQUIP';
    params.monitorTime = monitorTime;
    setMonitorParam(params);
    setCallKpiFlag(!callKpiFlag);
  };

  
  const gridAlarmCellDbClick = (rows) => {
    console.log('gridAlarmCellDbClick', rows);
    if (rows.data.node1_type === 'MME') {
      setSearchTargetMmeId(rows.data.node1_key);
    } else if (rows.data.node1_type === 'ENB') {
      setSearchTargetEnbId(rows.data.node1_key);
      if (rows.data.node2_type === 'MME') {
        setSearchTargetMmeId(rows.data.node2_key);
      }
    }

    const param = rows.data;
    param.callFromMonitorType = 'ALARM';
    param.monitorTime = monitorTime;
    setMonitorParam(param);
    setCallKpiFlag(!callKpiFlag);
  };

  
  const callBackFromPopupSetHistoryDate = (ret) => {
    // alert( fnDateToFormatStr(ret, 'yyyyMMddHHmmss') );
    if (ret !== undefined) {
      setIsMonitoring(false);
      const tmpMonitorTime = fnDateToFormatStr(ret, 'yyyyMMddHHmmss');
      const tmpMonitorFormatTime = fnDateToFormatStr(ret, 'yyyy-MM-dd HH:mm');
      setMonitorTime(tmpMonitorTime);
      setMonitorFormatTime(tmpMonitorFormatTime);
      getMonitorAlarm(tmpMonitorTime);
    }
  };
  
  const callbackSseEvent = (data) => {
    if (!isMonitoring) return;

    if (data === "OK" || data === "200") {
      getMonitorTime(true);
    }

    const tmpMonitorTime = data.monitor_time;
    console.log('tmpMonitorTime', tmpMonitorTime);
    setMonitorTime(tmpMonitorTime);
    setMonitorFormatTime(fnDateToFormatStr(fnStrToDate(tmpMonitorTime), 'yyyy-MM-dd HH:mm'));
    setAlarmList(data.alarmList);
    filterData(data.alarmList);
  };
  
  // ====================================================================================================
  // SSE EVENT
  const eventSource = useRef();
  const reconnectFrequencySecond = useRef(1);
  const SSE_TYPE_NW_ALARM= 'nwAlarmResultList';
  eventSource.current = {};
  const setupEventSource = useCallback(() => {
    eventSource.current = new EventSource('/poc_service/sse/subscribe')
    .addEventListener(SSE_TYPE_NW_ALARM, (event) => {
      const data = JSON.parse(event.data);
      if (data === "OK" || data === "200") {
        callbackSseEvent(data);
      } else {
        if (data?.length === undefined || data?.length === null) return;
        if (data?.length > 0) {
          callbackSseEvent(data[0]);
        }
      }
    });
    return () => {
      eventSource.current.close();
      console.log('[sse] close useCallback => current close & status :: ', eventSource.current.readyState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  eventSource.current.onopen = (e) => {
    console.log("SSE connection opened");
    reconnectFrequencySecond.current = 1;
  }
  
  eventSource.current.onerror = (e) => {
    console.log('[sse] error :: ', e);
    eventSource.current.close();
    console.log('[sse] error => current close & status :: ', eventSource.current.readyState);
    reConnectFunc();
  }
  
  const isFunction = (functionTOCheck) => {
    return functionTOCheck && {}.toString.call(functionTOCheck) === '[object Function]';
  };
  const debounce = (func, wait) => {
    let timeout;
    let waitFunc;
  
    return function () {
      console.log('[sse] debounce');
      if (isFunction(wait)) {
        waitFunc = wait;
      } else {
        waitFunc = () => {
          return wait;
        }
      }
      const later = () => {
        console.log('[sse] call later');
        timeout = null;
        func.apply();
      }
      clearTimeout(timeout);
      console.log('[sse] wait seconds :: ', waitFunc());
      timeout = setTimeout(later, waitFunc());
    }
  }
  
  const reConnectFunc = debounce(() => {
    setupEventSource();
    reconnectFrequencySecond.current *= 2;
    console.log('[sse] reconnectFrequencySecond :: ', reconnectFrequencySecond.current);
    if (reconnectFrequencySecond.current > 64) {
      reconnectFrequencySecond.current = 64;
    }
  }, () => {
    console.log('[sse] reconnectFrequencySecond X 1000 :: ', reconnectFrequencySecond.current * 1000);
    return reconnectFrequencySecond.current * 1000;
  });
  // SSE EVENT
  // ====================================================================================================

  useEffect(() => {
    getMmeTreeList({}).then((response) => {
      setMmeTreeList(response.data.rs);
    });
    getEnbTreeList({}).then((response) => {
      setEnbTreeList(response.data.rs)
    });
    setTimeout(() => setupEventSource(), 1000);
    return () => {
      if (isFunction(eventSource.current.close)) eventSource.current.close();
      console.log('[sse] close useEffect => current close & status :: ', eventSource.current.readyState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  useEffect(() => {
    if (isMonitoring && isReRun) {
      getMonitorTime(true);
    } else {
      setIsReRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMonitoring]);
  
  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeFilterCheck, linkFilterCheck]);

  return (
    <Fragment>
      <Grid sx={{ width: '100%', height: 'calc(100vh - 70px)', flexGrow: 1, paddingTop: '3px' }} container spacing={0.5}>
        <Grid item sx={{ width: '300px'}}>
          <Box height={'50px'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' /*, backgroundColor: '#d8edff'*/ }} >
            <Stack direction={'row'} spacing={0} p={0} marginTop={0.6} sx={{ justifyContent: 'space-between', verticalAlign: 'middle', height: '30px' }}>
              <Stack direction={'row'} spacing={0} p={0} sx={{ verticalAlign: 'middle', height: '100%' }}>
                <TypoMarkLableNoLine label={'감시'} style={{ width: '100%', paddingRight: '10px' }}/>
                {/* <TypoLabel label={ monitorFormatTime } style={{ height: '26px', width: '130px', fontSize: '14px', fontWeight: 'bold', marginTop: '1px', textAlign: 'center', border: '0.5px solid #9fa2a7' , borderRadius: '0px' }}/> */}
                <TypoLabel label={ monitorFormatTime } width={ '130px' } bgType={ 'gray' }/>
                <IconButton size={ 'small' } color='primary' onClick={ () => { setIsOpenPopupHistoryDate(true) } }>
                  <DateRangeTwoTone fontSize='small' htmlColor="#42a6fd" />
                </IconButton>
              </Stack>
              <IconButton size={ 'small' } color='primary' onClick={ () => {setIsMonitoring(!isMonitoring)} }>
                { (isMonitoring) && <PauseCircleFilledTwoTone fontSize='small' htmlColor="#42a6fd" />}
                { (!isMonitoring) && <PlayCircleFilledTwoTone fontSize='small' htmlColor="#42a6fd" />}
              </IconButton>
            </Stack>
          </Box>
          {/* TREE1 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType nodeTypePattern={ NODE_TYPE_PATTERN_EPC } data={ mmeTreeList } alarmList={ mmeAlarmList } treeEndNodeClicked={ treeEquipNodeClicked } searchTargetItemId={ searchTargetMmeId } setSearchTargetItemId={ setSearchTargetMmeId }/>
          </Box>
          {/* TREE2 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType nodeTypePattern={ NODE_TYPE_PATTERN_ENB } data={ enbTreeList } alarmList={ enbAlarmList } treeEndNodeClicked={ treeEquipNodeClicked } searchTargetItemId={ searchTargetEnbId } setSearchTargetItemId={ setSearchTargetEnbId } />
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
                <Stack direction={'row'} sx={{ justifyContent: 'space-between', verticalAlign: 'middle', height: '30px' }}>
                  <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
                    <TypoMarkLableNoLine label={'ALARM LIST'} style={{ width: '100%' }}/>
                    {/* <span style={{ width: '10px' }}/> */}
                    <Stack sx={{ width: '10px' }} />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ nodeFilterCheck }
                          onChange={ nodeFilterCheckChange }
                          color="primary"
                          sx={{ paddingTop: '6px', transform: 'scale(0.7)'}}
                        />
                      }
                      sx={{
                        paddingTop: '6px',
                        '& .MuiTypography-root': {
                          fontSize: '0.7rem',
                          marginTop: '0px',
                          marginLeft: '-6px'
                        }
                      }}
                      label="NODE"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ linkFilterCheck }
                          onChange={ linkFilterCheckChange }
                          color="primary"
                          sx={{ paddingTop: '6px', transform: 'scale(0.7)'}}
                        />
                      }
                      sx={{
                        paddingTop: '6px',
                        '& .MuiTypography-root': {
                          fontSize: '0.7rem',
                          marginTop: '0px',
                          marginLeft: '-6px'
                        }
                      }}
                      label="LINK"
                      labelPlacement="end"
                    />
                  </Stack>
                  <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
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
                  onCellDoubleClicked={ gridAlarmCellDbClick }
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* <PopupEquipStatus title={'Equip Status'} params={{}} style={{ width: '100%', height: 1000 }} isOpen={ isOpenPopupStatus } setIsOpen={ setIsOpenPopupStatus }/> */}
      <PopupSetHistoryDate title={'과거 알람 조회'} params={{ monitorTime: monitorTime }} style={{ width: 500, height: 800, left: 100, top: '-100px' }} isOpen={ isOpenPopupHistoryDate } setIsOpen={ setIsOpenPopupHistoryDate } callBackFn={ callBackFromPopupSetHistoryDate }/>
    </Fragment>
  );
};

export default NetworkMonitoring;