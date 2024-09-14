import React from 'react';
import Label from '../../atom/label';
import Input from '../../atom/Input';

const InputModules = ({id, content, widthSize, placeholder, onChange}) => {
    return (
        <div>
            <Label content={content} id={id} />
            <Input widthSize={widthSize} placeholder={placeholder} onChange={onChange}/> 
        </div>
    );
};

export default InputModules;