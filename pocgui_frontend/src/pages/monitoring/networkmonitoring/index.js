import { Box, Grid, IconButton, Stack } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import GridMain from "components/grid/GridMain";
import useMessage from "hooks/useMessage";
import TreeEquipType from "./items/TreeEquipType.js";
import PopupEquipStatus from "./popup/PopupEquipStatus.js/index.js";
import { getEnbTreeList, getMmeTreeList } from "api/nw/configApi.js";
import { TypoLabel, TypoMarkLableNoLine } from "components/label/index.js";
import { DateRangeTwoTone, PauseCircleFilledTwoTone, PlayCircleFilledTwoTone } from "@mui/icons-material";
import KpiAnalysis from "pages/analysis/kpianalysis/index.js";
import { getLastStatusTime } from "api/nw/monitorApi.js";

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
  const [isOpenPopupStatus, setIsOpenPopupStatus] = useState(false);

  const openPopupStatus = (params) => {
    // alert(params.name);
    setIsOpenPopupStatus(true);
  };
  
  const nodeAlarmCols = [
    {
      headerName: '처리시간',
      children: [{ headerName:'', field: 'event_exp_time', width: 120, suppressSizeToFit: true }]
    },
    {
      headerName: 'NODE',
      children: [
        {headerName: 'TYPE', field: "node1_type", width: 80, suppressSizeToFit: true},
        {headerName: 'ID', field: "node1_id", width: 80, suppressSizeToFit: true},
        {headerName: 'NAME', field: "node1_exp_id", width: 80, suppressSizeToFit: true},
      ]
    },
    {
      headerName: 'CALL TYPE',
      children: [
        {headerName: '', field: "call_type", width: 80, suppressSizeToFit: true},
      ]
    },
    {
      headerName: '알람정보',
      children: [
        {headerName: '내역', field: "alarm_desc", width: 80, suppressSizeToFit: true},
        {headerName: '값', field: "alarm_value", width: 80, suppressSizeToFit: true},
        {headerName: '연속', field: "continue_cnt", width: 80, suppressSizeToFit: true},
      ]
    }
  ];
  const linkAlarmCols = [
    {
      headerName: '처리시간',
      children: [{ headerName:'', field: 'event_exp_time', width: 120, suppressSizeToFit: true }]
    },
    {
      headerName: 'NODE1',
      children: [
        {headerName: 'TYPE', field: "node1_type", width: 80, suppressSizeToFit: true},
        {headerName: 'ID', field: "node1_id", width: 80, suppressSizeToFit: true},
        {headerName: 'NAME', field: "node1_exp_id", width: 80, suppressSizeToFit: true},
      ]
    },
    {
      headerName: 'NODE2',
      children: [
        {headerName: 'TYPE', field: "node1_type", width: 80, suppressSizeToFit: true},
        {headerName: 'ID', field: "node1_id", width: 80, suppressSizeToFit: true},
        {headerName: 'NAME', field: "node1_exp_id", width: 80, suppressSizeToFit: true},
      ]
    },
    {
      headerName: 'CALL TYPE',
      children: [
        {headerName: '', field: "call_type", width: 80, suppressSizeToFit: true},
      ]
    },
    {
      headerName: '알람정보',
      children: [
        {headerName: '내역', field: "alarm_desc", width: 80, suppressSizeToFit: true},
        {headerName: '값', field: "alarm_value", width: 80, suppressSizeToFit: true},
        {headerName: '연속', field: "continue_cnt", width: 80, suppressSizeToFit: true},
      ]
    }
  ];
  const [nodeAlarmList, setNodeALarmList] = useState([]);
  const [linkALarmList, setLinkALarmList] = useState([]);

  // const [lastStatusTime, setLastStatusTime] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [monitorParam, setMonitorParam] = useState({});
  const [monitorTime, setMonitorTime] = useState('');

  const getMonitorTime = () => {
    const param = {};
    getLastStatusTime(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          // setSelectedFromToDate({ startDate: fnStrToDate(ret.rs), endDate: addMinutes(fnStrToDate(ret.rs), 1) , searchTarget: 'kpiAnalysisFromToTime' });
          setMonitorTime(ret.rs);
        }
      }
    });
  };

  useEffect(() => {
    getMonitorTime();
    // setNode1List([...mmeList]);
    getMmeTreeList({}).then((response) => { console.log('getMmeTreeList', setMmeTreeList(response.data.rs)); });
    getEnbTreeList({}).then((response) => { console.log('getEnbTreeList', setEnbTreeList(response.data.rs)); });
    setNodeALarmList([
      { event_exp_time: '2021-09-01 10:00:00', node1_type: 'MME', node1_id: '1', node1_exp_id: 'MME1', call_type: 'CALL', alarm_desc: 'CPU', alarm_value: '90%', continue_cnt: '3' },
    ]);
    setLinkALarmList([
      { event_exp_time: '2021-09-01 10:00:00', node1_type: 'MME', node1_id: '1', node1_exp_id: 'MME1', node2_type: 'ENB', node2_id: '1', node2_exp_id: 'ENB1', call_type: 'CALL', alarm_desc: 'CPU', alarm_value: '90%', continue_cnt: '3' },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <TreeEquipType data={ mmeTreeList } alarmList={ mmeAlarmList } openPopupStatus={ openPopupStatus }/>
          </Box>
          {/* TREE2 */}
          <Box height={'calc(50% - 31px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={1} sx={{ border: '0.5px solid #9fa2a7' }} >
            <TreeEquipType data={ enbTreeList } alarmList={ enbAlarmList } openPopupStatus={ openPopupStatus }/>
          </Box>
        </Grid>
        <Grid item sx={{ width: 'calc(100% - 310px)'}}>
          {/* <KpiAnalysis /> */}
          <Box height={'calc(70% - 4px)'} width={'100%'} gap={4} marginTop={1} marginRight={1} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
            <Stack spacing={0} padding={0} sx={{ width:'100%', height: '30px' }}>
              <TypoMarkLableNoLine label={'KPI ANALYSIS'} style={{ width: '100%' }}/>
            </Stack>
            <Box height={'calc(100% - 30px)'} width={'100%'} gap={4} m={0} p={0} >
              <KpiAnalysis monitorParam={ monitorParam }/>
            </Box>
          </Box>
          <Box height={'calc(30% - 4px)'} width={'100%'} gap={4} marginTop={0.5} marginRight={1} marginBottom={1} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
            <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
              <Stack spacing={0.5} p={0.5} sx={{ width:'100%' }}>
                <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                  <TypoMarkLableNoLine label={'NODE ALARM'} style={{ width: '100%' }}/>
                </Stack>
                <GridMain
                  className={'ag-theme-balham'}
                  style={{ height: '100%', width: '100%' }}
                  columnDefs={ nodeAlarmCols }
                  rowData={ nodeAlarmList }
                  rowSelection={ 'multiple' }
                  getSelectedData={ null }
                />
              </Stack>
              <Stack spacing={0.5} p={0.5} sx={{ width:'100%' }}>
                <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                  <TypoMarkLableNoLine label={'LINK ALARM'} style={{ width: '100%' }}/>
                </Stack>
                <GridMain
                  className={'ag-theme-balham'}
                  style={{ height: '100%', width: '100%' }}
                  columnDefs={ linkAlarmCols }
                  rowData={ linkALarmList }
                  rowSelection={ 'multiple' }
                  getSelectedData={ null }
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <PopupEquipStatus title={'Equip Status'} params={{}} style={{ width: '100%', height: 1000 }} isOpen={ isOpenPopupStatus } setIsOpen={ setIsOpenPopupStatus }/>
    </Fragment>
  );
};

export default NetworkMonitoring;