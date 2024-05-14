import React, {} from 'react'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'
import 'react-datepicker/dist/react-datepicker.css';
import 'styles/react-datepicker.css'

function DatePickerFromTo ({selectedDate, onChangeDate, isRange, showTimeSelect, timeIntervals, format, useMaxDate}) {
  const { startDate, endDate, searchTarget } = selectedDate
  return (
    <React.Fragment>
      <div>
        <DatePicker
          locale={ko}
          dateFormat={format}
          selected={startDate}
          onChange={(date) => onChangeDate({searchTarget: searchTarget, name: 'startDate', value: date})}
          selectsStart
          maxDate={ useMaxDate ? new Date() : {}}
          showTimeSelect={ showTimeSelect }
          timeIntervals={ timeIntervals }
        />
      </div>
      {
        isRange && (
          <React.Fragment>
            <label className='mx-datepicker-label'> ~ </label>
            <div>
              <DatePicker
                locale={ko}
                dateFormat={format}
                selected={endDate}
                onChange={(date) => onChangeDate({searchTarget: searchTarget, name: 'endDate', value: date})}
                selectsEnd
                startDate={startDate}
                minDate={startDate}
                maxDate={ useMaxDate ? new Date() : {}}
                showTimeSelect={ showTimeSelect }
                timeIntervals={ timeIntervals }
              />
            </div>
          </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

// DatePickerFromTo.defaultProps = {
//   selectedDate: {startDate: new Date(), endDate: new Date()},
//   isRange: false,
//   /* format: 'yyyy-MM-dd HH:mm:00' */
//   format: 'yyyy-MM-dd',
//   showTimeSelect: false,
//   timeIntervals: 5,
//   useMaxDate: true
// }

export default DatePickerFromTo