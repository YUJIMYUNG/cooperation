import React from 'react';
import DatePicker from 'react-datepicker';
import DatePickerAtom from '../../atom/datePicker';

const DatePickerModules = ({date, onChange}) => {
    return (
        <div>
            <DatePickerAtom />
        </div>


    );
};

export default DatePickerModules;