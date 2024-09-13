import React from 'react';
import Label from '../../atom/label';
import Input from '../../atom/Input';

const InputModules = ({id, content, widthSize, placeHolder}) => {
    return (
        <div>
            <Label content={content} id={id} />
            <Input widthSize={widthSize} placeholder={placeHolder} /> 
        </div>
    );
};

export default InputModules;