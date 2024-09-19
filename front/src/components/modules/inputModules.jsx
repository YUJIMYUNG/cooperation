import React from 'react';
import Label from '../../atom/label';
import Input from '../../atom/Input';

const InputModules = ({id, content, widthSize, placeholder, onChange, value}) => {
    return (
        <div>
            <Label content={content} id={id} />
            <Input widthSize={widthSize} placeholder={placeholder} onChange={onChange} id={id} value={value}/> 
        </div>
    );
};

export default InputModules;