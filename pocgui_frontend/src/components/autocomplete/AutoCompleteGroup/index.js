import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { Autocomplete, Checkbox, List, TextField, styled } from "@mui/material";
import React from "react";

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

const AutoCompleteGroup = ({ data, selectedList, onChange, width, groupFilter }) => {
  const tmp = {
    width: width
  };

  const options = data.map((option) => {
    const firstLetter = option[groupFilter];
    return {
      firstLetter: firstLetter,
      ...option,
    };
  });

  const onChangeHandler = (e, newSelectedList) => {
    onChange(newSelectedList);
  };

  return (
    <StyledAutoComplete
      {...tmp}
      id="autoCompleteGroup"
      size="small"
      multiple
      limitTags={ 1 }
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      value={ selectedList }
      disableCloseOnSelect
      onChange={ onChangeHandler}
      groupBy={(option) => option.firstLetter}
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
          "& .MuiOutlinedInput-root": {
            height: 26,
            paddingTop: '-5px',
            borderRadius: 0
          },
          "& .MuiAutocomplete-inputRoot":{
            padding: 0,
          },
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            padding: 0,
          },
          padding: 0
        }}
      />}
    />
  );
}

export default AutoCompleteGroup;
