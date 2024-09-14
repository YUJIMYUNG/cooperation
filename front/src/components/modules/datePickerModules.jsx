import React from 'react';
import DatePicker from 'tailwind-datepicker-react';
import DatePickerAtom from '../../atom/datePicker';

const DatePickerModules = ({date, onChange}) => {
    return (
        <div>
            <DatePickerAtom />
        </div>


    );
};

export default DatePickerModules;