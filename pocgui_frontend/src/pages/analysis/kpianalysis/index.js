import { FileDownloadOutlined, SearchOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { getKpiAnalysis, getKpiAnalysisEquipCauseCnt } from "api/nw/analysisApi";
import { AutoCompleteCheck, AutoCompleteGroup } from "components/autocomplete";
import { ButtonIconHelp } from "components/button";
import { DatePickerFromTo } from "components/datepicker";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import SelectBox from "components/select/SelectBox";
import { callTypeList, nodeTypeList, periodList } from "data/common";
import { add, addMinutes, differenceInMinutes } from "date-fns";
import useMessage from "hooks/useMessage";
import { forEach, split } from "lodash";
import PopupCallFailSearch from "pages/monitoring/networkmonitoring/popup/PopupCallFailSearch.js";
import PopupEquipSearch from "popup/PopupEquipSearch";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { formatDate } from "utils/common";

const KpiAnalysis = () => {

  const { alert, confirm } = useMessage();

  // Period
  const [period, setPeriod] = useState('1M');

  // From Date, To Date
  const [selectedFromToDate, setSelectedFromToDate] = useState({
    startDate: addMinutes(new Date(), -1),
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

  // Node1 Type, Node2 Type
  // eslint-disable-next-line no-unused-vars
  const [mmeList, setMmeList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [enbList, setEnbList] = useState([]);

  const [searchTarget1, setSearchTarget1] = useState({ value : 'MME', label: 'MME', node: 'MME' });
  const [searchTarget2, setSearchTarget2] = useState({ value: '-', label: '-', node: '-' });
  const [node2TypeList, setNode2TypeList] = useState([{ value: '-', label: '-', node: '-' }]);

  const [selectedNode1, setSelectedNode1] = useState([]);
  const [selectedNode2, setSelectedNode2] = useState([]);
  const [node1List, setNode1List] = useState([]);
  const [node2List, setNode2List] = useState([]);

  const [kpiAnalysisData, setKpiAnalysisData] = useState([]);

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

  

  // Call Fail Search
  const [isOpenCallFailSearch, setIsOpenCallFailSearch] = useState(false);
  // Popup Status
  // eslint-disable-next-line no-unused-vars
  const [isOpenPopupStatus, setIsOpenPopupStatus] = useState(false);
  // const [popupStatusParam, setPopupStatusParam] = useState({});
  // Equip Search
  const [isOpenEquipSearch, setIsOpenEquipSearch] = useState(false);
  const [equipSearchParam, setEquipSearchparam] = useState({});

  // eslint-disable-next-line no-unused-vars
  const openPopupStatus = (params) => {
    alert(params.name);
    setIsOpenPopupStatus(true);
  };

  const callBackEquipSearch = (ret) => {
    setSelectedNode1(ret);
  };

  // Grid
  const defaultCols = useMemo(() => [
    {
      headerName: '',
      children: [{ headerName:'처리시간', field: 'EVENT_EXP_TIME', width: 150, suppressSizeToFit: true, cellStyle: { textAlign: 'center' } }]
    },
    {
      headerName: '대상',
      children: [
        {headerName: '장비1', field: "NODE1_EXP_ID", width: 90, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
        {headerName: '장비2', field: "NODE2_EXP_ID", width: 90, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
      ]
    },
    {
      headerName: '',
      children: [
        {headerName: 'CALL TYPE', field: "CALL_TYPE", width: 100, suppressSizeToFit: true, cellStyle: { textAlign: 'center' }},
      ]
    },
    {
      headerName: '접속',
      children: [
        {headerName: '시도호', field: 'ATTEMPT_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '성공호', field: 'SUCCESS_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '성공율(%)', field: 'SUCCESS_RATE', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }}
      ]
    },
    {
      headerName: 'DATA',
      children: [
        {headerName: '시도호', field: 'DATA_ATTEMPT_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '성공호', field: 'DATA_SUCCESS_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '성공율(%)', field: 'DATA_SUCCESS_RATE', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }}
      ]
    },
    {
      headerName: 'IMS',
      children: [
        {headerName: '시도호', field: 'IMS_ATTEMPT_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '성공호', field: 'IMS_SUCCESS_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: '성공율(%)', field: 'IMS_SUCCESS_RATE', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }}
      ]
    },
    {
      headerName: 'CD',
      children: [
        {headerName: 'CD호', field: 'DROP_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
        {headerName: 'CD율(%)', field: 'DROP_RATE', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }},
      ]
    },
    {
      headerName: '',
      children: [
        {headerName: 'DETACH', field: 'DETACH_CNT', minWidth: 80, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' }}
      ]
    }
  ], []);

  const [analysisCols, setAnalysisCols] = useState([...defaultCols]);

  const rootCauseAddedCols = (causeList) => {
    const cols = [...defaultCols];

    let grps = {};
    let preGrp = '';
    const listLen = causeList.length;
    causeList.forEach((item, index) => {
      if (item?.description !== undefined && item?.description.includes('|')) {
        const grp = split(item.description, '|')[0];
        const title = split(item.description, '|')[1];

        if (preGrp !== grp) {
          if (index !== 0) {
            cols.push(grps);
          }
          grps = {};
          grps = { headerName: grp, children: [{ headerName: title, field: item.cause, minWidth: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } }] };
        } else {
          grps.children.push({ headerName: title, field: item.cause, minWidth: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } });
        }

        if (index === (listLen - 1)) {
          cols.push(grps);
        }

        preGrp = grp;
      } else {
        cols.push({ headerName: item.cause, field: item.cause, width: 100, suppressSizeToFit: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } });
      }
    });
    setAnalysisCols(cols);
  };

  const equipImsi = useMemo(() => [
    { headerName:'가입자', field: 'std_name', width: 180, suppressSizeToFit: true},
    { headerName:'건수', field: 'cause_cnt', width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } }
  ], []);
  const equipEnb = useMemo(() => [
    { headerName:'ENB', field: 'std_name', width: 180, suppressSizeToFit: true },
    { headerName:'건수', field: 'cause_cnt', width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } }
  ], []);
  const equipMme = useMemo(() => [
    { headerName:'MME', field: 'std_name', width: 180, suppressSizeToFit: true },
    { headerName:'건수', field: 'cause_cnt', width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } }
  ], []);
  const equipSgw = useMemo(() => [
    { headerName:'SGW', field: 'std_name', width: 180, suppressSizeToFit: true },
    { headerName:'건수', field: 'cause_cnt', width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } }
  ], []);
  const equipPgw = useMemo(() => [
    { headerName:'PGW', field: 'std_name', width: 180, suppressSizeToFit: true },
    { headerName:'건수', field: 'cause_cnt', width: 100, suppressAutoSize: true, valueFormatter: '(value * 1).toLocaleString()', cellStyle: { textAlign: 'right' } }
  ], []);
  

  // const [rowData, setRowData] = useState([]);
  const [imsi, setImsi] = useState([]);
  const [enb, setEnb] = useState([]);
  const [mme, setMme] = useState([]);
  const [sgw, setSgw] = useState([]);
  const [pgw, setPgw] = useState([]);
  
  const excelDownload = () => {
    // Alert({ title: 'Excel Download', message: 'Excel Download', callback: (e) => { console.log(e); } });
    // confirm({ title: 'Excel Download', message: 'Excel Download', callback: callback });
    confirm('Excel Download', callback);
  };
  const callback = (ret) => {
    alert(ret);
  };

  const searchClick = () => {
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
      const diffMin = differenceInMinutes(selectedFromToDate.endDate, selectedFromToDate.startDate);
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
      param.nonValidMsg = param.nonValidMsg + '대상장비1에 대해서 1건 이상 선택하세요.\n';
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

    initGridMain();
    getKpiAnalysis(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          // setRowData(ret.rs);
          // console.log(ret.rs);
          rootCauseAddedCols(ret.rs.causeList);
          setKpiAnalysisData([...ret.rs.list]);
        }
      }
    });
  };

  const gridKpiCellDbClick = (rowData) => {
    const param = {};

    param.startTime = rowData.data.EVENT_TIME;
    if (rowData.data.NODE2_TYPE === '' || rowData.data.NODE2_TYPE === '-' || rowData.data.node2_type === null) {
      param.graphType = 'NODE'
    } else {
      param.graphType = 'LINK'
    }
    param.node1Type = rowData.data.NODE1_TYPE;
    param.node1Id = rowData.data.NODE1_ID;
    param.node2Type = rowData.data.NODE2_TYPE;

    if (param.graphType === 'LINK') {
      param.node2Id = rowData.data.NODE2_ID
    }
    param.callType = rowData.data.CALL_TYPE;
    // selectedVal
    // failType
    let tmp = rowData.colDef.field
    param.failType = tmp.substr(0, tmp.length - 11)
    param.selectedVal = tmp.replace(param.failType + '_', '');

    initGridEquips();
    getKpiAnalysisEquipCauseCnt(param).then(response => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          const data = ret.rs
          if (data?.imsi !== null && data?.imsi !== undefined) setImsi(data.imsi);
          if (data?.enb != null && data?.enb !== undefined) setEnb(data.enb);
          if (data?.mme != null && data?.mme !== undefined) setMme(data.mme);
          if (data?.sgw != null && data?.sgw !== undefined) setSgw(data.sgw);
          if (data?.pgw != null && data?.pgw !== undefined) setPgw(data.pgw);
        }
      }
    });
    
  };

  const initGridMain = () => {
    setKpiAnalysisData([]);
  };

  const initGridEquips = () => {
    setImsi([]);
    setEnb([]);
    setMme([]);
    setSgw([]);
    setPgw([]);
  };

  useEffect(() => {
    setNode1List([...mmeList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {/* CONDS */}
      <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle' }}>
        <Stack direction={'row'} spacing={0} sx={{ justifyContent: 'space-between', height: '26px' }}>
          {/* ROW1 CONDS */}
          <Stack direction={'row'} spacing={1.5}>
            <Stack direction={'row'} spacing={0.2} sx={{ verticalAlign: 'middle' }}>
              <TypoLabel label={'조회기간'} />
              <SelectBox options={ periodList } value={ period } onChange={(e) => { setPeriod(e.target.value) }}/>
              <DatePickerFromTo selectedDate={ selectedFromToDate } isRange={ true } format={ 'yyyy-MM-dd HH:mm:00' } timeIntervals={1} showTimeSelect={ true } onChangeDate={ changeFromToDate } useMaxDate={ false }/>
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
            <TypoLabel label={'대상장비1'} />
            <SelectBox options={ nodeTypeList } value={ searchTarget1.value } onChange={ node1TypeChange }/>
            <AutoCompleteGroup data={ node1List } selectedList={ selectedNode1 } onChange={ onChangeNode1 } width={ 287 } groupFilter={'group_filter'} />
            <ButtonIconHelp iconType="search" onClick={ (e) => { searchNodeTypeClick(e, 'node1') }} />
          </Stack>
          <Stack direction={'row'} spacing={0.2}>
            <TypoLabel label={'대상장비2'} />
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
          columnDefs={analysisCols}
          rowData={kpiAnalysisData}
          // getSelectedData={ getSelectedKpiAnalysisData }
          onCellDoubleClicked={ gridKpiCellDbClick }
        />
      </Stack>
      {/* GRID PATH */}
      <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: 'calc(40% - 92px)' }}>
        <GridMain
          className={'ag-theme-balham'}
          style={{ height: '100%', width: '100%' }}
          rowData={ imsi }
          columnDefs={equipImsi}
        />
        <GridMain
          className={'ag-theme-balham'}
          style={{ height: '100%', width: '100%' }}
          rowData={ enb }
          columnDefs={equipEnb}
        />
        <GridMain
          className={'ag-theme-balham'}
          style={{ height: '100%', width: '100%' }}
          rowData={ mme }
          columnDefs={equipMme}
        />
        <GridMain
          className={'ag-theme-balham'}
          style={{ height: '100%', width: '100%' }}
          rowData={ sgw }
          columnDefs={equipSgw}
        />
        <GridMain
          className={'ag-theme-balham'}
          style={{ height: '100%', width: '100%' }}
          rowData={ pgw }
          columnDefs={equipPgw}
        />
      </Stack>
      <PopupCallFailSearch title={'Call Fail Search'} params={{}} style={{ width: '100%', height: 1000 }} isOpen={ isOpenCallFailSearch } setIsOpen={ setIsOpenCallFailSearch }/>
      <PopupEquipSearch title={'Equip Search'} params={ equipSearchParam } popupCallBack={ callBackEquipSearch } style={{ width: '100%', height: 1000 }} isOpen={ isOpenEquipSearch } setIsOpen={ setIsOpenEquipSearch }/>
    </Fragment>
  )
};

export default KpiAnalysis;