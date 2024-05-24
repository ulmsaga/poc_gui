import { Box, Grid, Input, Stack } from "@mui/material";
import { ButtonStd } from "components/button";
import ButtonIconArrow from "components/button/ButtonIconArrow";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import TypoMarkLableNoLine from "components/label/TypoMarkLableNoLine";
// import SelectBox from "components/select/SelectBox";
// import { periodList } from "data/common";

import React, { useEffect, useState } from "react";

const EquipSearch = ({ params, contentCallBack }) => {

 
  // period
  // const [period, setPeriod] = useState('1M');

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

  const searchClick = () => {};

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
    <Grid item sx={{ width: '100%' }}>
      <Box height={'100%'} width={'100%'} gap={4} marginTop={0.5} marginRight={0.5} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5}  sx={{ border: '0.5px solid #9fa2a7' }} >
        <Stack spacing={0.5} p={0.5} sx={{ verticalAlign: 'middle' }}>
          <Box gap={4} marginTop={0.5} marginRight={0.5} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5} sx={{ border: '0.5px solid #9fa2a7' }}>
            <Stack spacing={0.5} p={0.5} direction={'row'} sx={{ justifyContent: 'space-between', height: '34px' }}>
              {/* ROW1 CONDS */}
              <Stack direction={'row'} spacing={1.5}>
                <Stack direction={'row'} spacing={0.2} sx={{ verticalAlign: 'middle' }}>
                  <TypoLabel label={'검색조건'} />
                  {/* <SelectBox options={ periodList } value={ period } onChange={(e) => { setPeriod(e.target.value) }}/> */}
                  <Input placeholder="검색어를 입력하세요" />
                </Stack>
              </Stack>
              {/* ROW1 BUTTONS */}
              <Stack direction={'row'} spacing={0.2} sx={{float: 'right'}}>
                {/* <Button variant="contained" color='primary' sx={{ fontSize: 13 }} startIcon={<SearchOutlined fontSize="small" />} onClick={ (e) => {contentCallBack()} }>조회</Button> */}
                <ButtonStd label={'조회'} iconType='search' onClick={searchClick} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
        {/* GRID KPI - CAUSE */}
        <Stack spacing={0.5} p={0} sx={{ verticalAlign: 'middle' }}>
          {/* <Box gap={4} marginTop={0.5} marginRight={0.5} marginBottom={0.5} marginLeft={1} paddingTop={0.5} paddingRight={0.5} paddingBottom={0.5} paddingLeft={0.5} sx={{ border: '0.5px solid #9fa2a7' }}> */}
            <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ justifyContent: 'space-between', verticalAlign: 'middle', height: '100%' }}>
              <Stack direction={'column'} spacing={0.5} p={0.5} width={ '46%' } >
                <TypoMarkLableNoLine label={'조회 내역'} width={ 70 }/>
                <GridMain
                  className={'ag-theme-balham'}
                  style={{ height: '560px', width: '100%' }}
                  rowData={rowData}
                  columnDefs={colDefs}
                />
              </Stack>
              <Stack direction={'column'} spacing={2} p={0.5} sx={{ verticalAlign: 'middle', paddingTop: '150px'}}>
                <ButtonIconArrow arrowDirection={ "Right" } onClick={ (e) => {} } />
                <ButtonIconArrow arrowDirection={ "Left" } onClick={ (e) => {} }/>
              </Stack>
              <Stack direction={'column'} spacing={0.5} p={0.5} width={ '46%' } >
                <TypoMarkLableNoLine label={'선택 내역'} width={ 70 }/>
                <GridMain
                  className={'ag-theme-balham'}
                  style={{ height: '560px', width: '100%' }}
                  rowData={rowData}
                  columnDefs={colDefs}
                />
              </Stack>
            </Stack>
          {/* </Box> */}
        </Stack>
        <Stack spacing={0.5} p={0} sx={{ verticalAlign: 'middle' }}>
          <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ justifyContent: 'right', verticalAlign: 'middle', height: '34px' }}>
            <ButtonStd label={'적용'} color='primary' iconType='confirm' onClick={ (e) => {contentCallBack()} } />
            <ButtonStd label={'닫기'} color={'secondary'} iconType='close' onClick={ (e) => {contentCallBack()} } />
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
};

export default EquipSearch;