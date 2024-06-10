import { Box, Button, Grid, OutlinedInput, Stack } from "@mui/material";
import { getPacketFile, getSignalCallLogXdr } from "api/nw/searchApi";
import { AutoCompleteCheck } from "components/autocomplete";
import { DatePickerFromTo } from "components/datepicker";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import SelectBox from "components/select/SelectBox";
import { callTypeList, periodList } from "data/common";
import { add, addMinutes, differenceInMinutes } from "date-fns";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { fileDownload, fnStrToDate, formatDate } from "utils/common";
import { callLogCols } from "./data/callLogData";
import useMessage from "hooks/useMessage";


const CallFailSearch = ({ params }) => {

  const [imsi, setImsi] = useState('');
  const { alert } = useMessage();

  // date-picker
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
  // period
  const [period, setPeriod] = useState('1M');

  const colDefs = useMemo(() => callLogCols, []);
  const [callLogMainData, setCallLogMainData] = useState([]);


  // Call Type
  const [ selectedCallTypes, setSelectedCallTypes ] = useState([...callTypeList]);
  const onChangeCallTypeList = (selected) => {
    setSelectedCallTypes(selected);
  };

  const initGridMain = () => {
    setCallLogMainData([]);
  };

  const searchClick = () => {
    const param = {};
    param.isValid = true;
    param.nonValidMsg = '';

    param.searchType = params.searchType !== undefined ? params.searchType : 'CALL_FAIL';

    param.timeCond = period;
    param.startTime = formatDate(selectedFromToDate.startDate, 'yyyyMMddHHmm00');
    param.endTime = formatDate(selectedFromToDate.endDate, 'yyyyMMddHHmm00');
    if (param.timeCond === '1M' && param.startTime === param.endTime) {
      param.isValid = false;
      param.nonValidMsg = '시작 시간과 종료 시간을 다르게 설정하세요.\n';
    }
    if (param.startTime === param.endTime) {
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

    param.callTypeList = [];
    selectedCallTypes.forEach((item) => {
      param.callTypeList.push(item.code);
    });
    if (param.callTypeList.length === 0) {
      param.isValid = false;
      param.nonValidMsg = param.nonValidMsg + 'CALL TYPE을 1건 이상 선택하세요.\n';
    }

    param.imsi = imsi;
    if (imsi.trim() === '') {
      param.isValid = false;
      param.nonValidMsg = param.nonValidMsg + 'imis / mdn을 입력 해 주시기 바랍니다.\n';
    }

    if (param.isValid === false) {
      alert(param.nonValidMsg);
      return;
    }

    initGridMain();
    getSignalCallLogXdr(param).then((response) => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          if (ret.result === 1) {
            if (ret.rs?.list?.length === 0) {
              alert('조회 결과가 없습니다.');
              return;
            }
            setCallLogMainData(ret.rs);
          }
        }
      }
    });

  };
  const excelDownload = () => {};

  const gridMainDblClick = (e) => {
    const param = {
      imsi: e.data.imsi,
      startTime: e.data.event_time,
    };
    getPacketFile(param).then((response) => response.data).then((ret) => {
      if (ret !== undefined) {
        if (ret.rs !== undefined) {
          if (ret.result === 1) {
            fileDownload(ret.rs.target_file, ret.rs.file_name, ret.rs.file_ext, 'Y', true, alert);
          }
        }
      }
    });
  };

  const [searchTrigger, setSearchTrigger] = useState(false);
  useEffect(() => {
    if (params?.startTime !== undefined && params?.startTime !== null && params?.startTime !== '') {
      setSelectedFromToDate({ ...selectedFromToDate, startDate: fnStrToDate(params.startTime), endDate: addMinutes(fnStrToDate(params.startTime), 1) });
    }
    setImsi(params.imsi);
    setSearchTrigger(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchTrigger) searchClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTrigger]);

  return (
    <Fragment>
      <Grid item sx={{ width: '100%' }}>
        <Box height={'100%'} width={'100%'} gap={4} marginTop={0.5} marginRight={0.5} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
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
                <Button variant="contained" color="primary" onClick={ searchClick }>Search</Button>
                <Button variant="contained" color="secondary" onClick={ excelDownload }>Excel</Button>
              </Stack>
            </Stack>
            {/* ROW2 */}
            <Stack direction={'row'} spacing={1.5}  sx={{ height: '26px' }}>
              <Stack direction={'row'} spacing={0.2}>
                <TypoLabel label={'IMSI / MDN'} />
                <OutlinedInput value={ imsi } onChange={(e) => {}} sx={{ width: 388, borderRadius: 0 }} />
              </Stack>
              <Stack direction={'row'} spacing={0.2}>
                <TypoLabel label={'CALL TYPE'} />
                <AutoCompleteCheck data={ JSON.parse(JSON.stringify(callTypeList)) } selectedList={ selectedCallTypes } onChange={ onChangeCallTypeList } width={ 388 } />
              </Stack>
            </Stack>
          </Stack>
          {/* GRID KPI - CAUSE */}
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
            <GridMain
              className={'ag-theme-balham'}
              style={{ height: '650px' }}
              rowData={ callLogMainData }
              columnDefs={ colDefs }
              onCellDoubleClicked={ gridMainDblClick }
            />
          </Stack>
        </Box>
      </Grid>
    </Fragment>
  );
}

export default CallFailSearch;