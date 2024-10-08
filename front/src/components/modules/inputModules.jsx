import React from 'react';
import Label from '../../atom/label';
import Input from '../../atom/Input';

const InputModules = ({id, content, widthSize, placeholder, onChange, value, type, options}) => {
    return (
        <div>
            <Label content={content} id={id} />
            {type === 'select' ? (
                <select 
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={`h-10 border rounded-md shadow-sm font-nanum-squareL text-sm p-2 w-full`}
                >
                    <option value="">선택하세요</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <Input 
                    widthSize={widthSize} 
                    placeholder={placeholder} 
                    onChange={onChange} 
                    id={id} 
                    value={value} 
                    type={type}
                />
            )}
        </div>
    );
};

export default InputModules;