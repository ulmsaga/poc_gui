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
import { fnDateToFormatStr, fnStrToDate } from "utils/common.js";
import { NODE_TYPE_PATTERN_ENB, NODE_TYPE_PATTERN_EPC } from "data/common/index.js";

const NetworkMonitoring = () => {
  // eslint-disable-next-line no-unused-vars
  const { alert } = useMessage();

  const [mmeTreeList, setMmeTreeList] = useState([]);
  const [enbTreeList, setEnbTreeList] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [mmeAlarmList, setMmeAlarmList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [enbAlarmList, setEnbAlarmList] = useState([]);
  
  const [filterCrCnt, setFilterCrCnt] = useState(0);
  const [filterMjCnt, setFilterMjCnt] = useState(0);
  const [filterMnCnt, setFilterMnCnt] = useState(0);

  // FILTER CHECK
  const [nodeFilterCheck, setNodeFilterCheck] = useState(true);
  const [linkFilterCheck, setLinkFilterCheck] = useState(true);

  const [isMonitoring, setIsMonitoring] = useState(true);

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
  const [monitorFormatTime, setMonitorFormatTime] = useState('');

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

    console.log('getMonitorAlarm', param.monitorTime);
    getCurAlarm1M(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {

          console.log('nodeFilterCheck ::', nodeFilterCheck);

          setAlarmList(ret.rs);
          filterData(ret.rs);
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
  
  const [callKpiFlag, setCallKpiFlag] = useState(false);
  const dblClickNode = (params) => {
    params.callFromMonitorType = 'EQUIP';
    params.monitorTime = monitorTime;
    setMonitorParam(params);
    setCallKpiFlag(!callKpiFlag);
  };

  const [searchTargetMmeId, setSearchTargetMmeId] = useState('');
  const [searchTargetEnbId, setSearchTargetEnbId] = useState('');
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

  useEffect(() => {
    getMmeTreeList({}).then((response) => {
      setMmeTreeList(response.data.rs);
    });
    getEnbTreeList({}).then((response) => {
      setEnbTreeList(response.data.rs)
    });
    getMonitorTime(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [pollingCnt, setPollingCnt] = useState(0);
  const updatePollingCnt = (cnt) => {
    setPollingCnt(cnt);
  };

  const tmpRef = useRef(0);
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        console.log('tmpRef.current ::', tmpRef.current);
        if (tmpRef.current > 100) {
          tmpRef.current = 1;
        } else {
          tmpRef.current = tmpRef.current + 1;
        }
        updatePollingCnt(tmpRef.current);
      }, 60000);
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMonitoring]);

  useEffect(() => {
    console.log('pollingCnt ::', pollingCnt);
    if (pollingCnt > 0) {
      getMonitorTime(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pollingCnt]);

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeFilterCheck, linkFilterCheck]);

  return (
    <Fragment>
      <Grid sx={{ width: '100%', height: 'calc(100vh - 70px)', flexGrow: 1, paddingTop: '3px' }} container spacing={0.5}>
        <Grid item sx={{ width: '300px'}}>
          <Box height={'50px'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' /*, backgroundColor: '#d8edff'*/ }} >
            <Stack direction={'row'} spacing={0} p={0} marginTop={0.6} sx={{ justifyContent: 'space-between', verticalAlign: 'middle', height: '100%' }}>
              <Stack direction={'row'} spacing={0} p={0} sx={{ verticalAlign: 'middle', height: '100%' }}>
                <TypoMarkLableNoLine label={'감시'} style={{ width: '100%', paddingRight: '10px' }}/>
                <TypoLabel label={ monitorFormatTime } variant={'h3'} style={{ height: '26px', width: '130px', fontSize: '14px', fontWeight: 'bold', marginTop: '1px', textAlign: 'center', border: '0.5px solid #9fa2a7' /*, background: '#e6f4ff'*/ , borderRadius: '0px' }}/>
                <IconButton size={ 'small' } color='primary' onClick={ () => { getMonitorTime(true) } }>
                  <DateRangeTwoTone fontSize='small' htmlColor="#3ea2b3" />
                </IconButton>
              </Stack>
              <IconButton size={ 'small' } color='primary' onClick={ () => {setIsMonitoring(!isMonitoring)} }>
                { (isMonitoring) && <PauseCircleFilledTwoTone fontSize='small' htmlColor="#3ea2b3" />}
                { (!isMonitoring) && <PlayCircleFilledTwoTone fontSize='small' htmlColor="#3ea2b3" />}
              </IconButton>
            </Stack>
          </Box>
          {/* TREE1 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType nodeTypePattern={ NODE_TYPE_PATTERN_EPC } data={ mmeTreeList } alarmList={ mmeAlarmList } dblClickNode={ dblClickNode } searchTargetItemId={ searchTargetMmeId } setSearchTargetItemId={ setSearchTargetMmeId }/>
          </Box>
          {/* TREE2 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType nodeTypePattern={ NODE_TYPE_PATTERN_ENB } data={ enbTreeList } alarmList={ enbAlarmList } dblClickNode={ dblClickNode } searchTargetItemId={ searchTargetEnbId } setSearchTargetItemId={ setSearchTargetEnbId } />
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
                          checked={ nodeFilterCheck }
                          onChange={ nodeFilterCheckChange }
                          color="primary"
                          sx={{ paddingTop: 0, transform: 'scale(0.8)'}}
                        />
                      }
                      label="NODE"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ linkFilterCheck }
                          onChange={ linkFilterCheckChange }
                          color="primary"
                          sx={{ paddingTop: 0, transform: 'scale(0.8)'}}
                        />
                      }
                      label="LINK"
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
                  onCellDoubleClicked={ gridAlarmCellDbClick }
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