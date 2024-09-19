import React from 'react';
import DatePickerAtom from '../../atom/datePicker';
import { pl } from 'date-fns/locale';
import Label from '../../atom/label';

const DatePickerModules = ({id, content, placeholder, date, onChange}) => {
    return (
        <div>
            <Label content={content} id={id} />
            <DatePickerAtom id={id} date={date} onChange={onChange} placeholder={placeholder}/>
        </div>


    );
};

export default DatePickerModules;