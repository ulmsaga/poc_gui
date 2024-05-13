import { Autocomplete, TextField, styled } from "@mui/material";
import React from "react";

const StyledAutoComplete = styled(Autocomplete)`
  font-size: 12px;
  boarder-radius: 0px;
  min-Width: 100px;
  width: 300px;
  padding: 0px;
  margin: 0px;
`;

const AutoCompleteEquip = ({ items }) => {
  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <StyledAutoComplete
      id="grouped-demo"
      size="small"
      multiple
      limitTags={1}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      // groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      // sx={{ width: 300, minHeight: 26, height: 26, margin: 0, padding: 0}}
      renderInput={(params) => <TextField 
        {...params}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 26,
            paddingTop: '-5px'
          },
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            padding: 0
          },
          padding: 0,
        }}
      />}
    />
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  }
];


export default AutoCompleteEquip;
