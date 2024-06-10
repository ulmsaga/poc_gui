import { Box, Grid, OutlinedInput, Stack } from "@mui/material";
import { getEnbList, getMmeList } from "api/nw/configApi";
import { ButtonStd } from "components/button";
import ButtonIconArrow from "components/button/ButtonIconArrow";
import GridMain from "components/grid/GridMain";
import { TypoLabel } from "components/label";
import TypoMarkLableNoLine from "components/label/TypoMarkLableNoLine";
import SelectBox from "components/select/SelectBox";

import React, { useEffect, useMemo, useState } from "react";

const EquipSearch = ({ params, contentCallBack, selectedNode }) => {

  // condType
  const [condTypeList, setCondTypeList] = useState([ { value:'', label:'' }]);
  const [condType, setCondType] = useState({ value:'', label:'' });
  const [condTypeText, setCondTypeText] = useState('');

  // grid
  const [targetCols, setTargetCols] = useState([]);
  const [targetRows, setTargetRows] = useState([]);

  const destCols = useMemo(() => [
    { field: 'check', headerName: '선택', width: 50, suppressSizeToFit: true, checkboxSelection: true, showDisabledCheckbox: true , pinned: 'left' },
    { field: 'description', headerName: '대상', width: 350, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
    { field: 'value', headerName: 'value', width: 100, suppressSizeToFit: true, hide: true },
    { field: 'label', headerName: 'label', width: 100, suppressSizeToFit: true, hide: true }
  ], []);
  const [destRows, setDestRows] = useState([]);

  const [selectedTargetRows, setSelectedTargetRows] = useState([]);
  const [selectedDestRows, setSelectedDestRows] = useState([]);

  const defSearchedTargetCols = (nodeType) => {
    let cols = [];
    // let defaultColField = '';
    if (nodeType === undefined || nodeType === null || nodeType === '') nodeType = 'ENB';
    if (nodeType === 'MME') {
      cols = [
        { field: 'check', headerName: '선택', width: 50, suppressSizeToFit: true, checkboxSelection: true, showDisabledCheckbox: true , pinned: 'left' },
        { field: 'mtso_name', headerName: '국사', width: 100, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
        { field: 'node_exp_id', headerName: 'MME ID', width: 100, suppressSizeToFit: true, cellStyle: {textAlign: 'center'}},
        { field: "node_name", headerName: "MME NMAE", width: 150, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
        { field: "description", headerName: "DESC", width: 150, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
        { field: 'value', headerName: 'value', width: 100, suppressSizeToFit: true, hide: true },
        { field: 'label', headerName: 'label', width: 100, suppressSizeToFit: true, hide: true }
      ];
      // defaultColField = 'node_name';
    } else if (nodeType === 'ENB') {
      cols = [
        { field: 'check', headerName: '선택', width: 50, suppressSizeToFit: true, checkboxSelection: true, showDisabledCheckbox: true , pinned: 'left' },
        { field: 'opteam_name', headerName: '팀', width: 100, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
        { field: 'part_name', headerName: '파트', width: 100, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
        { field: 'enb_id', headerName: 'ENB ID', width: 100, suppressSizeToFit: true, cellStyle: {textAlign: 'cneter'} },
        { field: 'bts_name', headerName: 'ENB NAME', width: 250, suppressSizeToFit: true, cellStyle: {textAlign: 'left'} },
        { field: 'value', headerName: 'value', width: 100, suppressSizeToFit: true, hide: true },
        { field: 'label', headerName: 'label', width: 100, suppressSizeToFit: true, hide: true }
      ];
      // defaultColField = 'enb_name';
    }
    setTargetCols(cols);
    defCondTypeList(cols);
  };

  const defCondTypeList = (cols) => {
    const list = [];
    // let needSetDefault = false;
    cols.forEach((col) => {
      if (!col.hide && col.field !== 'check') {
        list.push({ value: col.field, label: col.headerName });
      }
    });
    setCondTypeList([...list]);
  };

  const setDefaultCondType = () => {
    if (params.nodeType === 'MME') setCondType({value:'node_name', label:'MME NAME'});
    if (params.nodeType === 'ENB') setCondType({value:'bts_name', label:'ENB NAME'});
  };

  const condTypeChange = (e) => {
    setCondType(e.target);  
  };

  const searchClick = () => {
    const param = {
      searchType: condType.value,
      searchText: condTypeText
    };
    
    if (params.nodeType === 'MME') {
      getMmeList(param)
      .then(response => response.data)
      .then((ret) => {
        if (ret !== undefined) {
          if (ret.rs !== undefined) {
            setTargetRows(ret.rs);
          }
        }
      })
    } else if (params.nodeType === 'ENB') {
      getEnbList(param)
      .then(response => response.data)
      .then((ret) => {
        if (ret !== undefined) {
          if (ret.rs !== undefined) {
            setTargetRows(ret.rs);
          }
        }
      })
    }
  };

  const getSelectedTargetData = (data) => {
    setSelectedTargetRows(data);
  };
  const getSelectedDestData = (data) => {
    setSelectedDestRows(data);
  };

  const addSelectedTarget = (e) => {
    const tmp = JSON.parse(JSON.stringify(selectedTargetRows));
    const tmpExcludeExist = [];
    tmp.forEach((e) => {
      const tmpValue = e.value;
      const existIndex = destRows.findIndex(i => i.value === tmpValue);
      if (existIndex === -1) {
        tmpExcludeExist.push(e);
      }
    });

    const uniqueConcat = [...destRows, ...tmpExcludeExist];
    setDestRows(uniqueConcat);
  };

  const removeSelectedTarget = (e) => {
    const delList = JSON.parse(JSON.stringify(selectedDestRows));
    delList.forEach((e) => {
      setDestRows((target) => target.filter(item => item.value !== e.value));
    });
  };

  useEffect(() => {
    defSearchedTargetCols(params?.nodeType);
    
    setTimeout(() => {
      setDefaultCondType();
    }, 500);
    setTargetRows([]);
    setDestRows([]);
    if (selectedNode !== undefined && selectedNode !== null) {
      setDestRows(selectedNode);
    }
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
                  <SelectBox options={ condTypeList } defaultValue={ condType.value } value={ condType.value } onChange={ condTypeChange } style={{ width: '120px' }}/>
                  <OutlinedInput placeholder="검색어를 입력하세요" value={ condTypeText } onChange={ (e) => setCondTypeText(e.target.value) } sx={{ width: 300 }} onKeyDown={ (e) => { if (e.key==="Enter") { searchClick() }} }/>
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
                  rowData={ targetRows }
                  columnDefs={ targetCols }
                  rowSelection={ 'multiple' }
                  getSelectedData={ getSelectedTargetData }
                />
              </Stack>
              <Stack direction={'column'} spacing={2} p={0.5} sx={{ verticalAlign: 'middle', paddingTop: '150px'}}>
                <ButtonIconArrow arrowDirection={ "Right" } onClick={ addSelectedTarget } />
                <ButtonIconArrow arrowDirection={ "Left" } onClick={ removeSelectedTarget }/>
              </Stack>
              <Stack direction={'column'} spacing={0.5} p={0.5} width={ '46%' } >
                <TypoMarkLableNoLine label={'선택 내역'} width={ 70 }/>
                <GridMain
                  className={'ag-theme-balham'}
                  style={{ height: '560px', width: '100%' }}
                  rowData={ destRows }
                  columnDefs={ destCols }
                  rowSelection={ 'multiple' }
                  getSelectedData={ getSelectedDestData }
                />
              </Stack>
            </Stack>
          {/* </Box> */}
        </Stack>
        <Stack spacing={0.5} p={0} sx={{ verticalAlign: 'middle' }}>
          <Stack direction={'row'} spacing={0.5} p={0.5} sx={{ justifyContent: 'right', verticalAlign: 'middle', height: '34px' }}>
            <ButtonStd label={'적용'} color='primary' iconType='confirm' onClick={ (e) => {contentCallBack( destRows, params )} } />
            <ButtonStd label={'닫기'} color={'secondary'} iconType='close' onClick={ (e) => {contentCallBack()} } />
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
};

export default EquipSearch;