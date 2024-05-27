import { FormControl, MenuItem, Select, styled } from "@mui/material";
import React from "react";

const SelectBoxStyled = styled(Select)(({ theme, variant }) => ({}));

const SelectBox = ({ options, value, onChange, style }) => {
  return (
    <FormControl sx={{ verticalAlign: 'middle', minWidth: 100, minHeight: 26 }} >
      <SelectBoxStyled
        id="selectBox"
        value={ value }
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={ onChange }
        sx={{ borderRadius: '0px', minHeight: 26, ...style}}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <span style={{ fontSize: '12px' }}>{option.label}</span>
          </MenuItem>
        ))}
      </SelectBoxStyled>
    </FormControl>
  );
}

export default SelectBox;