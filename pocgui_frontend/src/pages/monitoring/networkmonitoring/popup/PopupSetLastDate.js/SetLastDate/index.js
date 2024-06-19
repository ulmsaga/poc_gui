import { Box, Button, Grid, Stack } from "@mui/material";
import { DatePickerSingle } from "components/datepicker";
import { TypoLabel } from "components/label";
import React, { Fragment, useState } from "react";
import { fnStrToDate } from "utils/common";


const SetLastDate = ({ params, callBackComp }) => {

  const [selectedDate, setSelectedDate] = useState(() => {
    new Date();
    if (params.monitorTime === undefined || params.monitorTime === null || params.monitorTime === '') {
      return new Date();
    } else {
      return fnStrToDate(params.monitorTime);      
    }
  });
  const changeFromToDate = (date) => {
    setSelectedDate(date);
  };
  

  return (
    <Fragment>
      <Grid item sx={{ width: '100%'}}>
        <Box height={'100%'} width={'100%'} gap={4} marginTop={0.5} marginRight={0.5} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
          <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle' }}>
            <Stack direction={'row'} spacing={0} sx={{ justifyContent: 'space-between', height: '26px' }}>
              {/* ROW1 CONDS */}
              <Stack direction={'row'} spacing={1.5}>
                <Stack direction={'row'} spacing={0.2} sx={{ verticalAlign: 'middle' }}>
                  <TypoLabel label={'조회시간'} />
                  {/* <DatePickerFromTo selectedDate={ selectedFromToDate } isRange={ true } format={ 'yyyy-MM-dd HH:mm:00' } showTimeSelect={ true } onChangeDate={ changeFromToDate } useMaxDate={ false }/> */}
                  <DatePickerSingle selectedDate={ selectedDate } format={ 'yyyy-MM-dd HH:mm:00' } showTimeSelect={ true } timeIntervals={ 1 } onChangeDate={ changeFromToDate } useMaxDate={ false }/>  
                </Stack>
              </Stack>
              {/* ROW1 BUTTONS */}
              <Stack direction={'row'} spacing={0.2} sx={{float: 'right'}}>
                <Button variant="contained" color="primary" onClick={ () => { callBackComp(selectedDate) } }>Search</Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Stack sx={{ height: 240 }}>
        </Stack>
      </Grid>
    </Fragment>
  );
}

export default SetLastDate;