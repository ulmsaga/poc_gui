import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import { List, styled } from '@mui/material';

const StyledAutoComplete = styled(Autocomplete)(({ theme, width }) => ({
  width: width,
  fontSize: 12,
  borderRadius: 0,
  minWidth: width,
  padding: 0,
  margin: 0
}));

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxOutlined fontSize="small" />;

const CustLi = styled(List)({
  fontSize: '12px',
  height: 24,
  verticalAlign: 'middle'
});

const AutoCompleteCheck = ({ data, selectedList, onChange, width }) => {
  const tmp = {
    width: width
  };
  const onChangeHandler = (e, newSelectedList) => {
    onChange(newSelectedList);
  };
  return (
    <StyledAutoComplete
      {...tmp}
      id="autoCompleteCheck"
      size='small'
      multiple
      limitTags={ 1 }
      options={ data }
      value={ selectedList }
      disableCloseOnSelect
      onChange={ onChangeHandler}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, newValue) => {
        return option.value === newValue.value;
      }}
      renderOption={(props, option, { selected }) => (
        /* Autocomplete Warning */
        /* Warning: Failed prop type: Invalid prop `key` supplied to `ForwardRef(ListItem)`. */
        <CustLi key={ props.key } {...props} style={{ padding: '0px' }}>
          { console.log('props.key', props.key) }
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </CustLi>
      )}
      renderInput={(params) => <TextField 
        {...params}
        sx={{
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            padding: 0,
          },
          "& .MuiOutlinedInput-root": {
            height: 26,
            paddingTop: '-5px',
            borderRadius: 0
          },
          "& .MuiAutocomplete-inputRoot":{
            padding: 0,
          },
          padding: 0
        }}
      />}
    />
  );
}

export default AutoCompleteCheck;
