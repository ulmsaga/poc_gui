import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import { Checkbox, List, TextField, styled } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const CustAutocomMuiti = styled(Autocomplete)({
  display: 'inline-flex',
  height: 30,
  padding: '0 0 0 0',
  margin: '0 0 0 0',
  verticalAlign: 'middle',
  border: '1px solid #6c7077',
  fontSize: '10px'
});

const CustLi = styled(List)({
  fontSize: '12px',
  height: 24,
  verticalAlign: 'middle'
});

const CustTextField = styled(TextField)({
  height: 30,
  padding: '0 0 0 0',
  margin: '0 0 0 0',
  border: 'none',
  verticalAlign: 'middle',
  fontSize: '10px',
  color: '#b3b4b7'
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" style={{ color:'#b3b4b7' }} />
const checkedIcon = <CheckBoxIcon fontSize="small" />

const AutoCompleteMulti = ({ data, selectedList, onChange, width }) => {
  
  const onChangeHandler = (e, newSelectedList) => {
    onChange(newSelectedList);
  };

  return (
    <CustAutocomMuiti
      multiple
      limitTags={ 1 }
      disableCloseOnSelect
      getOptionLabel={ (option) => option.label }
      options={ data }
      value={ selectedList }
      onChange={ onChangeHandler }
      size="small"
      isOptionEqualToValue={(option, newValue) => {
        return option.value === newValue.value;
      }}
      renderOption={(props, option, { selected }) => (
        <CustLi { ...props }>
          <Checkbox
            icon={ icon }
            checkedIcon={ checkedIcon }
            checked={ selected }
            style={{ marginRight: 8, fontSize: '12px', color: 'b3b4b7' }}
            size="small"
          />
          { option.label }
        </CustLi>
      )}
      renderInput={(params) => (
        <CustTextField { ...params } maxRows={1} placeholder={ (selectedList.length === 0) ? '미선택' : '' } /> 
      )}
      sx={{
        width: width, maxWidth: '100%',
        '& .MuiAutocomplete-inputRoot': {
          height: '30px',
          lineHeight: '30px',
          border: 'none',
          padding: '0 0 0 0',
          margin: '0 0 0 0',
          verticalAlign: 'middle',
          fontSize: '10px',
          color: '#b3b4b7'
        },
        '& .MuiAutocomplete-inputRoot:hover': {
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: '#2684ff',
          borderRadius: '0',
          marginTop: '-1px',
          marginLeft: '-1px',
          width: 'calc(100% + 2px)'
        },
        '& .MuiAutocomplete-hasPopupIcon' : {
          border: '0'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
          borderStyle: 'none',
          borderWidth: '0px',
        },
        '& .MuiAutocomplete-endAdornment': {
          /* height: '29px', */
          marginTop: '-2px'
        },
        '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium': { color: '#b3b4b7' },
        '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall': { color: '#b3b4b7', fontSize: '16px' },
        '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
          paddingLeft: '0px'
        },
        '& .MuiAutocomplete-tag': {
          marginTop: '-6px',
          marginBottom: '0px',
          marginRight: '0px',
          padding: '0px',
          fontSize: '11px',
          color: '#b3b4b7',
          zIndex: '1'
        },
        '& .MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium:hover': { color: '#5b626d' }
      }}
    />
  );
};

export default AutoCompleteMulti;