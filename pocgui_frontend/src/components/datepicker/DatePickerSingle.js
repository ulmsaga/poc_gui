import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/react-datepicker.css'

const DatePickerSingle = ({ selectedDate, onChangeDate, showTimeSelect, timeIntervals, format, useMaxDate }) => {

  return (
    <Fragment>
      <DatePicker
        locale={ko}
        dateFormat={ format }
        selected={ selectedDate }
        onChange={ onChangeDate }
        selectsStart
        maxDate={ useMaxDate ? new Date() : {}}
        showTimeSelect={ showTimeSelect }
        timeIntervals={ timeIntervals }
      />
    </Fragment>
  );
};

export default DatePickerSingle;