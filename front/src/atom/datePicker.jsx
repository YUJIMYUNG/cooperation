import React, { useState } from 'react';


const DatePickerAtom = ({date, onChange, placeholder, id}) => {

	const handleDateChange = (e) => {
		onChange({ target: { id, value: e.target.value } });
	  };

	return (
	  <div className="relative max-w-sm font-nanum-squareB">
		<input
		  type="date"
		  value={date}
		  onChange={handleDateChange}
		  className="bg-white border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-400 pl-1 p-2.5"
		  placeholder={placeholder}
		  id={id}
		/>
		<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
		 
		</div>
	  </div>
	);
};

export default DatePickerAtom;