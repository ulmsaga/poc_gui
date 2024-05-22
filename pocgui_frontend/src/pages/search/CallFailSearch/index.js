import { Box, Button, Grid, Stack } from "@mui/material";
import { AutoCompleteCheck } from "components/autocomplete";
import { DatePickerFromTo } from "components/datepicker";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import SelectBox from "components/select/SelectBox";
import { callTypeList, periodList } from "data/common";
import { add } from "date-fns";
import React, { Fragment, useEffect, useState } from "react";

const CallFailSearch = ({ params }) => {

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

  // grid
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

  // Call Type
  const [ selectedCallTypes, setSelectedCallTypes ] = useState([...callTypeList]);
  const onChangeCallTypeList = (selected) => {
    setSelectedCallTypes(selected);
  };

  const searchClick = () => {};
  const excelDownload = () => {};

  useEffect(() => {
    // setNode1List([...mmeList]);
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
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle', height: '100%' }}>
            <GridMain
              className={'ag-theme-balham'}
              style={{ height: '650px' }}
              rowData={rowData}
              columnDefs={colDefs}
            />
          </Stack>
        </Box>
      </Grid>
    </Fragment>
  );
}

export default CallFailSearch;